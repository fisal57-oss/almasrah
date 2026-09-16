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
  Globe,
  Crown,
  Sparkles,
  QrCode
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { MinistryOfEducationLogo } from './ModernAttendanceCard';
import { buildInvitationQrUrl } from '../utils/storage';

function BarcodeGraphic({ code = "20261007A001" }) {
  const bars = [];
  for (let i = 0; i < 48; i++) {
    const isWide = (i * 7 + code.charCodeAt(i % code.length)) % 3 === 0;
    const isSkip = (i * 11) % 21 === 0;
    if (!isSkip) {
      bars.push(isWide ? 3.0 : 1.4);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-[1.5px] h-8">
        {bars.map((w, idx) => (
          <div key={idx} className="bg-[#0b1b3d] h-full" style={{ width: `${w}px` }} />
        ))}
      </div>
      <span className="font-mono text-[10px] font-black text-[#0b1b3d] tracking-widest mt-0.5">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xl overflow-y-auto" dir="rtl">
      
      <div className="relative w-full max-w-5xl my-4 bg-[#081226] p-5 sm:p-7 rounded-3xl border border-cyan-500/30 text-right shadow-2xl">
        
        {/* Top Header */}
        <div className="no-print flex flex-wrap items-center justify-between pb-4 border-b border-white/10 mb-5 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <Printer className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">طباعة تذاكر الحضور الرسمية</h2>
              <p className="text-xs text-slate-300 mt-0.5">
                توليد وطباعة تذاكر الضيوف والمقاعد بالنموذج الرسمي المعتمد (جاهزة للطباعة ورقة A4)
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
        <div className="no-print bg-[#0c1a36] p-4 rounded-2xl border border-white/10 mb-5 flex flex-wrap items-center justify-between gap-4 shadow-inner">
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
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 active:scale-95"
            >
              <Printer className="w-4 h-4 text-cyan-200" />
              <span>بدء طباعة جميع التذاكر ({targetSeats.length} تذكرة)</span>
            </button>
          </div>
        </div>

        {/* Scrollable Container with Live Preview */}
        <div className="batch-tickets-print-container max-h-[580px] overflow-y-auto space-y-8 p-4 rounded-2xl border border-white/10 bg-slate-950/60">
          {targetSeats.length === 0 ? (
            <div className="py-16 text-center text-slate-400 font-bold text-xs">
              لا توجد تذاكر مطابقة للفلاتر المحددة حالياً.
            </div>
          ) : (
            targetSeats.map((seat) => {
              const seatDisplay = `${seat.row}${String(seat.number).padStart(2, '0')}`;
              const barcodeNumber = `20261007${seat.row}${String(seat.number).padStart(3, '0')}`;
              const baseUrl = window.location.origin + window.location.pathname;
              const invitationUrl = buildInvitationQrUrl(seat, baseUrl);

              const guestName = seat.guest?.name || 'ضيف المسرح الكريم';
              const guestCategory = seat.guest?.category || (seat.isVip ? 'كبار الشخصيات VIP' : 'عام');

              return (
                <div 
                  key={seat.id}
                  dir="ltr"
                  className="single-ticket-print-wrapper w-full max-w-4xl bg-white text-[#0b1b3d] rounded-[28px] overflow-hidden border-2 border-slate-200 shadow-xl grid grid-cols-1 md:grid-cols-[1fr_260px] mx-auto select-none"
                  style={{ minHeight: '440px', fontFamily: "'Cairo', 'Readex Pro', sans-serif" }}
                >
                  
                  {/* MAIN TICKET BODY (LEFT IN LTR GRID, RIGHT IN ARABIC VIEW) */}
                  <div dir="rtl" className="p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-cyan-50/30 text-right">
                    
                    {/* Background Theater Stage graphic with subtle mask */}
                    <div 
                      className="absolute top-0 left-0 w-1/2 h-56 pointer-events-none overflow-hidden z-0 opacity-15"
                      style={{
                        maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, transparent 100%)'
                      }}
                    >
                      <img 
                        src="/theater_stage.jpg" 
                        alt="Theater Stage" 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>

                    {/* Top Header: Logo on Right + Slogan Badge */}
                    <div className="relative z-10 flex items-center justify-between gap-4 border-b border-slate-200/80 pb-3">
                      <div className="flex items-center gap-3">
                        {eventDetails?.logoUrl ? (
                          <img 
                            src={eventDetails.logoUrl} 
                            alt={eventDetails.title || "شعار الفعالية"} 
                            className="h-10 sm:h-11 max-h-11 max-w-[140px] object-contain"
                          />
                        ) : (
                          <MinistryOfEducationLogo 
                            className="h-10" 
                            color="#00a887" 
                            textColor="#0e2b5c" 
                            subColor="#4a6b63" 
                          />
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-[10px] font-black text-[#0b1b3d] bg-cyan-100/60 border border-cyan-300/60 px-3 py-1 rounded-full shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-[#00a887]"></div>
                        <span>مَعاً .. نَصنعُ تَعليماً يَليقُ بِالمُستقبل</span>
                      </div>
                    </div>

                    {/* Main Title & Event Subtitle */}
                    <div className="relative z-10 my-3 space-y-1">
                      <div className="flex items-center gap-2.5">
                        <h1 className="text-2xl sm:text-3xl font-black text-[#0b1b3d] tracking-tight">
                          تـذكـرة حـضـور
                        </h1>
                        <span className="text-[10px] font-bold text-cyan-700 bg-cyan-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider font-sans">
                          EVENT TICKET
                        </span>
                        <div className="h-1 flex-1 bg-gradient-to-l from-transparent via-cyan-400 to-[#00a887] rounded-full"></div>
                      </div>
                      
                      <div className="space-y-0.5">
                        <h2 className="text-sm sm:text-base font-black text-[#0b1b3d]">
                          {eventDetails.title || 'مسرح الإدارة العامة للتعليم بمنطقة عسير'}
                        </h2>
                        <p className="text-[11px] font-bold text-slate-500 font-sans tracking-wide">
                          Aseer Education General Directorate Theater
                        </p>
                      </div>
                    </div>

                    {/* Event Details Grid (3 Columns: Date, Time, Venue) */}
                    <div className="relative z-10 my-2 py-2.5 px-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm grid grid-cols-3 gap-2 divide-x divide-x-reverse divide-slate-100 text-center">
                      <div className="flex flex-col items-center justify-center px-1">
                        <div className="flex items-center gap-1 text-[#0b1b3d] font-bold text-xs mb-0.5">
                          <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                          <span>التاريخ</span>
                        </div>
                        <span className="text-xs font-black text-slate-900 font-mono">
                          {eventDetails.date || '2026/10/07'}
                        </span>
                        <span className="text-[9px] text-slate-500 font-bold">الأربعاء</span>
                      </div>

                      <div className="flex flex-col items-center justify-center px-1">
                        <div className="flex items-center gap-1 text-[#0b1b3d] font-bold text-xs mb-0.5">
                          <Clock className="w-3.5 h-3.5 text-cyan-600" />
                          <span>الوقت</span>
                        </div>
                        <span className="text-xs font-black text-slate-900 font-mono">
                          {eventDetails.time || '07:00 م'}
                        </span>
                        <span className="text-[9px] text-slate-500 font-medium">تفتح الأبواب مبكراً</span>
                      </div>

                      <div className="flex flex-col items-center justify-center px-1">
                        <div className="flex items-center gap-1 text-[#0b1b3d] font-bold text-xs mb-0.5">
                          <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                          <span>الموقع</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-800 leading-tight">
                          {eventDetails.venue || 'المسرح الرئيسي'}
                        </span>
                      </div>
                    </div>

                    {/* Seat Information 3 Cards */}
                    <div className="relative z-10 grid grid-cols-3 gap-2.5 my-2">
                      <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                        <div className="text-right">
                          <span className="text-[9px] text-slate-500 font-bold block">المدخل</span>
                          <span className="text-xs font-black text-[#0b1b3d]">
                            {seat.entrance || 'المدخل الرئيسي'}
                          </span>
                        </div>
                        <div className="w-7 h-7 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                          <DoorClosed className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                        <div className="text-right">
                          <span className="text-[9px] text-slate-500 font-bold block">رقم الصف</span>
                          <span className="text-sm font-black text-[#0b1b3d] font-mono">{seat.row}</span>
                        </div>
                        <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                          <Ticket className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-2.5 sm:p-3 rounded-2xl border-2 border-cyan-400/60 shadow-sm flex items-center justify-between">
                        <div className="text-right">
                          <span className="text-[9px] text-cyan-800 font-bold block">رقم المقعد</span>
                          <span className="text-base sm:text-lg font-black text-[#0b1b3d] font-mono tracking-tight">
                            {seatDisplay}
                          </span>
                        </div>
                        <div className="w-7 h-7 rounded-xl bg-cyan-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                          <Armchair className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Guest Name Row with VIP Badge */}
                    <div className="relative z-10 flex items-center justify-between bg-white px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-sm my-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">المدعو:</span>
                        <span className="text-sm sm:text-base font-black text-[#0b1b3d]">
                          {guestName}
                        </span>
                        {seat.guest?.jobTitle && (
                          <span className="text-[11px] text-slate-500 font-medium">
                            ({seat.guest.jobTitle})
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        {seat.isVip ? (
                          <span className="text-[10px] bg-amber-500 text-white font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                            <Crown className="w-3 h-3" />
                            <span>كبار الشخصيات VIP</span>
                          </span>
                        ) : (
                          <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2.5 py-0.5 rounded-full border border-slate-200">
                            {guestCategory}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Dark Footer Bar with Ministry Socials */}
                    <div className="relative z-10 mt-2 -mx-6 sm:-mx-7 -mb-6 sm:-mb-7 bg-[#0b1b3d] text-white px-6 py-2.5 flex items-center justify-between text-[10px] font-bold">
                      <div className="flex items-center gap-2">
                        <span>الإدارة العامة للتعليم بمنطقة عسير</span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-cyan-300 text-[10px]">
                        <span>moe_arp</span>
                        <span>|</span>
                        <span>www.moe.gov.sa</span>
                      </div>
                    </div>

                  </div>

                  {/* RIGHT STUB (QR CODE & BARCODE STUB) */}
                  <div 
                    dir="rtl" 
                    className="border-t md:border-t-0 md:border-r-2 border-dashed border-slate-300 p-5 bg-gradient-to-b from-slate-50 via-white to-slate-100 flex flex-col justify-between items-center text-center relative"
                  >
                    {/* Top Notch Header */}
                    <div className="w-full bg-[#0b1b3d] text-white py-1.5 px-3 rounded-xl text-center shadow-sm">
                      <div className="text-xs font-black tracking-wide">تذكرة حضور</div>
                      <div className="text-[8px] font-sans tracking-widest text-cyan-300 uppercase">
                        EVENT TICKET
                      </div>
                    </div>

                    {/* QR Code Container */}
                    <div className="p-2.5 bg-white rounded-2xl border-2 border-slate-200 shadow-md my-2">
                      <QRCodeSVG
                        value={invitationUrl}
                        size={120}
                        level="M"
                        includeMargin={false}
                        fgColor="#0b1b3d"
                      />
                    </div>

                    <div className="space-y-0.5">
                      <p className="text-[10px] font-black text-[#0b1b3d]">
                        يرجى إبراز التذكرة عند الدخول
                      </p>
                      <p className="text-[8px] text-slate-500 font-sans tracking-tight">
                        Please show your ticket at the entrance
                      </p>
                    </div>

                    {/* Barcode Graphic */}
                    <div className="w-full pt-2 border-t border-slate-200">
                      <BarcodeGraphic code={barcodeNumber} />
                    </div>

                    {/* Slogan at bottom of stub */}
                    <div className="pt-2 text-center">
                      <div className="text-[9px] font-black text-[#00a887]">
                        تـعـلـيـم يـصـنـع الـفُـرص
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
