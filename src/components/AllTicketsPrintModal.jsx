import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Ticket, 
  Filter, 
  Check, 
  Armchair, 
  Download, 
  Layers,
  Calendar,
  Clock,
  MapPin,
  DoorClosed,
  Globe
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

/**
 * Ministry of Education Vector Logo Component
 */
function MinistryOfEducationLogo({ className = "h-12" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 100 80" className="h-full w-auto text-[#00a887]" fill="currentColor">
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
      <div className="flex flex-col text-right leading-tight">
        <span className="font-extrabold text-sm sm:text-base text-[#00a887] tracking-wider font-sans">
          وزارة الـتـعـلـيـم
        </span>
        <span className="text-[8px] sm:text-[9px] text-[#4a6b63] font-sans font-semibold tracking-normal">
          Ministry of Education
        </span>
      </div>
    </div>
  );
}

function BarcodeGraphic({ code = "20261007A007" }) {
  const bars = [];
  for (let i = 0; i < 46; i++) {
    const isWide = (i * 7 + code.charCodeAt(i % code.length)) % 3 === 0;
    const isSkip = (i * 11) % 19 === 0;
    if (!isSkip) {
      bars.push(isWide ? 3 : 1.5);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-[1.5px] h-8 sm:h-9">
        {bars.map((w, idx) => (
          <div key={idx} className="bg-[#0e2b5c] h-full" style={{ width: `${w}px` }} />
        ))}
      </div>
      <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#0e2b5c] tracking-widest mt-0.5">
        {code}
      </span>
    </div>
  );
}

export default function AllTicketsPrintModal({ seats, eventDetails, onClose }) {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [filterMode, setFilterMode] = useState('reserved_only');

  const reservedCount = seats.filter(s => s.guest).length;

  const targetSeats = seats.filter(seat => {
    if (filterMode === 'reserved_only' && !seat.guest) return false;
    if (categoryFilter !== 'all' && seat.guest?.category !== categoryFilter) return false;
    return true;
  });

  const categories = Array.from(new Set(seats.map(s => s.guest?.category).filter(Boolean)));

  const handlePrintAll = () => {
    try {
      document.body.classList.add('is-printing-all-tickets');
      window.print();
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        document.body.classList.remove('is-printing-all-tickets');
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-indigo-950/85 backdrop-blur-xl overflow-y-auto">
      
      <div className="relative w-full max-w-5xl my-4 glass-panel-luxury p-5 sm:p-7 rounded-3xl border border-white/20 text-right shadow-2xl">
        
        {/* Top Header */}
        <div className="no-print flex flex-wrap items-center justify-between pb-4 border-b border-white/10 mb-5 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <Printer className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">طباعة جميع تذاكر الحضور الرسمية</h2>
              <p className="text-xs text-slate-300 mt-0.5">
                توليد وطباعة تذاكر الضيوف والمقاعد بالنموذج الرسمي المعتمد (كل تذكرة في ورقة A4 مستقلة)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all border border-white/15"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar & Filters */}
        <div className="no-print bg-slate-900/80 p-4 rounded-2xl border border-white/10 mb-5 flex flex-wrap items-center justify-between gap-4 shadow-inner">
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Mode */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setFilterMode('reserved_only')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  filterMode === 'reserved_only' ? 'bg-cyan-400 text-slate-950 shadow-md font-black' : 'text-white/70 hover:text-white'
                }`}
              >
                تذاكر المحجوزين فقط ({reservedCount})
              </button>
              <button
                onClick={() => setFilterMode('all_seats')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  filterMode === 'all_seats' ? 'bg-cyan-400 text-slate-950 shadow-md font-black' : 'text-white/70 hover:text-white'
                }`}
              >
                جميع مقاعد المسرح ({seats.length})
              </button>
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="flex items-center gap-2 mr-2">
                <span className="text-xs text-slate-300 font-bold">الفئة:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-xl border border-white/20 focus:outline-none"
                >
                  <option value="all">كل الفئات ({categories.length})</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-cyan-300 font-bold hidden sm:inline">
              التذاكر الجاهزة: <strong className="text-white text-sm mr-1 font-mono">{targetSeats.length}</strong>
            </span>

            <button
              onClick={handlePrintAll}
              disabled={targetSeats.length === 0}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00d2ff] via-[#334b85] to-[#7952b3] hover:brightness-110 text-white font-black text-xs shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Printer className="w-4.5 h-4.5 text-cyan-200" />
              <span>بدء طباعة جميع التذاكر ({targetSeats.length} تذكرة)</span>
            </button>
          </div>
        </div>

        {/* Scrollable Container with Live Preview */}
        <div className="batch-tickets-print-container max-h-[550px] overflow-y-auto space-y-8 p-4 rounded-2xl border border-white/10 bg-slate-950/60">
          {targetSeats.length === 0 ? (
            <div className="py-16 text-center text-slate-400 font-bold">
              لا توجد تذاكر مطابقة للفلاتر المحددة حالياً.
            </div>
          ) : (
            targetSeats.map((seat) => {
              const seatDisplay = `${seat.row}${parseInt(seat.number, 10)}`;
              const barcodeNumber = `20261007${seat.row}${String(seat.number).padStart(3, '0')}`;
              const baseUrl = window.location.origin + window.location.pathname;
              const invitationUrl = seat.guest ? `${baseUrl}?invitation=${seat.guest.token}` : baseUrl;

              return (
                <div 
                  key={seat.id}
                  dir="ltr"
                  className="single-ticket-print-wrapper w-full max-w-4xl bg-white text-[#0e2b5c] rounded-[24px] overflow-hidden border-0 relative shadow-md grid grid-cols-1 md:grid-cols-[1fr_260px] mx-auto select-none"
                  style={{ minHeight: '450px', fontFamily: "'Segoe UI', 'Tajawal', 'Cairo', sans-serif" }}
                >
                  {/* MAIN TICKET BODY (LEFT SIDE IN LTR GRID) */}
                  <div dir="rtl" className="p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden bg-white text-right">
                    
                    {/* Background Theater Stage Graphic */}
                    <div 
                      className="absolute top-0 left-0 w-7/12 h-60 pointer-events-none overflow-hidden z-0"
                      style={{
                        maskImage: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)'
                      }}
                    >
                      <img 
                        src={eventDetails.theaterImageUrl || "/theater_stage.jpg"} 
                        alt="Theater Stage" 
                        className="w-full h-full object-cover object-left-top"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>

                    {/* Logo & Slogan */}
                    <div className="relative z-10 flex items-start justify-start">
                      <div className="flex flex-col items-start gap-1">
                        {eventDetails.logoUrl ? (
                          <img 
                            src={eventDetails.logoUrl} 
                            alt="Logo" 
                            className="h-[50px] max-w-[200px] object-contain shrink-0" 
                            style={{ height: '50px' }}
                          />
                        ) : (
                          <MinistryOfEducationLogo className="h-[50px]" style={{ height: '50px' }} />
                        )}
                        
                        <div className="flex items-center gap-1.5 text-[10px] font-black text-[#0e2b5c] bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-md shadow-sm mt-0.5">
                          <div className="w-2 h-1 bg-[#00c0d8] rounded-full"></div>
                          <span>مِن أجلِ تعليمٍ مُلهِم</span>
                        </div>
                      </div>
                    </div>

                    {/* Main Title & Subtitle */}
                    <div className="relative z-10 mt-2 sm:mt-3 space-y-1">
                      <div className="flex items-center gap-2">
                        <h1 className="text-3xl sm:text-4xl font-black text-[#0e2b5c]">
                          تذكرة حضور
                        </h1>
                        <div className="w-8 sm:w-10 h-1.5 rounded-full bg-[#00c0d8] mt-1.5"></div>
                      </div>
                      
                      <div className="flex flex-col items-start space-y-0.5">
                        <h2 className="text-sm sm:text-base font-black text-[#0e2b5c]">
                          مسرح الإدارة العامة للتعليم بمنطقة عسير
                        </h2>
                        <p className="text-[10px] sm:text-[13.5px] font-bold text-[#5a7698] tracking-wide">
                          Aseer Education General Directorate Theater
                        </p>
                      </div>
                    </div>

                    {/* Event Details Row (3 Columns) */}
                    <div className="relative z-10 my-3 py-2.5 px-3 sm:px-4 rounded-2xl bg-slate-50/90 backdrop-blur-md shadow-sm grid grid-cols-3 gap-2 divide-x divide-x-reverse divide-slate-200 text-center">
                      <div className="flex flex-col items-center justify-center px-1">
                        <div className="flex items-center gap-1 text-[#0e2b5c] font-bold text-xs mb-0.5">
                          <Calendar className="w-3.5 h-3.5 text-[#00c0d8]" />
                          <span>التاريخ</span>
                        </div>
                        <span className="text-xs font-black text-slate-800 font-mono">
                          {eventDetails.date || '2026 / 10 / 07'}
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold">الأربعاء</span>
                      </div>

                      <div className="flex flex-col items-center justify-center px-1">
                        <div className="flex items-center gap-1 text-[#0e2b5c] font-bold text-xs mb-0.5">
                          <Clock className="w-3.5 h-3.5 text-[#00c0d8]" />
                          <span>الوقت</span>
                        </div>
                        <span className="text-xs font-black text-slate-800">
                          {eventDetails.time ? eventDetails.time.split('(')[0].trim() : '07:00 م'}
                        </span>
                        <span className="text-[9px] text-slate-500 font-semibold">تفتح الأبواب مبكراً</span>
                      </div>

                      <div className="flex flex-col items-center justify-center px-1">
                        <div className="flex items-center gap-1 text-[#0e2b5c] font-bold text-xs mb-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#00c0d8]" />
                          <span>الموقع</span>
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 leading-tight">
                          مسرح الإدارة العامة للتعليم بمنطقة عسير
                        </span>
                      </div>
                    </div>

                    {/* Seat Information 3 Cards */}
                    <div className="relative z-10 grid grid-cols-3 gap-2.5 sm:gap-3 my-1">
                      <div className="bg-slate-50/90 p-2.5 sm:p-3 rounded-2xl shadow-sm flex items-center justify-between">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 font-bold block">المدخل</span>
                          <span className="text-xs sm:text-sm font-black text-[#0e2b5c]">المدخل الرئيسي</span>
                        </div>
                        <div className="w-8 h-8 rounded-xl bg-cyan-100/50 flex items-center justify-center text-[#0e2b5c] shrink-0">
                          <DoorClosed className="w-4 h-4 text-[#00c0d8]" />
                        </div>
                      </div>

                      <div className="bg-slate-50/90 p-2.5 sm:p-3 rounded-2xl shadow-sm flex items-center justify-between">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 font-bold block">رقم الصف</span>
                          <span className="text-sm sm:text-base font-black text-[#0e2b5c] font-mono">{seat.row}</span>
                        </div>
                        <div className="w-8 h-8 rounded-xl bg-cyan-100/50 flex items-center justify-center text-[#0e2b5c] shrink-0">
                          <Ticket className="w-4 h-4 text-[#00c0d8]" />
                        </div>
                      </div>

                      <div className="bg-slate-50/90 p-2.5 sm:p-3 rounded-2xl shadow-sm flex items-center justify-between">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 font-bold block">رقم المقعد</span>
                          <span className="text-base sm:text-lg font-black text-[#0e2b5c] font-mono tracking-tight">{seatDisplay}</span>
                        </div>
                        <div className="w-8 h-8 rounded-xl bg-cyan-100/50 flex items-center justify-center text-[#0e2b5c] shrink-0">
                          <Armchair className="w-4 h-4 text-[#0e2b5c]" />
                        </div>
                      </div>
                    </div>

                    {/* Guest Name Row */}
                    <div className="relative z-10 mt-2 flex items-center justify-between text-xs pt-1.5 border-t border-slate-100">
                      <span className="text-slate-600 font-bold">
                        المدعو: <strong className="text-[#0e2b5c] text-sm font-black mr-1">{seat.guest ? seat.guest.name : 'مقعد غير مخصص'}</strong>
                      </span>
                      {seat.guest?.category && (
                        <span className="text-[10px] px-3 py-0.5 rounded-full bg-[#00c0d8]/15 text-[#0e2b5c] font-black">
                          {seat.guest.category}
                        </span>
                      )}
                    </div>

                    {/* Bottom Gradient Footer Bar */}
                    <div className="relative z-10 -mx-5 -mb-5 sm:-mx-7 sm:-mb-7 mt-3 py-2.5 px-5 sm:px-7 bg-gradient-to-r from-[#0e2b5c] via-[#1b3d75] to-[#254f8e] text-white flex items-center justify-between text-[10px] sm:text-xs">
                      <div className="flex items-center gap-2.5 font-mono text-cyan-200">
                        <div className="flex items-center gap-1.5 text-white/90">
                          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M12.002 2c-3.8 0-6.2 2.7-6.2 5.6 0 1.2.4 2.5 1.1 3.4.1.2.1.4 0 .6-.4.4-1.2.7-1.8.8-.4.1-.6.4-.5.7.1.5.8.9 1.6 1 .2 0 .4.2.4.4 0 .8-.5 2.1-2.1 2.5-.4.1-.6.5-.5.8.2.5 1 .9 2.1.8.4 0 .7.2.9.5.6 1.1 1.7 1.7 3.5 1.7 1 0 1.8-.2 2.3-.4.3-.1.7-.1 1 0 .5.2 1.3.4 2.3.4 1.8 0 2.9-.6 3.5-1.7.2-.3.5-.5.9-.5 1.1.1 1.9-.3 2.1-.8.1-.3-.1-.7-.5-.8-1.6-.4-2.1-1.7-2.1-2.5 0-.2.2-.4.4-.4.8-.1 1.5-.5 1.6-1 .1-.3-.1-.6-.5-.7-.6-.1-1.4-.4-1.8-.8-.1-.2-.1-.4 0-.6.7-.9 1.1-2.2 1.1-3.4 0-2.9-2.4-5.6-6.2-5.6z"/></svg>
                          <Globe className="w-3 h-3" />
                        </div>
                        <span>moe_arp</span>
                      </div>
                      <div className="font-bold text-white tracking-wide">
                        الإدارة العامة للتعليم بمنطقة عسير
                      </div>
                    </div>
                  </div>

                  {/* RIGHT TICKET STUB (RIGHT SIDE IN LTR GRID) */}
                  <div dir="rtl" className="bg-white p-4 sm:p-5 flex flex-col items-center justify-between relative border-t md:border-t-0 md:border-l border-dashed border-slate-300/60 overflow-hidden">
                    <div className="w-full py-2 px-3 rounded-xl bg-[#0e2b5c] text-white text-center shadow-md z-10">
                      <div className="text-sm font-black tracking-wide">تذكرة حضور</div>
                      <div className="text-[8px] font-mono font-bold tracking-widest text-cyan-200 uppercase">EVENT TICKET</div>
                    </div>

                    <div className="my-2 p-2.5 bg-slate-50/80 rounded-2xl shadow-sm flex flex-col items-center z-10">
                      <QRCodeSVG
                        value={invitationUrl}
                        size={130}
                        level="H"
                        includeMargin={false}
                        fgColor="#0e2b5c"
                        bgColor="#ffffff"
                      />
                    </div>

                    <div className="text-center space-y-0.5 my-1 z-10">
                      <div className="text-[10px] font-black text-[#0e2b5c]">
                        يرجى إبراز التذكرة عند الدخول
                      </div>
                      <div className="text-[8px] font-sans font-bold text-slate-500">
                        Please show your ticket at the entrance
                      </div>
                    </div>

                    <div className="w-full pt-1.5 border-t border-slate-200 z-10">
                      <BarcodeGraphic code={barcodeNumber} />
                    </div>

                    <div className="w-full relative mt-2 pt-1 overflow-hidden flex flex-col items-end z-10">
                      <div className="w-full relative h-16">
                        <svg viewBox="0 0 200 90" className="w-full h-full object-cover" preserveAspectRatio="none" fill="none">
                          <polygon points="0,90 0,15 45,0 120,55 200,90" fill="#e2edf7" />
                          <polygon points="0,90 0,38 40,20 95,72 200,90" fill="#c4ddf2" />
                          <polygon points="0,90 0,62 30,42 75,90" fill="#8cbde5" />
                          <path d="M0,52 Q90,75 200,85 L200,90 L0,90 Z" fill="#2d6cb5" />
                          <path d="M0,68 Q100,85 200,88 L200,90 L0,90 Z" fill="#1b4b88" />
                        </svg>
                        <div className="absolute right-2 top-1 text-right select-none font-bold text-[#0e2b5c]">
                          <div className="text-[11px] sm:text-xs font-black text-[#0e2b5c] leading-tight">تعلِيمٌ يصنَعُ</div>
                          <div className="text-[11px] sm:text-xs font-black text-[#0e2b5c] leading-tight">الفُرَص</div>
                          <div className="w-5 h-1 bg-[#00c0d8] rounded-full mt-0.5 mr-0 ml-auto"></div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
