import React, { useState, useEffect, useRef } from 'react';
import {
  Building2,
  Clock,
  Info,
  Wrench,
  FileCode,
  FileText,
  Printer,
  Check,
  X,
  Share2,
  CheckSquare,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { submitHallBooking, DEFAULT_VENUES } from '../utils/storage';

const DEFAULT_ITQAN_ROOMS = [
  { id: 1, name: 'قاعة المركز العلمي', type: 'hall' },
  { id: 2, name: 'مجلس بيت الطالب', type: 'council' },
  { id: 3, name: 'مسرح التربية الخاصة بنين', type: 'theater' },
  { id: 4, name: 'مسرح التربية الخاصة بنات', type: 'theater' },
  { id: 5, name: 'مسرح إدارة التعليم (المسرح الرئيسي)', type: 'theater' },
  { id: 6, name: 'قاعة الشؤون التعليمية', type: 'hall' },
  { id: 7, name: 'قاعة الاحتفالات والمؤتمرات الكبرى', type: 'hall' }
];

const EVENT_TYPES = [
  { value: 'visit', label: 'زيارة وفد' },
  { value: 'meeting', label: 'لقاء' },
  { value: 'ministerial', label: 'برنامج وزاري' },
  { value: 'internal', label: 'برنامج داخلي' },
  { value: 'workshop', label: 'ورشة عمل' },
  { value: 'opening', label: 'افتتاح' },
  { value: 'party', label: 'حفل' }
];

const NEEDS_LIST = [
  { value: 'screens', label: 'شاشات عرض' },
  { value: 'audio', label: 'صوتيات' },
  { value: 'mic', label: 'ميكروفونات' },
  { value: 'pc', label: 'أجهزة كمبيوتر' },
  { value: 'photo', label: 'تصوير فيديو/فوتوغرافي' },
  { value: 'org', label: 'تنظيم' },
  { value: 'ministry', label: 'ربط مع الوزارة' },
  { value: 'live', label: 'البث المباشر' },
  { value: 'other_need', label: 'أخرى' }
];

function computeHijriDate(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    return new Intl.DateTimeFormat('ar-SA-u-ca-islamic-uma', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d);
  } catch (e) {
    return '';
  }
}

export default function OfficialEventBookingModal({ isOpen, onClose, onBookingSaved }) {
  const todayStr = new Date().toISOString().split('T')[0];

  const [rooms, setRooms] = useState(DEFAULT_ITQAN_ROOMS);
  const [selectedRoomIds, setSelectedRoomIds] = useState([5]);
  const [isRoomDropdownOpen, setIsRoomDropdownOpen] = useState(false);

  // Section 1: بيانات الجهة
  const [entityType, setEntityType] = useState('management');
  const [entityName, setEntityName] = useState('');
  const [coordName, setCoordName] = useState('');
  const [coordMobile, setCoordMobile] = useState('');
  const [status, setStatus] = useState('pending');

  // Section 2: توقيت ومقر الفعالية
  const [bookDate, setBookDate] = useState(todayStr);
  const [bookDateHijri, setBookDateHijri] = useState(() => computeHijriDate(todayStr));
  const [timePeriod, setTimePeriod] = useState('morning');
  const [bookTime, setBookTime] = useState('09:00');
  const [duration, setDuration] = useState('2');
  const [audienceType, setAudienceType] = useState('mixed');
  const [audienceCount, setAudienceCount] = useState('');
  const [actualCount, setActualCount] = useState('');

  // Section 3: تفاصيل الفعالية
  const [selectedEventTypes, setSelectedEventTypes] = useState(['party']);
  const [otherEventChecked, setOtherEventChecked] = useState(false);
  const [otherEventType, setOtherEventType] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [vipGuest, setVipGuest] = useState('');
  const [activities, setActivities] = useState('');

  // Section 4: احتياجات المبادرة / الفعالية
  const [selectedNeeds, setSelectedNeeds] = useState(['screens', 'audio', 'mic']);
  const [otherNeedsText, setOtherNeedsText] = useState('');
  const [showApproval, setShowApproval] = useState(true);

  const [savedNotice, setSavedNotice] = useState('');
  const jsonInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  // Load synced rooms from Itqan if available
  useEffect(() => {
    if (!isOpen) return;
    try {
      const itqanRaw = localStorage.getItem('itqan_state') || localStorage.getItem('injaz_state');
      if (itqanRaw) {
        const parsed = JSON.parse(itqanRaw);
        if (parsed && Array.isArray(parsed.rooms) && parsed.rooms.length > 0) {
          setRooms(parsed.rooms);
        }
      }
    } catch (e) {}
  }, [isOpen]);

  // Update Hijri date automatically when Gregorian date changes
  useEffect(() => {
    const h = computeHijriDate(bookDate);
    if (h) setBookDateHijri(h);
  }, [bookDate]);

  if (!isOpen) return null;

  const toggleRoomId = (id) => {
    setSelectedRoomIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleEventType = (val) => {
    setSelectedEventTypes((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const toggleNeed = (val) => {
    setSelectedNeeds((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const selectedRoomNames = rooms
    .filter((r) => selectedRoomIds.includes(r.id))
    .map((r) => r.name);

  const selectedRoomLabel =
    selectedRoomNames.length > 0
      ? selectedRoomNames.join(' ، ')
      : 'اضغط لاختيار المقر / القاعة...';

  // JSON Import handler
  const handleJSONImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        const b = Array.isArray(data.bookings) ? data.bookings[0] : data;
        if (b) {
          if (b.entityType) setEntityType(b.entityType);
          if (b.entityName || b.orgName) setEntityName(b.entityName || b.orgName);
          if (b.coordName || b.contactName) setCoordName(b.coordName || b.contactName);
          if (b.coordMobile || b.phone) setCoordMobile(b.coordMobile || b.phone);
          if (b.status) setStatus(b.status);
          if (b.date || b.bookingDate) setBookDate(b.date || b.bookingDate);
          if (b.dateHijri) setBookDateHijri(b.dateHijri);
          if (b.time) setBookTime(b.time);
          if (b.duration) setDuration(String(b.duration));
          if (b.audienceType) setAudienceType(b.audienceType);
          if (b.audienceCount || b.expectedAttendees)
            setAudienceCount(String(b.audienceCount || b.expectedAttendees));
          if (b.actualCount) setActualCount(String(b.actualCount));
          if (b.title || b.eventTitle) setEventTitle(b.title || b.eventTitle);
          if (b.vipGuest) setVipGuest(b.vipGuest);
          if (b.activities) setActivities(b.activities);
          if (Array.isArray(b.eventTypes)) setSelectedEventTypes(b.eventTypes);
          if (Array.isArray(b.needs)) setSelectedNeeds(b.needs);
          if (b.otherNeedsText || b.notes) setOtherNeedsText(b.otherNeedsText || b.notes);
          setSavedNotice('✅ تم استيراد بيانات الطلب من ملف JSON بنجاح!');
          setTimeout(() => setSavedNotice(''), 3500);
        }
      } catch (err) {
        alert('تعذر قراءة ملف JSON، تأكد من صحة الملف.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // PDF Import handler (extracts filename/title or basic metadata)
  const handlePDFImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const baseName = file.name.replace(/\.pdf$/i, '').replace(/[_-]/g, ' ');
    if (!eventTitle) setEventTitle(baseName);
    setSavedNotice(`📄 تم إرفاق واستيراد بيانات الملف (${file.name}) بنجاح!`);
    setTimeout(() => setSavedNotice(''), 3500);
    e.target.value = '';
  };

  // WhatsApp Send from Form
  const handleSendWhatsApp = () => {
    if (!coordMobile.trim()) {
      alert('يرجى إدخال رقم الجوال أولاً لتتمكن من إرسال الرسالة عبر واتساب.');
      return;
    }

    let mobile = coordMobile.replace(/[^\d]/g, '');
    if (mobile.startsWith('0')) {
      mobile = '966' + mobile.substring(1);
    } else if (!mobile.startsWith('966')) {
      mobile = '966' + mobile;
    }

    const statusLabels = {
      confirmed: '✅ مؤكد',
      pending: '🟡 قيد الانتظار',
      executed: '🟢 تم التنفيذ',
      maintenance: '🟠 صيانة',
      cancelled: '🔴 ملغي'
    };
    const periodText = timePeriod === 'morning' ? 'صباحاً' : 'مساءً';
    const needsLabels = NEEDS_LIST.filter((n) => selectedNeeds.includes(n.value)).map((n) => n.label);

    const message =
      `*مرحباً أ/ ${coordName || 'المنسق الكريم'}*،\n` +
      `تم تسجيل طلب حجز فعالية عبر بوابة المستفيد - مسارح وقاعات تعليم عسير:\n\n` +
      `📌 *الفعالية:* ${eventTitle || 'غير محدد'}\n` +
      `🏢 *الجهة الطالبة:* ${entityName || 'غير محدد'}\n` +
      `📍 *المقر / القاعة:* ${selectedRoomNames.join('، ') || 'المسرح الرئيسي'}\n` +
      `📅 *التاريخ:* ${bookDateHijri} (${bookDate})\n` +
      `⏰ *الوقت:* ${bookTime} (${periodText}) - المدة: ${duration} ساعة\n` +
      `👥 *العدد المتوقع:* ${audienceCount || 'غير محدد'}\n` +
      `🛠️ *الاحتياجات:* ${needsLabels.join('، ') || 'عام'}\n` +
      `📌 *الحالة:* ${statusLabels[status] || '🟡 قيد الانتظار'}\n\n` +
      `نتمنى لكم فعالية ناجحة وموفقة.`;

    window.open(`https://wa.me/${mobile}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Print / Save as PDF Official Form
  const handlePrintForm = () => {
    const periodText = timePeriod === 'morning' ? 'صباحاً' : 'مساءً';
    const entityTypeLabels = {
      management: 'إدارة / قسم / وحدة',
      school: 'مدرسة',
      other: 'أخرى'
    };
    const audienceLabels = {
      boys: 'بنين',
      girls: 'بنات',
      mixed: 'عام'
    };
    const statusLabels = {
      confirmed: 'مؤكد',
      pending: 'قيد الانتظار',
      executed: 'تم التنفيذ',
      maintenance: 'صيانة',
      cancelled: 'ملغي'
    };

    const eventTypeLabels = EVENT_TYPES.filter((t) => selectedEventTypes.includes(t.value)).map(
      (t) => t.label
    );
    if (otherEventChecked && otherEventType.trim()) {
      eventTypeLabels.push(otherEventType.trim());
    }

    const needLabels = NEEDS_LIST.filter((n) => selectedNeeds.includes(n.value)).map(
      (n) => n.label
    );

    const printWin = window.open('', '_blank', 'width=950,height=850');
    if (!printWin) {
      window.print();
      return;
    }

    printWin.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8" />
        <title>نموذج طلب حجز فعالية - ${eventTitle || 'طلب رسمي'}</title>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; font-family: 'Cairo', sans-serif; margin: 0; padding: 0; }
          body { background: #fff; color: #0f172a; padding: 24px; }
          .sheet { max-width: 820px; margin: 0 auto; border: 2px solid #1e293b; border-radius: 16px; padding: 24px; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #cbd5e1; padding-bottom: 16px; margin-bottom: 18px; }
          .header h1 { font-size: 20px; color: #1e1b4b; }
          .badge { background: #eef2ff; color: #3730a3; border: 1px solid #c7d2fe; padding: 6px 16px; border-radius: 999px; font-weight: 800; font-size: 14px; }
          .section { margin-bottom: 16px; border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden; }
          .section-title { background: #f1f5f9; padding: 8px 14px; font-weight: 800; font-size: 14px; color: #1e293b; border-bottom: 1px solid #cbd5e1; }
          .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 12px 14px; font-size: 13px; }
          .field { background: #f8fafc; padding: 8px 10px; border-radius: 8px; border: 1px solid #e2e8f0; }
          .field span { display: block; font-size: 11px; color: #64748b; font-weight: 700; }
          .field strong { font-size: 13px; color: #0f172a; }
          .span-2 { grid-column: span 2; }
          .span-3 { grid-column: span 3; }
          .approval { margin-top: 20px; padding-top: 16px; border-top: 2px dashed #94a3b8; display: flex; justify-content: space-between; text-align: center; font-size: 13px; }
          .approval div { width: 30%; }
          @media print { body { padding: 0; } .sheet { border-width: 1px; } }
        </style>
      </head>
      <body>
        <div class="sheet">
          <div class="header">
            <div>
              <div>المملكة العربية السعودية - وزارة التعليم</div>
              <strong>الإدارة العامة للتعليم بمنطقة عسير</strong>
              <div>إدارة المسارح والقاعات والاتصال المؤسسي</div>
            </div>
            <div class="badge">نموذج طلب حجز مقر / فعالية</div>
            <div style="text-align:left; font-size:12px;">
              <div>التاريخ: ${bookDate}</div>
              <div>الموافق: ${bookDateHijri}</div>
              <div>الحالة: ${statusLabels[status] || 'قيد الانتظار'}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">1. بيانات الجهة الطالبة</div>
            <div class="grid">
              <div class="field"><span>نوع الجهة</span><strong>${entityTypeLabels[entityType]}</strong></div>
              <div class="field span-2"><span>اسم الجهة</span><strong>${entityName || '---'}</strong></div>
              <div class="field"><span>اسم مسؤول التنسيق</span><strong>${coordName || '---'}</strong></div>
              <div class="field"><span>رقم الجوال</span><strong>${coordMobile || '---'}</strong></div>
              <div class="field"><span>حالة الطلب</span><strong>${statusLabels[status]}</strong></div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">2. توقيت ومقر الفعالية</div>
            <div class="grid">
              <div class="field span-3"><span>المقر / القاعة المطلوبة</span><strong>${selectedRoomNames.join(' ، ') || '---'}</strong></div>
              <div class="field"><span>التاريخ (ميلادي)</span><strong>${bookDate}</strong></div>
              <div class="field"><span>التاريخ (هجري)</span><strong>${bookDateHijri}</strong></div>
              <div class="field"><span>الوقت والفترة</span><strong>${bookTime} (${periodText}) - ${duration} ساعات</strong></div>
              <div class="field"><span>فئة الحضور</span><strong>${audienceLabels[audienceType]}</strong></div>
              <div class="field"><span>العدد المتوقع</span><strong>${audienceCount || '0'}</strong></div>
              <div class="field"><span>عدد الحضور الفعلي</span><strong>${actualCount || '0'}</strong></div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">3. تفاصيل الفعالية</div>
            <div class="grid">
              <div class="field span-3"><span>اسم الفعالية</span><strong>${eventTitle || '---'}</strong></div>
              <div class="field span-3"><span>نوع الفعالية</span><strong>${eventTypeLabels.join(' ، ') || '---'}</strong></div>
              <div class="field"><span>الضيف الاعتباري / الراعي</span><strong>${vipGuest || '---'}</strong></div>
              <div class="field span-2"><span>الفعاليات المصاحبة</span><strong>${activities || '---'}</strong></div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">4. احتياجات المبادرة / الفعالية</div>
            <div class="grid">
              <div class="field span-3"><span>التجهيزات المطلوبة</span><strong>${needLabels.join(' ، ') || 'لا يوجد'}</strong></div>
              <div class="field span-3"><span>ملاحظات إضافية</span><strong>${otherNeedsText || 'لا يوجد'}</strong></div>
            </div>
          </div>

          ${
            showApproval
              ? `<div class="approval">
                  <div><strong>منسق الجهة الطالبة</strong><br><br>${coordName || '................'}</div>
                  <div><strong>مشرف المسارح والقاعات</strong><br><br>........................</div>
                  <div><strong>اعتماد الإدارة</strong><br><br>........................</div>
                </div>`
              : ''
          }
        </div>
        <script>
          window.onload = function() { setTimeout(function() { window.print(); }, 350); };
        </script>
      </body>
      </html>
    `);
    printWin.document.close();
  };

  // Confirm and Save Booking to both Itqan state & Beneficiary Hall Bookings
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!entityName.trim() || !coordName.trim() || !coordMobile.trim() || !eventTitle.trim()) {
      alert('يرجى تعبئة الحقول الأساسية المطلوبة (اسم الجهة، المنسق، الجوال، واسم الفعالية).');
      return;
    }
    if (selectedRoomIds.length === 0) {
      alert('يرجى اختيار مقر / قاعة واحدة على الأقل.');
      return;
    }

    const periodArabic = timePeriod === 'morning' ? 'صباحاً' : 'مساءً';
    const needLabels = NEEDS_LIST.filter((n) => selectedNeeds.includes(n.value)).map(
      (n) => n.label
    );

    // 1. Save into Beneficiary Portal hall bookings (`theater_hall_bookings_v1`)
    const hallBookingRes = submitHallBooking({
      venueId: String(selectedRoomIds[0]),
      venueName: selectedRoomNames.join(' ، '),
      venueLocation: 'الإدارة العامة للتعليم بمنطقة عسير',
      entityType,
      orgName: entityName.trim(),
      contactName: coordName.trim(),
      phone: coordMobile.trim(),
      eventTitle: eventTitle.trim(),
      bookingDate: bookDate,
      bookingDateHijri: bookDateHijri,
      timeSlot: `${bookTime} (${periodArabic}) - ${duration} ساعات`,
      expectedAttendees: audienceCount || 'غير محدد',
      actualCount: actualCount || '0',
      audienceType,
      vipGuest: vipGuest.trim(),
      activities: activities.trim(),
      eventTypes: selectedEventTypes,
      otherEventType: otherEventChecked ? otherEventType.trim() : '',
      equipments: needLabels,
      notes: otherNeedsText.trim(),
      status: status || 'pending',
      showApproval
    });

    // 2. Also sync into Itqan state (`itqan_state` and `injaz_state`) so it appears immediately in Itqan Portal
    try {
      const rawItqan = localStorage.getItem('itqan_state') || localStorage.getItem('injaz_state');
      const itqanState = rawItqan
        ? JSON.parse(rawItqan)
        : { rooms: DEFAULT_ITQAN_ROOMS, bookings: [] };
      if (!Array.isArray(itqanState.bookings)) itqanState.bookings = [];

      selectedRoomIds.forEach((rid, idx) => {
        itqanState.bookings.push({
          id: Date.now() + idx,
          roomId: rid,
          title: eventTitle.trim(),
          entityType,
          entityName: entityName.trim(),
          coordName: coordName.trim(),
          coordMobile: coordMobile.trim(),
          date: bookDate,
          endDate: bookDate,
          daysCount: 1,
          dateHijri: bookDateHijri,
          time: bookTime,
          timePeriod: periodArabic,
          status: status || 'pending',
          showApproval,
          duration,
          audienceType,
          audienceCount: parseInt(audienceCount, 10) || 0,
          actualCount: parseInt(actualCount, 10) || 0,
          eventTypes: otherEventChecked
            ? [...selectedEventTypes, 'other']
            : selectedEventTypes,
          otherEventType: otherEventChecked ? otherEventType.trim() : '',
          vipGuest: vipGuest.trim(),
          activities: activities.trim(),
          needs: selectedNeeds,
          otherNeedsText: otherNeedsText.trim()
        });
      });

      const serialized = JSON.stringify(itqanState);
      localStorage.setItem('itqan_state', serialized);
      localStorage.setItem('injaz_state', serialized);
    } catch (err) {
      console.error('Error syncing to Itqan storage:', err);
    }

    if (onBookingSaved && hallBookingRes?.booking) {
      onBookingSaved(hallBookingRes.booking);
    }

    setSavedNotice('✅ تم تأكيد وحفظ طلب حجز الفعالية بنجاح في النظام وبوابة إتقان!');
    setTimeout(() => {
      setSavedNotice('');
      onClose();
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto"
      dir="rtl"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#0b1325] border border-indigo-500/30 rounded-3xl w-full max-w-[860px] max-h-[92vh] overflow-y-auto shadow-[0_25px_70px_rgba(0,0,0,0.85)] text-right p-5 sm:p-7 space-y-6 custom-scrollbar">
        {/* Modal Header matching screenshot */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-indigo-300 mb-1">
              نموذج طلب حجز فعالية
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              يرجى ملء البيانات الرسمية المطلوبة بدقة
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => pdfInputRef.current?.click()}
              className="px-4 py-2 rounded-xl font-bold text-xs text-white flex items-center gap-2 shadow-lg transition-all hover:brightness-110 active:scale-95 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
              }}
            >
              <FileText className="w-4 h-4" />
              <span>استيراد من PDF</span>
            </button>
            <input
              ref={pdfInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handlePDFImport}
            />

            <button
              type="button"
              onClick={() => jsonInputRef.current?.click()}
              className="px-4 py-2 rounded-xl font-bold text-xs text-white flex items-center gap-2 shadow-lg transition-all hover:brightness-110 active:scale-95 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #10b981, #3b82f6)',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
              }}
            >
              <FileCode className="w-4 h-4" />
              <span>استيراد من JSON</span>
            </button>
            <input
              ref={jsonInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleJSONImport}
            />

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-white/10 flex items-center justify-center text-lg font-black transition-all cursor-pointer"
              title="إغلاق"
            >
              ✕
            </button>
          </div>
        </div>

        {savedNotice && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs sm:text-sm font-bold flex items-center gap-2 animate-fade-in">
            <Check className="w-4 h-4 shrink-0" />
            <span>{savedNotice}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: بيانات الجهة */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.025] border border-white/10 space-y-4">
            <h3 className="text-sm font-black text-indigo-300 flex items-center gap-2 border-b border-white/10 pb-2.5">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <span>بيانات الجهة</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">نوع الجهة</label>
                <select
                  value={entityType}
                  onChange={(e) => setEntityType(e.target.value)}
                  className="w-full bg-[#141f38] border border-white/15 focus:border-indigo-400 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                >
                  <option value="management">إدارة / قسم / وحدة</option>
                  <option value="school">مدرسة</option>
                  <option value="other">أخرى</option>
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  اسم الجهة <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={entityName}
                  onChange={(e) => setEntityName(e.target.value)}
                  placeholder="أدخل اسم الجهة بالتفصيل"
                  className="w-full bg-[#141f38] border border-white/15 focus:border-indigo-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  اسم مسؤول التنسيق <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={coordName}
                  onChange={(e) => setCoordName(e.target.value)}
                  placeholder="الاسم الثلاثي للمنسق"
                  className="w-full bg-[#141f38] border border-white/15 focus:border-indigo-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  رقم الجوال <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={coordMobile}
                  onChange={(e) => setCoordMobile(e.target.value)}
                  placeholder="05xxxxxxxx"
                  className="w-full bg-[#141f38] border border-white/15 focus:border-indigo-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">حالة الطلب</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-[#141f38] border border-white/15 focus:border-indigo-400 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                >
                  <option value="pending">قيد الانتظار</option>
                  <option value="confirmed">مؤكد</option>
                  <option value="executed">تم التنفيذ</option>
                  <option value="maintenance">صيانة</option>
                  <option value="cancelled">ملغي</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: توقيت ومقر الفعالية */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.025] border border-white/10 space-y-4">
            <h3 className="text-sm font-black text-indigo-300 flex items-center gap-2 border-b border-white/10 pb-2.5">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>توقيت ومقر الفعالية</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Multi-room selector */}
              <div className="space-y-1.5 relative">
                <label className="block text-xs font-bold text-slate-300">المقر / القاعة</label>
                <button
                  type="button"
                  onClick={() => setIsRoomDropdownOpen(!isRoomDropdownOpen)}
                  className="w-full bg-[#141f38] border border-white/15 hover:border-indigo-400 rounded-xl px-3.5 py-2.5 text-xs text-white flex items-center justify-between gap-2 text-right"
                >
                  <span className="truncate">{selectedRoomLabel}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                </button>

                {isRoomDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#141f38] border border-indigo-500/40 rounded-xl shadow-2xl z-30 max-h-52 overflow-y-auto divide-y divide-white/5">
                    {rooms.map((r) => {
                      const checked = selectedRoomIds.includes(r.id);
                      return (
                        <label
                          key={r.id}
                          className="flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-white/5 cursor-pointer text-xs text-white"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleRoomId(r.id)}
                            className="w-4 h-4 accent-indigo-500 rounded"
                          />
                          <span>{r.name}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">التاريخ (ميلادي)</label>
                <input
                  type="date"
                  required
                  value={bookDate}
                  onChange={(e) => setBookDate(e.target.value)}
                  className="w-full bg-[#141f38] border border-white/15 focus:border-indigo-400 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">التاريخ (هجري)</label>
                <input
                  type="text"
                  value={bookDateHijri}
                  onChange={(e) => setBookDateHijri(e.target.value)}
                  placeholder="1448 / /"
                  className="w-full bg-[#141f38] border border-white/15 focus:border-indigo-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">وقت الفعالية</label>
                <div className="flex items-center gap-4 bg-[#141f38] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer text-white">
                    <input
                      type="radio"
                      name="time-period"
                      value="morning"
                      checked={timePeriod === 'morning'}
                      onChange={() => setTimePeriod('morning')}
                      className="accent-indigo-500"
                    />
                    <span>صباحاً</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-white">
                    <input
                      type="radio"
                      name="time-period"
                      value="evening"
                      checked={timePeriod === 'evening'}
                      onChange={() => setTimePeriod('evening')}
                      className="accent-indigo-500"
                    />
                    <span>مساءً</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">الساعة</label>
                <input
                  type="time"
                  required
                  value={bookTime}
                  onChange={(e) => setBookTime(e.target.value)}
                  className="w-full bg-[#141f38] border border-white/15 focus:border-indigo-400 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  مدة الفعالية (ساعات)
                </label>
                <input
                  type="number"
                  min="1"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-[#141f38] border border-white/15 focus:border-indigo-400 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">فئة الحضور</label>
                <select
                  value={audienceType}
                  onChange={(e) => setAudienceType(e.target.value)}
                  className="w-full bg-[#141f38] border border-white/15 focus:border-indigo-400 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                >
                  <option value="boys">بنين</option>
                  <option value="girls">بنات</option>
                  <option value="mixed">عام</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">العدد المتوقع</label>
                <input
                  type="number"
                  placeholder="0"
                  value={audienceCount}
                  onChange={(e) => setAudienceCount(e.target.value)}
                  className="w-full bg-[#141f38] border border-white/15 focus:border-indigo-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">عدد الحضور الفعلي</label>
                <input
                  type="number"
                  placeholder="0"
                  value={actualCount}
                  onChange={(e) => setActualCount(e.target.value)}
                  className="w-full bg-[#141f38] border border-white/15 focus:border-indigo-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: تفاصيل الفعالية */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.025] border border-white/10 space-y-4">
            <h3 className="text-sm font-black text-indigo-300 flex items-center gap-2 border-b border-white/10 pb-2.5">
              <Info className="w-4 h-4 text-indigo-400" />
              <span>تفاصيل الفعالية</span>
            </h3>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300">نوع الفعالية</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {EVENT_TYPES.map((item) => {
                  const checked = selectedEventTypes.includes(item.value);
                  return (
                    <label
                      key={item.value}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        checked
                          ? 'bg-indigo-500/20 border-indigo-400 text-white font-bold'
                          : 'bg-[#141f38] border-white/10 text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleEventType(item.value)}
                        className="accent-indigo-500 w-4 h-4"
                      />
                      <span>{item.label}</span>
                    </label>
                  );
                })}

                <div className="col-span-2 flex items-center gap-2 p-2 rounded-xl border border-dashed border-indigo-400/50 bg-indigo-500/5 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-200 shrink-0">
                    <input
                      type="checkbox"
                      checked={otherEventChecked}
                      onChange={(e) => setOtherEventChecked(e.target.checked)}
                      className="accent-indigo-500 w-4 h-4"
                    />
                    <span>أخرى:</span>
                  </label>
                  <input
                    type="text"
                    value={otherEventType}
                    onChange={(e) => {
                      setOtherEventType(e.target.value);
                      if (e.target.value) setOtherEventChecked(true);
                    }}
                    placeholder="اكتب هنا..."
                    className="flex-1 bg-black/25 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">
                اسم الفعالية <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="أدخل المسمى الرسمي للفعالية"
                className="w-full bg-[#141f38] border border-white/15 focus:border-indigo-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  الضيف الاعتباري / الراعي
                </label>
                <input
                  type="text"
                  value={vipGuest}
                  onChange={(e) => setVipGuest(e.target.value)}
                  placeholder="مثال: سعادة مدير عام التعليم..."
                  className="w-full bg-[#141f38] border border-white/15 focus:border-indigo-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">الفعاليات المصاحبة</label>
                <input
                  type="text"
                  value={activities}
                  onChange={(e) => setActivities(e.target.value)}
                  placeholder="مثال: معرض مصاحب / تكريم..."
                  className="w-full bg-[#141f38] border border-white/15 focus:border-indigo-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 4: احتياجات المبادرة / الفعالية */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.025] border border-white/10 space-y-4">
            <h3 className="text-sm font-black text-indigo-300 flex items-center gap-2 border-b border-white/10 pb-2.5">
              <Wrench className="w-4 h-4 text-indigo-400" />
              <span>احتياجات المبادرة / الفعالية</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {NEEDS_LIST.map((item) => {
                const checked = selectedNeeds.includes(item.value);
                return (
                  <label
                    key={item.value}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      checked
                        ? 'bg-indigo-500/20 border-indigo-400 text-white font-bold'
                        : 'bg-[#141f38] border-white/10 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleNeed(item.value)}
                      className="accent-indigo-500 w-4 h-4"
                    />
                    <span>{item.label}</span>
                  </label>
                );
              })}
            </div>

            <div>
              <input
                type="text"
                value={otherNeedsText}
                onChange={(e) => setOtherNeedsText(e.target.value)}
                placeholder="ملاحظات أخرى للاحتياجات (إن وجد)"
                className="w-full bg-[#141f38] border border-white/15 focus:border-indigo-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
              />
            </div>

            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-indigo-500/50 bg-indigo-500/10 text-indigo-200 font-bold text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={showApproval}
                onChange={(e) => setShowApproval(e.target.checked)}
                className="w-4 h-4 accent-indigo-500"
              />
              <CheckSquare className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>إظهار قسم (الاعتماد) في التقرير النهائي</span>
            </label>
          </div>

          {/* Sticky Bottom Actions matching Itqan booking-detail-modal */}
          <div className="sticky bottom-0 bg-[#0b1325]/95 backdrop-blur-md pt-4 pb-1 border-t border-white/10 flex flex-wrap items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-bold text-xs transition-all cursor-pointer"
            >
              إلغاء
            </button>

            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>إرسال واتساب</span>
            </button>

            <button
              type="button"
              onClick={handlePrintForm}
              className="px-4 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>حفظ كـ PDF</span>
            </button>

            <button
              type="button"
              onClick={handlePrintForm}
              className="px-4 py-2.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 text-teal-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة الطلب</span>
            </button>

            <button
              type="submit"
              className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-blue-600 to-cyan-500 hover:brightness-110 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/30 active:scale-95 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>تأكيد وحفظ الطلب</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
