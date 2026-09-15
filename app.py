# -*- coding: utf-8 -*-
"""
نظام حجز مقاعد المسرح وبطاقات الـ QR Code
تطبيق ويب متكامل بلغة بايثون (Python / Flask)
"""

import os
import sys
import json
import uuid
import threading
import webbrowser
from datetime import datetime

# Configure Windows console UTF-8 encoding
if sys.platform == "win32":
    try:
        if hasattr(sys.stdout, "reconfigure"):
            sys.stdout.reconfigure(encoding="utf-8")
        if hasattr(sys.stderr, "reconfigure"):
            sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

from flask import Flask, jsonify, request, send_from_directory, send_file

app = Flask(__name__, static_folder="dist", static_url_path="")

DB_FILE = os.path.join(os.path.dirname(__file__), "database.json")

ALPHABET = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

DEFAULT_EVENT = {
    "title": "المسرح الرئيسي - حفل التكريم والافتتاح",
    "organizer": "إدارة المسرح والفعاليات",
    "date": "الجمعة، 25 أكتوبر 2026",
    "time": "08:00 مساءً (تفتح الأبواب 07:00 مساءً)",
    "venue": "المسرح الرئيسي - القاعة الكبرى",
    "city": "الرياض، المملكة العربية السعودية",
    "logoText": "المسرح الرئيسي",
    "logoUrl": "",
    "theaterImageUrl": "",
    "note": "يرجى إبراز بطاقة الحضور عند مدخل المسرح للتحقق عبر الـ QR Code."
}

def generate_default_seats():
    seats = []
    
    # Ground Floor (G) - 21 rows A to U
    g_rows = ALPHABET[:21]
    for idx, row in enumerate(g_rows):
        groups = [6, 10, 6] if idx == 0 else [7, 12, 7]
        seat_no = 1
        for group_idx, count in enumerate(groups):
            sector_name = "اليسار"
            sector_key = "left"
            if group_idx == 1:
                sector_name = "الوسط"
                sector_key = "center"
            elif group_idx == 2:
                sector_name = "اليمين"
                sector_key = "right"
            
            for _ in range(count):
                n_str = str(seat_no).zfill(2)
                seat_id = f"G-{row}-{n_str}"
                seats.append({
                    "id": seat_id,
                    "level": "G",
                    "levelName": "الدور الأرضي",
                    "row": row,
                    "number": n_str,
                    "rawNumber": seat_no,
                    "sector": sector_name,
                    "sectorKey": sector_key,
                    "status": "available",
                    "guest": None
                })
                seat_no += 1

    # Balcony (B) - 8 rows A to H
    b_rows = ALPHABET[:8]
    for idx, row in enumerate(b_rows):
        groups = [6, 10, 6] if idx == 0 else [7, 12, 7]
        seat_no = 1
        for group_idx, count in enumerate(groups):
            sector_name = "اليسار"
            sector_key = "left"
            if group_idx == 1:
                sector_name = "الوسط"
                sector_key = "center"
            elif group_idx == 2:
                sector_name = "اليمين"
                sector_key = "right"
            
            for _ in range(count):
                n_str = str(seat_no).zfill(2)
                seat_id = f"B-{row}-{n_str}"
                seats.append({
                    "id": seat_id,
                    "level": "B",
                    "levelName": "الدور الثاني - البلكونة",
                    "row": row,
                    "number": n_str,
                    "rawNumber": seat_no,
                    "sector": sector_name,
                    "sectorKey": sector_key,
                    "status": "available",
                    "guest": None
                })
                seat_no += 1

    return seats

def load_db():
    if not os.path.exists(DB_FILE):
        data = {
            "event": DEFAULT_EVENT,
            "seats": generate_default_seats()
        }
        save_db(data)
        return data
    try:
        with open(DB_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print("Error reading DB:", e)
        data = {
            "event": DEFAULT_EVENT,
            "seats": generate_default_seats()
        }
        save_db(data)
        return data

def save_db(data):
    with open(DB_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def renumber_seats(seats):
    SECTOR_ORDER = {"left": 0, "center": 1, "right": 2}
    groups = {}
    for s in seats:
        key = f"{s['level']}-{s['row']}"
        groups.setdefault(key, []).append(s)

    renumbered = []
    for key in sorted(groups.keys()):
        group = groups[key]
        group.sort(key=lambda s: (
            SECTOR_ORDER.get(s.get("sectorKey", "center"), 1),
            int(s.get("rawNumber") or int(s.get("number") or 0))
        ))
        for i, s in enumerate(group):
            new_num = i + 1
            n_str = str(new_num).zfill(2)
            s["number"] = n_str
            s["rawNumber"] = new_num
            s["id"] = f"{s['level']}-{s['row']}-{n_str}"
            renumbered.append(s)
    return renumbered

# --- API Endpoints ---

@app.route("/api/seats", methods=["GET"])
def get_seats():
    db = load_db()
    return jsonify(db.get("seats", []))

@app.route("/api/event", methods=["GET", "POST"])
def event_details():
    db = load_db()
    if request.method == "POST":
        new_event = request.json
        db["event"] = new_event
        save_db(db)
        return jsonify({"success": True, "event": new_event})
    return jsonify(db.get("event", DEFAULT_EVENT))

@app.route("/api/seats/add", methods=["POST"])
def add_seats():
    data = request.json or {}
    level = data.get("level", "G")
    row = data.get("row", "A").upper()
    sector_key = data.get("sectorKey", "center")
    count = int(data.get("count", 1))
    
    sector_names = {"left": "اليسار", "center": "الوسط", "right": "اليمين"}
    sector_name = sector_names.get(sector_key, "الوسط")
    level_name = "الدور الأرضي" if level == "G" else "الدور الثاني - البلكونة"

    db = load_db()
    seats = db.get("seats", [])

    sector_seats = [s for s in seats if s["level"] == level and s["row"] == row and s["sectorKey"] == sector_key]
    max_num = max([int(s.get("rawNumber") or s.get("number") or 0) for s in sector_seats], default=0)

    for i in range(count):
        raw_num = max_num + 1 + i
        temp_id = f"{level}-{row}-{sector_key}-{uuid.uuid4().hex[:6]}"
        seats.append({
            "id": temp_id,
            "level": level,
            "levelName": level_name,
            "row": row,
            "number": str(raw_num).zfill(2),
            "rawNumber": raw_num,
            "sector": sector_name,
            "sectorKey": sector_key,
            "status": "available",
            "guest": None
        })

    seats = renumber_seats(seats)
    db["seats"] = seats
    save_db(db)
    return jsonify({"success": True, "seats": seats, "addedCount": count})

@app.route("/api/seats/delete/<seat_id>", methods=["DELETE", "POST"])
def delete_seat(seat_id):
    db = load_db()
    seats = db.get("seats", [])
    target = next((s for s in seats if s["id"] == seat_id), None)
    
    if not target:
        return jsonify({"success": False, "message": "المقعد غير موجود"}), 404
        
    if target.get("status") != "available":
        return jsonify({"success": False, "message": "لا يمكن حذف مقعد محجوز"}), 400

    seats = [s for s in seats if s["id"] != seat_id]
    seats = renumber_seats(seats)
    db["seats"] = seats
    save_db(db)
    return jsonify({"success": True, "seats": seats})

@app.route("/api/seats/renumber", methods=["POST"])
def renumber_all():
    db = load_db()
    seats = renumber_seats(db.get("seats", []))
    db["seats"] = seats
    save_db(db)
    return jsonify({"success": True, "seats": seats})

@app.route("/api/seats/book", methods=["POST"])
def book_seat():
    data = request.json or {}
    seat_id = data.get("seatId")
    guest_data = data.get("guest", {})

    db = load_db()
    seats = db.get("seats", [])
    target = next((s for s in seats if s["id"] == seat_id), None)
    
    if not target:
        return jsonify({"success": False, "message": "المقعد غير موجود"}), 404

    token = f"TK-{uuid.uuid4().hex[:8].upper()}"
    target["status"] = "reserved"
    target["guest"] = {
        "name": guest_data.get("name", "").strip(),
        "phone": guest_data.get("phone", "").strip(),
        "category": guest_data.get("category", "كبار الشخصيات VIP"),
        "notes": guest_data.get("notes", "").strip(),
        "token": token,
        "bookedAt": datetime.now().isoformat(),
        "checkedInAt": None
    }

    db["seats"] = seats
    save_db(db)
    return jsonify({"success": True, "seat": target, "seats": seats})

@app.route("/api/seats/cancel", methods=["POST"])
def cancel_booking():
    data = request.json or {}
    seat_id = data.get("seatId")

    db = load_db()
    seats = db.get("seats", [])
    target = next((s for s in seats if s["id"] == seat_id), None)
    
    if target:
        target["status"] = "available"
        target["guest"] = None

    db["seats"] = seats
    save_db(db)
    return jsonify({"success": True, "seats": seats})

@app.route("/api/seats/checkin", methods=["POST"])
def checkin_ticket():
    data = request.json or {}
    code_or_token = (data.get("token") or "").strip().upper()

    db = load_db()
    seats = db.get("seats", [])
    target = next((s for s in seats if s.get("guest") and (
        s["guest"].get("token", "").upper() == code_or_token or s["id"].upper() == code_or_token
    )), None)

    if not target:
        return jsonify({"success": False, "message": "التذكرة غير موجودة"}), 404

    target["status"] = "checked_in"
    target["guest"]["checkedInAt"] = datetime.now().isoformat()

    db["seats"] = seats
    save_db(db)
    return jsonify({"success": True, "seat": target, "seats": seats})

@app.route("/api/reset", methods=["POST"])
def reset_seats():
    db = load_db()
    db["seats"] = generate_default_seats()
    save_db(db)
    return jsonify({"success": True, "seats": db["seats"]})

# --- Static Frontend Serving ---

@app.route("/portal")
@app.route("/beneficiary")
@app.route("/guest")
@app.route("/beneficiary.html")
def serve_beneficiary_shortcut():
    dist_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "dist"))
    if os.path.exists(os.path.join(dist_dir, "beneficiary.html")):
        return send_from_directory(dist_dir, "beneficiary.html")
    return send_from_directory(dist_dir, "index.html")

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    dist_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "dist"))
    if path != "" and os.path.exists(os.path.join(dist_dir, path)):
        return send_from_directory(dist_dir, path)
    return send_from_directory(dist_dir, "index.html")

def open_browser():
    webbrowser.open_new_tab("http://127.0.0.1:5000")

if __name__ == "__main__":
    load_db()
    port = 5000
    print("\n" + "="*60)
    print(f"  Theater Seat Reservations System (Python Server)")
    print(f"  Running at: http://127.0.0.1:{port}")
    print("="*60 + "\n")
    
    # Auto open browser after 1 second
    threading.Timer(1.2, open_browser).start()
    
    app.run(host="0.0.0.0", port=port, debug=False)

