import React, { useRef, useState } from 'react';
import { 
  Armchair, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Compass,
  DoorClosed,
  Ticket,
  User,
  Wallet,
  Download,
  Share2,
  Check,
  Briefcase,
  Navigation,
  Printer,
  CalendarPlus,
  ExternalLink
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import TheaterMap from './TheaterMap';
import SeatCardModal from './SeatCardModal';
import { formatArabicSeatCode } from '../utils/storage';
import ModernAttendanceCard from './ModernAttendanceCard';
import { generateIcsCalendarFile, getGoogleCalendarUrl, getGoogleMapsUrl } from '../utils/calendarUtils';

function MinistryOfEducationLogo({ className = "h-10", color = "#00a887", textColor = "#00a887", subColor = "#4a6b63" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 100 80" className="h-full w-auto shrink-0" fill={color}>
        <circle cx="20" cy="18" r="3.5" />
        <circle cx="32" cy="14" r="3.5" />
        <circle cx="44" cy="12" r="3.5" />
        <circle cx="56" cy="12" r="3.5" />
        <circle cx="68" cy="14" r="3.5" />
        <circle cx="80" cy="18" r="3.5" />

        <circle cx="16" cy="30" r="3.5" />
        <circle cx="28" cy="25" r="3.5" />
        <circle cx="40" cy="22" r="3.5" />
        <circle cx="52" cy="22" r="3.5" />
        <circle cx="64" cy="25" r="3.5" />
        <circle cx="76" cy="30" r="3.5" />

        <circle cx="20" cy="42" r="3.5" />
        <circle cx="32" cy="37" r="3.5" />
        <circle cx="44" cy="34" r="3.5" />
        <circle cx="56" cy="34" r="3.5" />
        <circle cx="68" cy="37" r="3.5" />
        <circle cx="80" cy="42" r="3.5" />

        <circle cx="28" cy="50" r="3" />
        <circle cx="40" cy="46" r="3" />
        <circle cx="52" cy="46" r="3" />
        <circle cx="64" cy="50" r="3" />

        <circle cx="36" cy="60" r="2.8" />
        <circle cx="48" cy="57" r="2.8" />
        <circle cx="60" cy="60" r="2.8" />
      </svg>
      <div className="flex flex-col text-right leading-none">
        <span className="font-extrabold text-xs sm:text-sm tracking-wider font-sans" style={{ color: textColor }}>
          وزارة الـتـعـلـيـم
        </span>
        <span className="text-[7.5px] sm:text-[8.5px] font-sans font-semibold tracking-normal mt-0.5" style={{ color: subColor }}>
          Ministry of Education
        </span>
      </div>
    </div>
  );
}

function BarcodeGraphic({ code = "20261007A007" }) {
  const bars = [];
  for (let i = 0; i < 48; i++) {
    const isWide = (i * 7 + code.charCodeAt(i % code.length)) % 3 === 0;
    const isSkip = (i * 11) % 23 === 0;
    if (!isSkip) {
      bars.push(isWide ? 3.2 : 1.4);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-[1.5px] h-7 sm:h-8">
        {bars.map((w, idx) => (
          <div 
            key={idx} 
            className="bg-[#0e2b5c] h-full"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>
      <span className="font-mono text-[10px] font-bold text-[#0e2b5c] tracking-widest mt-1">
        {code}
      </span>
    </div>
  );
}

export default function GuestTicketView({ 
  token, 
  seats, 
  eventDetails, 
  onBackToDashboard,
  rowParam,
  seatParam,
  levelParam,
  sectorParam
}) {
  const cardRef = useRef(null);
  const [showSeatCardModal, setShowSeatCardModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [walletAdded, setWalletAdded] = useState(false);

  // Find seat: first by guest token, then by row+number from QR params
  const seat = seats.find((s) => s.guest && s.guest.token === token)
    || (rowParam && seatParam
        ? seats.find((s) =>
            String(s.row).toUpperCase() === String(rowParam).toUpperCase() &&
            String(s.number) === String(parseInt(seatParam, 10))
          )
        : null);

  if (!seat) {
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mb-4 text-rose-400">
          ⚠️
        </div>
        <h2 className="text-xl font-bold text-rose-400 mb-2">رمز الدعوة غير صحيح أو منتهي</h2>
        <p className="text-xs text-white/70 max-w-sm mb-6">
          لم نتمكن من العثور على حجز مرتبط بهذا الرمز. يرجى التأكد من مسح كود الـ QR الصحيح.
        </p>
        {onBackToDashboard && (
          <button
            onClick={onBackToDashboard}
            className="px-5 py-2.5 rounded-xl bg-white/20 text-amber-300 text-xs font-bold border border-white/30 shadow-lg"
          >
            العودة للوحة التحكم
          </button>
        )}
      </div>
    );
  }



  const baseUrl = window.location.origin + window.location.pathname;
  const seatQrParams = new URLSearchParams({
    ...(seat.guest?.token ? { invitation: seat.guest.token } : {}),
    row:    seat.row     || '',
    seat:   seat.number  ? String(seat.number) : '',
    level:  seat.level   || '',
    sector: seat.sector  || '',
  });
  const invitationUrl = `${baseUrl}?${seatQrParams.toString()}`;
  const seatDisplay = `${seat.row}${parseInt(seat.number, 10)}`;
  const barcodeNumber = `20261007${seat.row}${String(seat.number).padStart(3, '0')}`;


  const handleDownloadPNG = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false
      });
      
      canvas.toBlob((blob) => {
        if (!blob) {
          setIsDownloading(false);
          return;
        }
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `تذكرة_حضور_${seat.guest.name}_مقعد_${seatDisplay}.png`;
        link.href = blobUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
        setIsDownloading(false);
      }, 'image/png');

    } catch (err) {
      console.error('Error rendering PNG ticket', err);
      alert('حدث خطأ أثناء تصدير الصورة، يرجى المحاولة مرة أخرى.');
      setIsDownloading(false);
    }
  };

  const handleCopyWhatsApp = () => {
    const text = `🎫 *تـذكـرة حـضـور ومـوقـع مـقـعـد الـمـسـرح* 🎫\n\n` +
      `يسر الإدارة العامة للتعليم بمنطقة عسير دعوتكم لحضور:\n` +
      `✨ *${eventDetails.title || 'مسرح الإدارة العامة للتعليم بمنطقة عسير'}* ✨\n\n` +
      `👤 *اسم الضيف:* ${seat.guest.name}\n` +
      (seat.guest.jobTitle ? `💼 *المنصب:* ${seat.guest.jobTitle}\n` : '') +
      `🏷️ *الفئة:* ${seat.guest.category}\n` +
      `💺 *المقعد المخصص:* الصف (${seat.row}) - مقعد (${seatDisplay})\n` +
      `📍 *المكان:* ${eventDetails.venue || 'مسرح الإدارة العامة للتعليم بمنطقة عسير'}\n` +
      `⏰ *الوقت:* ${eventDetails.time || '07:00 م'}\n` +
      `📅 *التاريخ:* ${eventDetails.date || '2026/10/07'} (الأربعاء)\n\n` +
      `📲 *رابط بطاقة الحضور والباركود الذكي وموقع المقعد التفاعلي:*\n` +
      `${invitationUrl}\n\n` +
      `أهلاً وسهلاً بحضوركم الكريم ✨`;

    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleAddToWallet = () => {
    setWalletAdded(true);
    setTimeout(() => setWalletAdded(false), 4000);
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-start py-4 sm:py-6 px-3 sm:px-6">
      
      {/* Top Bar for Admin / Previewer */}
      {onBackToDashboard && (
        <div className="w-full max-w-3xl flex justify-between items-center mb-3">
          <button
            onClick={onBackToDashboard}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md text-white/90 hover:text-white text-xs border border-white/20 transition-all shadow-md"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة للوحة تحكم المسرح</span>
          </button>
          <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-400/30 font-black">
            بوابة المستفيد والضيف
          </span>
        </div>
      )}

      {/* Check-in status alert */}
      {seat.status === 'checked_in' && (
        <div className="w-full max-w-3xl mb-3 flex items-center justify-center gap-2 text-xs font-bold text-emerald-200 bg-emerald-500/20 py-2.5 px-4 rounded-2xl border border-emerald-400/40 shadow-lg animate-fade-in">
          <ShieldCheck className="w-5 h-5 text-emerald-300" />
          <span>تم تسجيل دخولك بنجاح عند الباب - أهلاً وسهلاً بك في مسرح تعليم عسير!</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🗺️ HERO: INTERACTIVE THEATER MAP — FIRST THING VISIBLE AFTER QR SCAN */}
      {/* ========================================================================= */}
      <div className="w-full max-w-3xl mb-5 glass-panel-gold rounded-3xl p-4 sm:p-5 border-2 border-amber-500/30 shadow-2xl">
        
        {/* Map Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3 mb-3">
          <h2 className="text-sm sm:text-base font-bold text-amber-300 flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-300" />
            <span>موقع مقعدك على خريطة المسرح التفاعلية</span>
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Glowing seat badge */}
            <span className="text-xs text-rose-300 font-black flex items-center gap-1.5 bg-rose-500/15 px-3 py-1.5 rounded-full border border-rose-500/30 animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0"></span>
              <span>مقعدك: الصف ({seat.row}) – رقم ({String(seat.number).padStart(2,'0')})</span>
            </span>
            <button
              onClick={() => setShowSeatCardModal(true)}
              className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 text-xs font-bold transition-all flex items-center gap-1 hover:bg-cyan-500/30"
            >
              <Armchair className="w-3.5 h-3.5 text-cyan-300" />
              <span>بطاقة المقعد</span>
            </button>
          </div>
        </div>

        {/* Level & Sector quick info */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
            <Ticket className="w-3.5 h-3.5 text-amber-300" />
            <span>{seat.levelName || (seat.level === 'B' ? 'الدور الثاني - البلكونة' : 'الدور الأرضي')}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
            <MapPin className="w-3.5 h-3.5 text-emerald-300" />
            <span>القطاع: {seat.sector || 'الوسط'}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
            <DoorClosed className="w-3.5 h-3.5 text-cyan-300" />
            <span>{seat.entrance || 'المدخل الرئيسي'}</span>
          </div>
        </div>

        {/* Theater Map Component */}
        <div className="w-full bg-[#050b18] rounded-2xl border border-white/15 p-2 sm:p-3 overflow-hidden shadow-inner">
          <TheaterMap
            seats={seats}
            onSelectSeat={() => {}}
            selectedSeatId={seat.id}
            isBeneficiaryView={true}
            highlightSeatId={seat.id}
          />
        </div>

      </div>

      {/* ========================================================================= */}
      {/* ATTENDANCE TICKET CARD */}
      {/* ========================================================================= */}
      <div 
        ref={cardRef}
        dir="rtl"
        className="w-full max-w-xl bg-gradient-to-b from-[#051329] via-[#091f42] to-[#040e21] rounded-[36px] sm:rounded-[44px] p-4 sm:p-6 border-4 border-[#1e293b] shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden select-none mb-6"
        style={{ fontFamily: "'Cairo', 'Readex Pro', sans-serif" }}
      >
        {/* Top Screen Header: Slogan on Right & Ministry Logo on Left */}
        <div className="flex items-start justify-between px-2 mb-3.5 relative z-20">
          <div className="text-right space-y-0.5">
            <div className="text-xs font-bold text-white leading-tight">
              معاً .. نصنع تعليماً يليق بالمستقبل
            </div>
            <div className="text-[8px] text-slate-300 font-sans tracking-wide">
              Together for a brighter future
            </div>
            <div className="w-12 h-[2px] bg-amber-400 rounded-full mt-1"></div>
          </div>

          <div className="flex flex-col items-end">
            <MinistryOfEducationLogo 
              className="h-10" 
              color="#ffffff" 
              textColor="#ffffff" 
              subColor="#cbd5e1" 
            />
          </div>
        </div>

        {/* The Unified Modern Attendance Card */}
        <div className="flex justify-center w-full my-2 relative z-20">
          <ModernAttendanceCard
            seat={seat}
            eventDetails={eventDetails}
            cardType="attendance"
            customTitle="بطاقة حضور"
            customSubtitle="ATTENDANCE TICKET"
            customSlogan="نلتقي لنصنع أجمل اللحظات"
            className="shadow-2xl"
          />
        </div>

        {/* 6 Comprehensive Action Buttons */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-4 px-1 relative z-20">
          <button
            onClick={handleDownloadPNG}
            disabled={isDownloading}
            className="py-2.5 px-1.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-[10px] transition-all flex flex-col items-center justify-center gap-1 shadow-md active:scale-95"
            title="تحميل التذكرة كصورة"
          >
            <Download className="w-4 h-4 text-cyan-300" />
            <span className="truncate max-w-full">{isDownloading ? 'جاري...' : 'حفظ كصورة'}</span>
            <span className="text-[7.5px] text-slate-400 font-sans">Save PNG</span>
          </button>

          <button
            onClick={() => generateIcsCalendarFile(eventDetails, seat)}
            className="py-2.5 px-1.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-[10px] transition-all flex flex-col items-center justify-center gap-1 shadow-md active:scale-95"
            title="إضافة موعد الفعالية لتقويم الهاتف"
          >
            <CalendarPlus className="w-4 h-4 text-amber-300" />
            <span className="truncate max-w-full">التقويم</span>
            <span className="text-[7.5px] text-slate-400 font-sans">Calendar</span>
          </button>

          <a
            href={getGoogleMapsUrl(eventDetails.venue || eventDetails.hallName)}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-1.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-[10px] transition-all flex flex-col items-center justify-center gap-1 shadow-md active:scale-95 text-center"
            title="فتح الموقع على خرائط جوجل"
          >
            <Navigation className="w-4 h-4 text-emerald-300" />
            <span className="truncate max-w-full">الاتجاهات</span>
            <span className="text-[7.5px] text-slate-400 font-sans">Maps</span>
          </a>

          <button
            onClick={handleCopyWhatsApp}
            className="py-2.5 px-1.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-[10px] transition-all flex flex-col items-center justify-center gap-1 shadow-md active:scale-95"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">تم النسخ!</span>
                <span className="text-[7.5px] text-emerald-200">Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-cyan-300" />
                <span className="truncate max-w-full">مشاركة</span>
                <span className="text-[7.5px] text-slate-400 font-sans">Share</span>
              </>
            )}
          </button>

          <button
            onClick={() => setShowSeatCardModal(true)}
            className="py-2.5 px-1.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-[10px] transition-all flex flex-col items-center justify-center gap-1 shadow-md active:scale-95"
            title="عرض بطاقة المقعد الأفقية"
          >
            <Armchair className="w-4 h-4 text-purple-300" />
            <span className="truncate max-w-full">بطاقة المقعد</span>
            <span className="text-[7.5px] text-slate-400 font-sans">Seat Card</span>
          </button>

          <button
            onClick={() => window.print()}
            className="py-2.5 px-1.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-[10px] transition-all flex flex-col items-center justify-center gap-1 shadow-md active:scale-95"
            title="طباعة التذكرة"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span className="truncate max-w-full">طباعة</span>
            <span className="text-[7.5px] text-slate-400 font-sans">Print</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="text-center mt-3 pt-2 border-t border-white/10 relative z-20 space-y-0.5">
          <div className="text-[9px] text-slate-300 font-sans flex items-center justify-center gap-2">
            <span>وزارة التعليم</span>
            <span>|</span>
            <span>Ministry of Education</span>
          </div>
          <div className="text-[8px] text-slate-400">
            معاً .. نصنع تعليماً يليق بالمستقبل
          </div>
        </div>

      </div>

      {/* Optional Seat Card Modal */}
      {showSeatCardModal && (
        <SeatCardModal
          seat={seat}
          eventDetails={eventDetails}
          onClose={() => setShowSeatCardModal(false)}
        />
      )}

    </div>
  );
}

