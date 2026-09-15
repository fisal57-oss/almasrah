import React, { useState, useEffect, useRef } from 'react';
import { 
  QrCode, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Search, 
  UserCheck, 
  Armchair, 
  Volume2, 
  History, 
  Sparkles,
  Camera,
  DoorClosed,
  Crown,
  Compass,
  ArrowRight,
  ShieldCheck,
  Check,
  Flame,
  Ticket
} from 'lucide-react';
import { checkInTicket, formatArabicSeatCode } from '../utils/storage';
import { playSuccessSound, playWarningSound } from '../utils/audio';

export default function DoorScanner({ seats, onUpdateSeats }) {
  const [inputCode, setInputCode] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [recentCheckIns, setRecentCheckIns] = useState([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const inputRef = useRef(null);

  // Auto-focus barcode input for instant USB / Gun scanning
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleProcessScan = (codeToScan) => {
    if (!codeToScan || !codeToScan.trim()) return;

    // Handle full URL scanned from QR code by extracting invitation token or row/seat
    let cleanedCode = codeToScan.trim();
    if (cleanedCode.includes('http://') || cleanedCode.includes('https://') || cleanedCode.includes('?')) {
      try {
        const urlObj = new URL(cleanedCode);
        const inv = urlObj.searchParams.get('invitation');
        const row = urlObj.searchParams.get('row');
        const seat = urlObj.searchParams.get('seat');
        if (inv) {
          cleanedCode = inv;
        } else if (row && seat) {
          cleanedCode = `${row}-${seat}`;
        }
      } catch (e) {
        // Continue with raw code if url parsing fails
      }
    }

    const result = checkInTicket(cleanedCode);
    setScanResult(result);

    if (result.success) {
      playSuccessSound();
      if (onUpdateSeats) onUpdateSeats();
      
      const newEntry = {
        id: result.seat.id,
        name: result.seat.guest?.name || 'ضيف المسرح',
        seatCode: formatArabicSeatCode(result.seat),
        row: result.seat.row,
        number: result.seat.number,
        level: result.seat.level === 'B' ? 'البلكونة' : 'الدور الأرضي',
        sector: result.seat.sector || 'الوسط',
        isVip: result.seat.isVip,
        time: new Date().toLocaleTimeString('ar-SA')
      };

      setRecentCheckIns(prev => [newEntry, ...prev.filter(item => item.id !== newEntry.id)].slice(0, 10));
    } else {
      playWarningSound();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleProcessScan(inputCode);
    setInputCode('');
    inputRef.current?.focus();
  };

  const reservedSeats = seats.filter((s) => s.status === 'reserved');
  const checkedInSeats = seats.filter((s) => s.status === 'checked_in');
  const totalBooked = reservedSeats.length + checkedInSeats.length;
  const attendanceRate = totalBooked > 0 ? Math.round((checkedInSeats.length / totalBooked) * 100) : 0;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6" dir="rtl">
      
      {/* Top Gate Header & Attendance Gauge */}
      <div className="bg-[#0b162b] border border-cyan-500/20 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/10 shrink-0">
            <QrCode className="w-7 h-7 animate-pulse text-cyan-300" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span>ماسح الباركود وبوابة الدخول الذكية</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/30 animate-pulse">
                جاهز للمسح
              </span>
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              امسح رمز QR من جوال الضيف أو بطاقته المطبوعة أو أدخل رمز التذكرة لتأكيد الحضور
            </p>
          </div>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-3.5 rounded-2xl shrink-0">
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-400 block font-bold">حاضر بالقاعة</span>
            <span className="text-xl font-black text-emerald-300">{checkedInSeats.length}</span>
          </div>
          <div className="w-[1px] h-8 bg-white/15"></div>
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-400 block font-bold">بانتظار الدخول</span>
            <span className="text-xl font-black text-amber-300">{reservedSeats.length}</span>
          </div>
          <div className="w-[1px] h-8 bg-white/15"></div>
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-400 block font-bold">نسبة الحضور</span>
            <span className="text-xl font-black text-cyan-300">{attendanceRate}%</span>
          </div>
        </div>

      </div>

      {/* Main Scanner Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Scan Input & Result Display */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Barcode Input Form */}
          <div className="bg-[#0b162b] border border-white/10 p-6 rounded-3xl shadow-xl space-y-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <label className="text-xs font-bold text-slate-200 block">
                مسح الباركود أو إدخال رمز التذكرة / رقم المقعد:
              </label>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="امسح الـ QR أو اكتب رمز المقعد مثل A4 أو التوكن..."
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="w-full bg-white/5 border-2 border-cyan-500/30 focus:border-cyan-400 focus:bg-white/10 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-slate-400 outline-none transition-all pr-11 font-mono tracking-wide"
                  />
                  <QrCode className="w-5 h-5 text-cyan-400 absolute right-3.5 top-3.5" />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>تأكيد الدخول</span>
                </button>
              </div>
            </form>

            {/* Hint */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>💡 الماسحات الضوئية وقارئات الليزر (USB Gun) مدعومة تلقائياً.</span>
              <span className="text-cyan-300 font-bold">صوت التحقق: مفعل 🔊</span>
            </div>
          </div>

          {/* Scan Result Feedback Card */}
          {scanResult && (
            <div className={`p-6 rounded-3xl border-2 shadow-2xl animate-fade-in transition-all ${
              scanResult.success 
                ? 'bg-emerald-950/40 border-emerald-500/60 shadow-emerald-500/10' 
                : 'bg-rose-950/40 border-rose-500/60 shadow-rose-500/10'
            }`}>
              
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                    scanResult.success 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40' 
                      : 'bg-rose-500/20 text-rose-300 border border-rose-400/40'
                  }`}>
                    {scanResult.success ? (
                      <ShieldCheck className="w-8 h-8 text-emerald-400" />
                    ) : (
                      <XCircle className="w-8 h-8 text-rose-400" />
                    )}
                  </div>

                  <div>
                    <h3 className={`text-base font-black ${
                      scanResult.success ? 'text-emerald-300' : 'text-rose-300'
                    }`}>
                      {scanResult.message || (scanResult.success ? 'تم تسجيل الدخول بنجاح!' : 'رمز غير صالح')}
                    </h3>
                    {scanResult.seat?.guest && (
                      <p className="text-sm font-bold text-white mt-0.5">
                        {scanResult.seat.guest.name}
                        {scanResult.seat.isVip && (
                          <span className="mr-2 text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-bold">
                            VIP
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </div>

                <span className="text-xs font-mono text-slate-300 bg-white/10 px-3 py-1 rounded-full">
                  {new Date().toLocaleTimeString('ar-SA')}
                </span>
              </div>

              {/* Seat Details if found */}
              {scanResult.seat && (
                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-bold">الصف والمقعد</span>
                    <strong className="text-sm font-black text-cyan-300">
                      الصف ({scanResult.seat.row}) - رقم ({scanResult.seat.number})
                    </strong>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-bold">الدور والمستوى</span>
                    <strong className="text-sm font-black text-white">
                      {scanResult.seat.level === 'B' ? 'البلكونة' : 'الدور الأرضي'}
                    </strong>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-bold">القطاع والمدخل</span>
                    <strong className="text-sm font-black text-amber-300">
                      قطاع {scanResult.seat.sector || 'الوسط'}
                    </strong>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Quick Demo Scan Shortcuts */}
          {reservedSeats.length > 0 && (
            <div className="bg-[#0b162b] border border-white/10 p-5 rounded-3xl shadow-xl space-y-3">
              <h4 className="text-xs font-black text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>اختصارات سريعة لضيوف بانتظار الدخول (تجربة فورية):</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {reservedSeats.slice(0, 6).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleProcessScan(s.guest?.token || s.id)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <span>{s.guest?.name || s.id}</span>
                    <span className="text-[10px] text-cyan-300 font-mono">({s.row}{s.number})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Col: Live Check-in Feed at the Gate */}
        <div className="bg-[#0b162b] border border-white/10 p-6 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-400" />
              <span>سجل الحضور عند الباب</span>
            </h3>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
              {recentCheckIns.length} عمليات
            </span>
          </div>

          {recentCheckIns.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs space-y-2">
              <UserCheck className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="font-bold">لا توجد عمليات دخول حديثة في هذه الجلسة</p>
              <p className="text-[10px] text-slate-400">ستظهر هنا تفاصيل كل ضيف يدخل القاعة فوراً</p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
              {recentCheckIns.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-white/5 border border-emerald-500/20 hover:border-emerald-400/40 transition-all flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{item.name}</span>
                      {item.isVip && (
                        <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">VIP</span>
                      )}
                    </div>
                    <div className="text-[10px] text-cyan-300">
                      الصف ({item.row}) • مقعد ({item.number}) • {item.level}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-300 font-bold bg-emerald-500/10 px-2 py-1 rounded-lg">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
