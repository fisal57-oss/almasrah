import React, { forwardRef } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  DoorClosed, 
  Ticket, 
  Armchair, 
  Crown 
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { formatArabicSeatCode, buildInvitationQrUrl } from '../utils/storage';

/**
 * Vector Barcode Graphic
 */
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

/**
 * Official Aseer Education Theater Approved Ticket Card
 * Matches the official design required for printing and PNG export.
 */
const AseerOfficialTicketCard = forwardRef(function AseerOfficialTicketCard({ 
  seat, 
  eventDetails = {}, 
  className = "" 
}, ref) {
  // Seat formatting
  const seatDisplay = seat ? formatArabicSeatCode(seat) : 'A01';
  const seatRow = seat?.row || 'A';
  const seatNum = seat?.number ? String(seat.number).padStart(2, '0') : '01';
  const barcodeNumber = seat?.guest?.token 
    ? seat.guest.token.replace(/[^0-9A-Za-z]/g, '') 
    : `20261007${seatRow}${String(seatNum).padStart(3, '0')}`;

  const guestName = seat?.guest?.name || 'عميد عسيري';
  const guestJob = seat?.guest?.jobTitle || 'مشرف';
  const guestCategory = seat?.guest?.category || 'إعلام وصحافة';
  const isVip = seat?.isVip || guestCategory.includes('VIP') || guestCategory.includes('كبار');

  const title = eventDetails?.title || 'المسرح الرئيسي - حفل التكريم والافتتاح';
  const venue = eventDetails?.venue || 'المسرح الرئيسي - القاعة الكبرى';
  const dateStr = eventDetails?.date || 'الجمعة ، 25 أكتوبر 2026';
  const timeStr = eventDetails?.time || '08:00 مساءً (تفتح الأبواب 07:00 مساءً)';
  const entrance = seat?.entrance || 'المدخل الرئيسي';

  const baseUrl = typeof window !== 'undefined' ? (window.location.origin + window.location.pathname) : '';
  const qrValue = seat?.guest?.token 
    ? buildInvitationQrUrl(seat, baseUrl) 
    : (baseUrl || 'https://moe.gov.sa');

  return (
    <div 
      ref={ref}
      dir="ltr"
      className={`aseer-approved-ticket-card w-full max-w-4xl bg-white text-[#0b1b3d] rounded-[28px] overflow-hidden border-2 border-slate-200 shadow-2xl grid grid-cols-1 md:grid-cols-[1fr_240px] mx-auto select-none ${className}`}
      style={{ 
        minHeight: '440px', 
        fontFamily: "'Cairo', 'Readex Pro', system-ui, sans-serif",
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact'
      }}
    >
      {/* ============================================================
          MAIN TICKET BODY (LEFT IN LTR GRID, RIGHT IN ARABIC VIEW)
          ============================================================ */}
      <div 
        dir="rtl" 
        className="p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-cyan-50/30 text-right"
      >
        {/* Background Theater Stage graphic with subtle mask */}
        <div 
          className="absolute top-0 left-0 w-1/2 h-56 pointer-events-none overflow-hidden z-0 opacity-15"
          style={{
            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, transparent 100%)'
          }}
        >
          <img 
            src="theater_stage.jpg" 
            alt="Theater Stage" 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>

        {/* Top Header: Logo on Right + Slogan Badge on Left */}
        <div className="relative z-10 flex items-center justify-between gap-4 border-b border-slate-200/80 pb-3">
          <div className="flex items-center gap-3">
            <img 
              src="ministry_logo.png" 
              alt="وزارة التعليم" 
              className="h-10 sm:h-11 max-h-11 max-w-[140px] object-contain"
              onError={(e) => {
                // Fallback to SVG if png not found
                e.target.src = "saudi_moe_logo.svg";
              }}
            />
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
              {title}
            </h2>
            <p className="text-[11px] font-bold text-slate-500 font-sans tracking-wide">
              Aseer Education General Directorate Theater
            </p>
          </div>
        </div>

        {/* Event Details Grid (3 Columns: Venue, Time, Date) */}
        <div className="relative z-10 my-2 py-2.5 px-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm grid grid-cols-3 gap-2 divide-x divide-x-reverse divide-slate-100 text-center">
          {/* Column 1: Date */}
          <div className="flex flex-col items-center justify-center px-1">
            <div className="flex items-center gap-1 text-[#0b1b3d] font-bold text-xs mb-0.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-600" />
              <span>التاريخ</span>
            </div>
            <span className="text-xs font-black text-slate-900">
              {dateStr}
            </span>
            <span className="text-[9px] text-slate-500 font-bold">الأربعاء</span>
          </div>

          {/* Column 2: Time */}
          <div className="flex flex-col items-center justify-center px-1">
            <div className="flex items-center gap-1 text-[#0b1b3d] font-bold text-xs mb-0.5">
              <Clock className="w-3.5 h-3.5 text-cyan-600" />
              <span>الوقت</span>
            </div>
            <span className="text-xs font-black text-slate-900">
              {timeStr}
            </span>
            <span className="text-[9px] text-slate-500 font-medium">تفتح الأبواب مبكراً</span>
          </div>

          {/* Column 3: Venue */}
          <div className="flex flex-col items-center justify-center px-1">
            <div className="flex items-center gap-1 text-[#0b1b3d] font-bold text-xs mb-0.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-600" />
              <span>الموقع</span>
            </div>
            <span className="text-[10px] font-bold text-slate-800 leading-tight">
              {venue}
            </span>
          </div>
        </div>

        {/* Seat Information 3 Cards */}
        <div className="relative z-10 grid grid-cols-3 gap-2.5 my-2">
          {/* Entrance */}
          <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div className="text-right">
              <span className="text-[9px] text-slate-500 font-bold block">المدخل</span>
              <span className="text-xs font-black text-[#0b1b3d]">
                {entrance}
              </span>
            </div>
            <div className="w-7 h-7 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
              <DoorClosed className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Row */}
          <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div className="text-right">
              <span className="text-[9px] text-slate-500 font-bold block">رقم الصف</span>
              <span className="text-sm font-black text-[#0b1b3d] font-mono">{seatRow}</span>
            </div>
            <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Ticket className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Seat Number (Highlighted with Cyan Border) */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-2.5 sm:p-3 rounded-2xl border-2 border-cyan-400/80 shadow-sm flex items-center justify-between">
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

        {/* Guest Name Row with Category Badge */}
        <div className="relative z-10 flex items-center justify-between bg-white px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-sm my-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">المدعو:</span>
            <span className="text-sm sm:text-base font-black text-[#0b1b3d]">
              {guestName}
            </span>
            {guestJob && (
              <span className="text-[11px] text-slate-500 font-medium">
                ({guestJob})
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {isVip ? (
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

      {/* ============================================================
          RIGHT STUB (QR CODE & BARCODE STUB)
          ============================================================ */}
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
            value={qrValue}
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
});

export default AseerOfficialTicketCard;
