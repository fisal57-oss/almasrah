import React, { useRef, useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Share2, 
  Armchair, 
  Calendar, 
  MapPin, 
  DoorClosed, 
  Sparkles, 
  QrCode,
  Layers,
  Mail,
  Check,
  Briefcase,
  Ticket,
  User
} from 'lucide-react';
import { exportElementToPng } from '../utils/exportImage';
import ModernAttendanceCard from './ModernAttendanceCard';

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
  for (let i = 0; i < 44; i++) {
    const isWide = (i * 7 + code.charCodeAt(i % code.length)) % 3 === 0;
    const isSkip = (i * 11) % 23 === 0;
    if (!isSkip) {
      bars.push(isWide ? 3.2 : 1.4);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-[1.5px] h-6 sm:h-7">
        {bars.map((w, idx) => (
          <div key={idx} className="bg-[#0e2b5c] h-full" style={{ width: `${w}px` }} />
        ))}
      </div>
      <span className="font-mono text-[9px] font-bold text-[#0e2b5c] tracking-widest mt-1">
        {code}
      </span>
    </div>
  );
}

export default function SeatCardModal({
  seat,
  eventDetails = {},
  onClose,
  onOpenInvitation,
  onOpenBatchPrint
}) {
  const cardRef = useRef(null);
  const [orientation, setOrientation] = useState('landscape'); // 'landscape' | 'portrait'
  const [isDownloading, setIsDownloading] = useState(false);

  if (!seat) return null;

  const baseUrl = window.location.origin + window.location.pathname;
  const seatToken = seat.guest?.token || seat.id;
  const qrUrl = `${baseUrl}?invitation=${seatToken}`;
  const seatDisplay = `${seat.row}${parseInt(seat.number, 10)}`;
  const barcodeNumber = `20261007${seat.row}${String(seat.number).padStart(3, '0')}`;

  const handleDownloadPNG = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const fileName = orientation === 'landscape' 
        ? `بطاقة_مقعد_A4_بالعرض_${seatDisplay}_${seat.guest?.name || 'متاح'}.png`
        : `بطاقة_مقعد_${seatDisplay}_${seat.guest?.name || 'متاح'}.png`;

      await exportElementToPng(
        cardRef.current,
        fileName,
        {
          pixelRatio: 3,
          backgroundColor: '#ffffff',
          onSuccess: () => setIsDownloading(false),
          onError: () => setIsDownloading(false)
        }
      );
    } catch (err) {
      console.error('Error rendering seat card PNG', err);
      alert('حدث خطأ أثناء تصدير بطاقة المقعد، يرجى المحاولة مرة أخرى.');
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    try {
      document.body.classList.add('is-printing-seat-single');
      window.print();
    } catch (e) {
      console.error('Print error:', e);
    } finally {
      setTimeout(() => {
        document.body.classList.remove('is-printing-seat-single');
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 md:py-6 bg-[#040812]/90 backdrop-blur-xl overflow-y-auto">
      
      <div className={`relative w-full ${orientation === 'landscape' ? 'max-w-4xl' : 'max-w-xl'} my-2 flex flex-col items-center transition-all duration-300`}>
        
        {/* Toolbar */}
        <div className="no-print flex flex-wrap items-center justify-between mb-4 glass-panel-luxury p-3 sm:p-4 rounded-2xl border border-cyan-500/30 w-full gap-2 shadow-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <Armchair className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-black text-cyan-200 block">بطاقة المقعد المعتمدة (A4 بالعرض)</span>
              <span className="text-[10px] text-slate-300">مجهزة للتثبيت على كراسي المسرح والطباعة العريضة</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Orientation Toggle */}
            <div className="flex items-center bg-white/10 p-1 rounded-xl border border-white/20 text-xs">
              <button
                onClick={() => setOrientation('landscape')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  orientation === 'landscape' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-white/80 hover:text-white'
                }`}
                title="عرض A4 بالعرض (الافتراضي للطباعة والتثبيت)"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>A4 بالعرض</span>
              </button>
              <button
                onClick={() => setOrientation('portrait')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  orientation === 'portrait' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-white/80 hover:text-white'
                }`}
                title="عرض عمودي"
              >
                <span>عمودي</span>
              </button>
            </div>

            {seat.guest && onOpenInvitation && (
              <button
                onClick={() => onOpenInvitation(seat)}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 font-bold text-xs transition-all flex items-center gap-1.5"
                title="عرض كرت الدعوة وتذكرة الحضور"
              >
                <Ticket className="w-4 h-4 text-amber-300" />
                <span>الدعوة</span>
              </button>
            )}

            {onOpenBatchPrint && (
              <button
                onClick={onOpenBatchPrint}
                className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-200 font-bold text-xs transition-all flex items-center gap-1.5"
                title="طباعة جميع بطاقات المقاعد على ورق A4"
              >
                <Layers className="w-4 h-4 text-purple-300" />
                <span>طباعة جماعية</span>
              </button>
            )}

            <button
              onClick={handleDownloadPNG}
              disabled={isDownloading}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:brightness-110 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'جاري التحميل...' : 'حفظ كصورة'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-cyan-300" />
              <span>طباعة A4</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* UNIFIED SEAT PLACARD / CHAIR CARD (TARGET REF) */}
        {/* ========================================================================= */}
        <div className="flex justify-center w-full">
          <ModernAttendanceCard
            innerRef={cardRef}
            seat={seat}
            eventDetails={eventDetails}
            cardType="seat"
            orientation={orientation}
            customTitle="بطاقة حجز مقعد"
            customSubtitle="SEAT RESERVATION PLACARD"
            customSlogan="نلتقي لنصنع أجمل اللحظات"
            className="shadow-[0_20px_50px_rgba(14,43,92,0.35)]"
          />
        </div>


      </div>
    </div>
  );
}
