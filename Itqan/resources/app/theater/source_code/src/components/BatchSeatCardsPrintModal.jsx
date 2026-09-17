import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Armchair, 
  Filter, 
  Check, 
  Download, 
  Layers, 
  Sparkles 
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import ModernAttendanceCard from './ModernAttendanceCard';

function MinistryLogo({ className = "h-8" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 100 80" className="h-full w-auto text-[#00a887]" fill="currentColor">
        <circle cx="20" cy="18" r="3.5" /><circle cx="32" cy="14" r="3.5" /><circle cx="44" cy="12" r="3.5" /><circle cx="56" cy="12" r="3.5" /><circle cx="68" cy="14" r="3.5" /><circle cx="80" cy="18" r="3.5" />
        <circle cx="16" cy="30" r="3.5" /><circle cx="28" cy="25" r="3.5" /><circle cx="40" cy="22" r="3.5" /><circle cx="52" cy="22" r="3.5" /><circle cx="64" cy="25" r="3.5" /><circle cx="76" cy="30" r="3.5" />
        <circle cx="20" cy="42" r="3.5" /><circle cx="32" cy="37" r="3.5" /><circle cx="44" cy="34" r="3.5" /><circle cx="56" cy="34" r="3.5" /><circle cx="68" cy="37" r="3.5" /><circle cx="80" cy="42" r="3.5" />
        <circle cx="28" cy="50" r="3" /><circle cx="40" cy="46" r="3" /><circle cx="52" cy="46" r="3" /><circle cx="64" cy="50" r="3" />
        <circle cx="36" cy="60" r="2.8" /><circle cx="48" cy="57" r="2.8" /><circle cx="60" cy="60" r="2.8" />
      </svg>
      <div className="flex flex-col text-right leading-none">
        <span className="font-extrabold text-[11px] text-[#00a887] tracking-wider font-sans">
          وزارة الـتـعـلـيـم
        </span>
        <span className="text-[7px] text-[#4a6b63] font-sans font-semibold">
          Ministry of Education
        </span>
      </div>
    </div>
  );
}

function BarcodeMini({ code = "20261007A007" }) {
  const bars = [];
  for (let i = 0; i < 30; i++) {
    const isWide = (i * 7 + code.charCodeAt(i % code.length)) % 3 === 0;
    bars.push(isWide ? 2.5 : 1.2);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-[1px] h-5">
        {bars.map((w, idx) => (
          <div key={idx} className="bg-[#0e2b5c] h-full" style={{ width: `${w}px` }} />
        ))}
      </div>
      <span className="font-mono text-[7px] font-bold text-[#0e2b5c] tracking-widest mt-0.5">
        {code}
      </span>
    </div>
  );
}

export default function BatchSeatCardsPrintModal({ seats, eventDetails, onClose }) {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [filterMode, setFilterMode] = useState('reserved_only');
  const [cardsPerPage, setCardsPerPage] = useState('4'); // '4' or '2'

  const reservedSeats = seats.filter(s => s.guest);

  const targetSeats = seats.filter(seat => {
    if (filterMode === 'reserved_only' && !seat.guest) return false;
    if (categoryFilter !== 'all' && seat.guest?.category !== categoryFilter) return false;
    return true;
  });

  const categories = Array.from(
    new Set(reservedSeats.map(s => s.guest?.category).filter(Boolean))
  );

  const baseUrl = window.location.origin + window.location.pathname;

  const handlePrint = () => {
    try {
      document.body.classList.add('is-printing-batch-seat-cards');
      window.print();
    } catch (e) {
      console.error('Batch seat cards print error:', e);
    } finally {
      setTimeout(() => {
        document.body.classList.remove('is-printing-batch-seat-cards');
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
      
      <div className="relative w-full max-w-6xl my-2 flex flex-col items-center">
        
        {/* Top Control Bar */}
        <div className="no-print w-full glass-panel-luxury p-4 rounded-3xl border border-cyan-500/30 mb-4 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-lg">
              <Armchair className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <span>طباعة بطاقات المقاعد جماعياً لكراسي المسرح (A4)</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  {targetSeats.length} بطاقة
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                مجهزة وموزعة على ورق A4 مع خطوط قص واضحة للتثبيت المباشر على الكراسي
              </p>
            </div>
          </div>

          {/* Filters & Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Filter mode */}
            <select
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value)}
              className="bg-white/10 text-xs text-white border border-white/20 rounded-xl px-3 py-2 outline-none"
            >
              <option value="reserved_only" className="bg-slate-900 text-white">المقاعد المحجوزة فقط ({reservedSeats.length})</option>
              <option value="all" className="bg-slate-900 text-white">جميع مقاعد المسرح ({seats.length})</option>
            </select>

            {/* Category filter */}
            {categories.length > 0 && (
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-white/10 text-xs text-white border border-white/20 rounded-xl px-3 py-2 outline-none"
              >
                <option value="all" className="bg-slate-900 text-white">كافة الفئات</option>
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-slate-900 text-white">{c}</option>
                ))}
              </select>
            )}

            {/* Print button */}
            <button
              onClick={handlePrint}
              disabled={targetSeats.length === 0}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:brightness-110 text-white font-black text-xs shadow-lg transition-all flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>بدء الطباعة على A4 ({targetSeats.length})</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BATCH PRINT CONTAINER (A4 GRID) */}
        {/* ========================================================================= */}
        <div className="batch-seat-cards-container w-full bg-slate-900/60 p-4 rounded-3xl border border-white/10">
          
          {targetSeats.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-sm">
              لا توجد مقاعد مطابقة للفلتر المحدد
            </div>
          ) : (
            <div className="batch-seat-cards-grid grid grid-cols-1 gap-6 max-w-4xl mx-auto">
              {targetSeats.map((seat) => (
                <div key={seat.id} className="single-seat-card-wrapper flex justify-center p-2">
                  <ModernAttendanceCard
                    seat={seat}
                    eventDetails={eventDetails}
                    cardType="seat"
                    orientation="landscape"
                    customTitle="بطاقة حجز مقعد"
                    customSubtitle="SEAT RESERVATION PLACARD"
                    customSlogan="نلتقي لنصنع أجمل اللحظات"
                    className="shadow-md"
                  />
                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
