import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Armchair, 
  Ticket, 
  DoorClosed, 
  MapPin, 
  Clock, 
  Calendar, 
  User 
} from 'lucide-react';
import { formatArabicSeatCode, getEventDetails } from '../utils/storage';

/**
 * Laurel Leaf Flourish SVG for invitation title
 */
function LaurelFlourish({ className = "w-7 h-7 text-[#162a5c]", flip = false }) {
  return (
    <svg 
      viewBox="0 0 40 24" 
      className={`${className} ${flip ? 'scale-x-[-1]' : ''}`} 
      fill="currentColor"
    >
      <path d="M5,12 C12,6 24,5 35,2 C30,9 25,18 15,20 C10,21 6,17 5,12 Z" opacity="0.95" />
      <path d="M12,8 C18,3 26,4 32,2 C28,7 22,12 16,13 C13,13 11,11 12,8 Z" opacity="0.8" />
      <path d="M2,16 C7,14 14,15 20,13 C16,17 11,21 5,21 C3,21 2,19 2,16 Z" opacity="0.7" />
    </svg>
  );
}

/**
 * Wing / Ribbon Decorative Flourish
 */
function WingFlourish({ className = "w-28 h-2.5 text-[#162a5c]" }) {
  return (
    <svg viewBox="0 0 160 20" className={className} fill="currentColor">
      <path d="M80,10 C70,10 50,2 20,4 C10,5 0,10 0,10 C15,8 40,8 75,13 L80,14 L85,13 C120,8 145,8 160,10 C160,10 150,5 140,4 C110,2 90,10 80,10 Z" opacity="0.85" />
      <circle cx="80" cy="10" r="2.5" fill="#4f46e5" />
    </svg>
  );
}

/**
 * Barcode Vector Graphic
 */
function BarcodeGraphic({ code = "20261007A005", className = "h-7 sm:h-8" }) {
  const bars = [];
  for (let i = 0; i < 48; i++) {
    const isWide = (i * 7 + code.charCodeAt(i % code.length)) % 3 === 0;
    const isSkip = (i * 13) % 27 === 0;
    if (!isSkip) {
      bars.push(isWide ? 3.0 : 1.3);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`flex items-center gap-[1.2px] ${className}`}>
        {bars.map((w, idx) => (
          <div 
            key={idx} 
            className="bg-[#0f1f4b] h-full"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>
      <span className="font-mono text-[9.5px] sm:text-[10px] font-black text-[#0f1f4b] tracking-wider mt-0.5">
        {code}
      </span>
    </div>
  );
}

/**
 * Geometric wireframe decoration for the top-left corner
 */
function WireframeMesh({ className = "w-28 h-28" }) {
  return (
    <svg viewBox="0 0 120 120" className={`pointer-events-none ${className}`} fill="none" stroke="#94a3b8" strokeWidth="0.7" opacity="0.4">
      <polygon points="0,0 45,15 30,55 0,40" />
      <polygon points="45,15 90,5 75,45 30,55" />
      <polygon points="90,5 120,20 105,60 75,45" />
      <polygon points="30,55 75,45 60,95 15,85" />
      <polygon points="75,45 105,60 95,105 60,95" />
      <polygon points="0,40 30,55 15,85 0,80" />
      <line x1="45" y1="15" x2="60" y2="95" strokeDasharray="1 2" />
      <line x1="75" y1="45" x2="15" y2="85" strokeDasharray="1 2" />
    </svg>
  );
}

/**
 * Official Ministry of Education Logo component for fallback
 */
export function MinistryOfEducationLogo({ className = "h-11", color = "#00a887", textColor = "#00a887", subColor = "#4a6b63" }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
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
        <span className="font-extrabold text-xs sm:text-sm tracking-normal font-sans" style={{ color: textColor }}>
          وزارة التعليم
        </span>
        <span className="text-[7.5px] sm:text-[8.5px] font-sans font-semibold tracking-normal mt-0.5" style={{ color: subColor }}>
          Ministry of Education
        </span>
      </div>
    </div>
  );
}


/**
 * Blue Asir Mountain Silhouette Vector
 */
function MountainGraphic() {
  return (
    <div className="w-full relative leading-none overflow-hidden select-none -mb-[1px]">
      <svg viewBox="0 0 400 135" className="w-full h-auto block max-h-20 sm:max-h-24" preserveAspectRatio="none">
        <defs>
          <linearGradient id="mountGradSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbfaf7" stopOpacity="0" />
            <stop offset="100%" stopColor="#dce8f5" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="mountGradBack" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9dbde0" />
            <stop offset="100%" stopColor="#7a9fc7" />
          </linearGradient>
          <linearGradient id="mountGradMid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#416fa3" />
            <stop offset="100%" stopColor="#2c5382" />
          </linearGradient>
          <linearGradient id="mountGradFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a3d6e" />
            <stop offset="100%" stopColor="#0e2b5c" />
          </linearGradient>
        </defs>

        {/* Sky gradient haze */}
        <rect x="0" y="0" width="400" height="135" fill="url(#mountGradSky)" />

        {/* Layer 1: Distant Light Peaks */}
        <path d="M0,65 L55,35 L120,60 L185,30 L250,55 L325,32 L400,50 L400,135 L0,135 Z" fill="url(#mountGradBack)" opacity="0.6" />
        
        {/* Layer 2: Mid-range Peaks */}
        <path d="M0,85 L70,50 L145,75 L225,42 L300,70 L370,55 L400,68 L400,135 L0,135 Z" fill="url(#mountGradMid)" opacity="0.85" />

        {/* Layer 3: Foreground Deep Blue Mountains */}
        <path d="M0,105 L80,72 L160,95 L245,62 L320,88 L400,76 L400,135 L0,135 Z" fill="url(#mountGradFront)" />

        {/* Base blend into footer banner */}
        <path d="M0,120 L100,98 L200,114 L295,95 L400,110 L400,135 L0,135 Z" fill="#0e2b5c" />
      </svg>
    </div>
  );
}

/**
 * Panoramic Blue Asir Mountain Silhouette Vector for A4 Landscape
 */
function MountainGraphicLandscape() {
  return (
    <div className="w-full relative leading-none overflow-hidden select-none -mb-[1px]">
      <svg viewBox="0 0 900 110" className="w-full h-auto block max-h-16 sm:max-h-20" preserveAspectRatio="none">
        <defs>
          <linearGradient id="mountGradSkyLand" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbfaf7" stopOpacity="0" />
            <stop offset="100%" stopColor="#dce8f5" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="mountGradBackLand" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9dbde0" />
            <stop offset="100%" stopColor="#7a9fc7" />
          </linearGradient>
          <linearGradient id="mountGradMidLand" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#416fa3" />
            <stop offset="100%" stopColor="#2c5382" />
          </linearGradient>
          <linearGradient id="mountGradFrontLand" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a3d6e" />
            <stop offset="100%" stopColor="#0e2b5c" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="900" height="110" fill="url(#mountGradSkyLand)" />
        <path d="M0,55 L75,25 L160,48 L250,22 L340,46 L440,20 L540,44 L640,22 L730,42 L820,24 L900,38 L900,110 L0,110 Z" fill="url(#mountGradBackLand)" opacity="0.6" />
        <path d="M0,70 L90,38 L190,62 L295,32 L405,58 L510,34 L615,54 L715,32 L810,50 L900,40 L900,110 L0,110 Z" fill="url(#mountGradMidLand)" opacity="0.85" />
        <path d="M0,88 L105,55 L215,80 L330,48 L440,74 L550,48 L660,72 L765,50 L855,68 L900,58 L900,110 L0,110 Z" fill="url(#mountGradFrontLand)" />
        <path d="M0,100 L135,80 L270,95 L405,76 L540,92 L675,78 L810,90 L900,82 L900,110 L0,110 Z" fill="#0e2b5c" />
      </svg>
    </div>
  );
}

/**
 * Modern Attendance / Seat / Invitation Card
 * Supports both 9:16 Portrait (Invitations/Tickets) and A4 Landscape (Seat Placards).
 */
export default function ModernAttendanceCard({
  seat,
  eventDetails = {},
  cardType = 'attendance', // 'attendance' | 'invitation' | 'seat'
  orientation = 'auto', // 'auto' | 'landscape' | 'portrait'
  customTitle,
  customSubtitle,
  customSlogan = "نلتقي لنصنع أجمل اللحظات",
  className = "",
  innerRef
}) {
  if (!seat) return null;

  const baseUrl = typeof window !== 'undefined' ? (window.location.origin + window.location.pathname) : '';
  const seatToken = seat.guest?.token || seat.id;
  
  // Keep QR URL short and clean for easy scanning
  // Use token if available, otherwise row+seat (minimal params = simpler QR = easier scan)
  const qrUrl = seatToken
    ? `${baseUrl}?invitation=${seatToken}`
    : `${baseUrl}?row=${seat.row || ''}&seat=${seat.number || ''}`;

  // Active event details from props or fallback to storage
  const activeEvent = (eventDetails && (eventDetails.logoUrl || eventDetails.title)) 
    ? eventDetails 
    : getEventDetails();
  const currentLogo = activeEvent?.logoUrl;

  // Pill badge code: e.g. A-05 or A-01
  const rowLetter = seat.row || 'A';
  const seatNum = String(seat.number).padStart(2, '0');
  const pillSeatCode = `${rowLetter}-${seatNum}`;

  // Titles based on type
  const title = customTitle || (
    cardType === 'invitation' ? 'دعوة إلكترونية' :
    cardType === 'seat' ? 'بطاقة حجز مقعد' :
    'بطاقة حضور'
  );

  const subtitle = customSubtitle || (
    cardType === 'invitation' ? 'ELECTRONIC INVITATION' :
    cardType === 'seat' ? 'SEAT RESERVATION PLACARD' :
    'ATTENDANCE TICKET'
  );

  const isLandscape = orientation === 'landscape' || (orientation === 'auto' && cardType === 'seat');

  /* ========================================================================= */
  /* A4 LANDSCAPE SEAT PLACARD (بطاقة المقاعد بمقاس A4 بالعرض - التصميم الجديد المطابق للصورة تماماً) */
  /* ========================================================================= */
  if (isLandscape) {
    const floorAr = seat.levelName || (seat.level === 'B' ? 'البلكونة' : 'الدور الأرضي');
    const floorEn = (seat.level === 'B' || (seat.levelName && seat.levelName.includes('بلكون'))) ? 'BALCONY' : 'GROUND FLOOR';
    
    let sectorAr = seat.sector || 'اليسار';
    let sectorEn = 'LEFT';
    if (sectorAr.includes('يمين')) {
      sectorEn = 'RIGHT';
    } else if (sectorAr.includes('وسط')) {
      sectorEn = 'CENTER';
    }

    const eventTitleAr = activeEvent?.title || "المسرح الرئيسي - حفل التكريم والافتتاح";
    const eventSubtitleEn = activeEvent?.subtitle || "Main Theater - Honors and Opening Ceremony";
    const venueName = activeEvent?.venue || "المسرح الرئيسي - القاعة الكبرى";
    const eventDateText = activeEvent?.date ? activeEvent.date.split('(')[0].trim() : 'الجمعة، 25 أكتوبر 2026';
    const eventTimeText = activeEvent?.time ? activeEvent.time.split('(')[0].trim() : '08:00 مساءً';
    const doorsTimeText = activeEvent?.doorsTime || '07:00 مساءً';

    return (
      <div
        ref={innerRef}
        dir="rtl"
        className={`printable-seat-card-landscape relative w-full max-w-[860px] aspect-[297/210] bg-[#f8fbff] text-[#0e2b5c] rounded-[24px] sm:rounded-[32px] shadow-[0_20px_60px_rgba(14,43,92,0.22)] border-2 border-[#00b4d8]/40 overflow-hidden select-none flex flex-col justify-between ${className}`}
        style={{ fontFamily: "'Cairo', 'Readex Pro', sans-serif", aspectRatio: '297 / 210' }}
      >
        {/* Scenic Panoramic Asir Mountain Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('/aseer_seat_card_bg.png')` }}
        />

        {/* Soft atmospheric white mist overlay for crystal-clear readability */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ 
            background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.92) 40%, rgba(255,255,255,0.82) 70%, rgba(255,255,255,0.2) 88%, rgba(255,255,255,0) 100%)' 
          }}
        />

        {/* ========================================================================= */}
        {/* TIER 1: TOP HEADER ROW */}
        {/* ========================================================================= */}
        <div className="relative z-10 px-5 sm:px-8 pt-3 sm:pt-4 flex items-center justify-between gap-3">
          
          {/* RIGHT: Ministry Logo & Directorate Text */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {currentLogo ? (
              <img 
                src={currentLogo} 
                alt={activeEvent?.title || "شعار الفعالية"} 
                className="h-11 sm:h-14 max-h-14 max-w-[140px] object-contain"
              />
            ) : (
              <MinistryOfEducationLogo 
                className="h-10 sm:h-12"
                color="#0c234b"
                textColor="#0c234b"
                subColor="#476694"
              />
            )}
            <div className="h-10 w-px bg-slate-300/80 mx-0.5" />
            <div className="text-right leading-tight">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 block">المملكة العربية السعودية</span>
              <span className="text-xs sm:text-sm font-bold text-slate-700 block">وزارة التعليم</span>
              <span className="text-xs sm:text-sm font-black text-[#0c234b] block">إدارة التعليم</span>
              <span className="text-xs sm:text-sm font-black text-[#0c234b] block">بمنطقة عسير</span>
            </div>
          </div>

          {/* CENTER: Bismillah + Card Placard Title + Divider + English */}
          <div className="text-center shrink-0 px-2 flex flex-col items-center">
            <div className="text-[10px] sm:text-xs font-bold text-slate-600 font-serif mb-1 select-none">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0c234b] leading-none mb-1.5 whitespace-nowrap">
              بطاقة حجز مقعد
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mb-1.5 opacity-80" />
            <p className="text-[8px] sm:text-[9.5px] font-black text-[#476694] tracking-[0.25em] uppercase font-sans">
              SEAT RESERVATION PLACARD
            </p>
          </div>

          {/* LEFT: Venue & Timing Box */}
          <div className="w-[280px] sm:w-[310px] bg-white/80 backdrop-blur-md border border-cyan-300/80 rounded-2xl p-2 sm:p-2.5 shadow-xs text-right shrink-0">
            {/* Venue line */}
            <div className="flex items-center gap-1.5 text-xs font-black text-[#0c234b]">
              <svg className="w-3.5 h-3.5 text-cyan-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="truncate">{venueName}</span>
            </div>
            <div className="text-[10px] text-slate-500 font-bold pr-5 truncate">
              {eventTitleAr}
            </div>
            <div className="text-[8.5px] text-slate-400 font-medium pr-5 truncate font-sans">
              {eventSubtitleEn}
            </div>
            
            {/* Date line */}
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 mt-1 pt-1 border-t border-slate-100">
              <svg className="w-3.5 h-3.5 text-cyan-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
                <path strokeWidth="2" d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <span>{eventDateText}</span>
            </div>

            {/* Doors & Event time line */}
            <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold text-slate-700 mt-0.5">
              <svg className="w-3.5 h-3.5 text-cyan-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" strokeWidth="2" />
                <path strokeWidth="2" strokeLinecap="round" d="M12 7v5l3 3" />
              </svg>
              <span>{doorsTimeText}</span>
              <span className="text-slate-300 font-normal">|</span>
              <span className="text-[#0c234b] font-black">{eventTimeText}</span>
              <span className="text-[10px] text-slate-500 font-sans font-normal">(تفتح)</span>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* TIER 2: FULL-WIDTH HORIZONTAL GUEST BANNER */}
        {/* ========================================================================= */}
        <div className="relative z-10 mx-5 sm:mx-8 my-1 sm:my-1.5 bg-white/90 backdrop-blur-md border-2 border-cyan-300/80 rounded-2xl px-5 py-2.5 shadow-sm flex items-center justify-between">
          
          {/* RIGHT: User icon + الضيف المحترم */}
          <div className="flex items-center gap-2 text-sm sm:text-base font-black text-[#008ba3] shrink-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#008ba3]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span>الضيف المحترم</span>
          </div>

          {/* CENTER: Guest Name (Bold prominent) + Job Title */}
          <div className="text-center px-4 flex-1 overflow-hidden">
            <h2 className="text-xl sm:text-2xl font-black text-[#0c234b] tracking-tight truncate leading-tight">
              {seat.guest?.name || 'الأستاذة سارة بن عبد الله...'}
            </h2>
            <p className="text-xs sm:text-sm font-bold text-[#008ba3] mt-0.5 truncate">
              {seat.guest?.jobTitle || (seat.guest?.category ? seat.guest.category : 'مدير عام الإشراف التربوي')}
            </p>
          </div>

          {/* LEFT: Two Badges (المحترم + ضيف شرف) */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            <span className="text-[10px] sm:text-[11px] font-black text-cyan-900 bg-cyan-50 border border-cyan-200 px-3 py-0.5 rounded-lg shadow-2xs">
              {seat.guest?.category?.includes('VIP') ? 'سعادة المكرم' : 'المحترم'}
            </span>
            <span className="text-[10px] sm:text-[11px] font-extrabold text-cyan-900 bg-cyan-100/70 border border-cyan-200 px-3 py-0.5 rounded-lg shadow-2xs">
              {seat.guest?.category || 'ضيف شرف'}
            </span>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* TIER 3: LOWER SECTION (EVENT LEFT, SEAT CENTER, QR RIGHT) */}
        {/* ========================================================================= */}
        <div className="relative z-10 px-5 sm:px-8 py-1 flex items-center justify-between gap-4 flex-1">
          
          {/* RIGHT COLUMN (in RTL): QR Code & Verification */}
          <div className="w-[180px] shrink-0 flex flex-col items-center justify-center text-center">
            <div className="p-2 sm:p-2.5 bg-white rounded-2xl shadow-sm border border-slate-200/90">
              <QRCodeSVG
                value={qrUrl}
                size={86}
                level="H"
                fgColor="#0c234b"
                bgColor="#ffffff"
                includeMargin={false}
              />
            </div>
            <span className="text-xs sm:text-[13px] font-black text-[#0c234b] mt-1.5 block leading-tight">
              امسح للتحقق والموقع
            </span>
            <span className="text-[8px] sm:text-[9px] text-slate-500 font-medium block font-sans">
              Scan for verification & map
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-500 mt-0.5 block tracking-wider">
              {seat.guest?.token ? seat.guest.token.substring(0, 12).toUpperCase() : (seat.id || 'INV-IMRT789')}
            </span>
          </div>

          {/* CENTER COLUMN: Assigned Seat Header + Massive Stadium Pill + 4 Horizontal Cards */}
          <div className="flex-1 flex flex-col items-center justify-center max-w-[420px]">
            {/* Header */}
            <div className="text-center mb-1">
              <span className="text-xs font-black text-[#0c234b] block">المقعد المخصص</span>
              <span className="text-[9px] font-bold text-slate-500 tracking-wider block font-sans">ASSIGNED SEAT</span>
            </div>

            {/* Stadium Navy Blue Pill Badge */}
            <div className="w-full bg-[#0c2b64] text-white rounded-full py-1.5 sm:py-2 px-6 shadow-md mb-2 flex items-center justify-center">
              <span className="font-mono text-3xl sm:text-4xl font-black tracking-widest leading-none">
                {rowLetter} - {seatNum}
              </span>
            </div>

            {/* 4 Cards in a SINGLE HORIZONTAL ROW */}
            <div className="w-full grid grid-cols-4 gap-1 sm:gap-1.5">
              {/* Card 1: الصف */}
              <div className="bg-white/95 rounded-xl border border-slate-200/90 p-1 sm:p-1.5 text-center shadow-xs">
                <span className="text-[9.5px] text-slate-500 font-semibold block">الصف</span>
                <span className="text-sm sm:text-base font-black font-mono text-[#0c234b] block leading-tight">{rowLetter}</span>
                <span className="text-[7.5px] text-slate-400 font-bold block font-sans uppercase">
                  ROW<br />{rowLetter}
                </span>
              </div>

              {/* Card 2: رقم الكرسي */}
              <div className="bg-white/95 rounded-xl border border-slate-200/90 p-1 sm:p-1.5 text-center shadow-xs">
                <span className="text-[9.5px] text-slate-500 font-semibold block">رقم الكرسي</span>
                <span className="text-sm sm:text-base font-black font-mono text-[#0c234b] block leading-tight">{seatNum}</span>
                <span className="text-[7.5px] text-slate-400 font-bold block font-sans uppercase">
                  SEAT NUMBER<br />{seatNum}
                </span>
              </div>

              {/* Card 3: الدور */}
              <div className="bg-white/95 rounded-xl border border-slate-200/90 p-1 sm:p-1.5 text-center shadow-xs">
                <span className="text-[9.5px] text-slate-500 font-semibold block">الدور</span>
                <span className="text-[11px] sm:text-xs font-black text-[#0c234b] block truncate leading-tight">{floorAr}</span>
                <span className="text-[7.5px] text-slate-400 font-bold block font-sans uppercase">
                  FLOOR<br />{floorEn}
                </span>
              </div>

              {/* Card 4: القطاع */}
              <div className="bg-white/95 rounded-xl border border-slate-200/90 p-1 sm:p-1.5 text-center shadow-xs">
                <span className="text-[9.5px] text-slate-500 font-semibold block">القطاع</span>
                <span className="text-[11px] sm:text-xs font-black text-[#0c234b] block truncate leading-tight">{sectorAr}</span>
                <span className="text-[7.5px] text-slate-400 font-bold block font-sans uppercase">
                  SECTION<br />{sectorEn}
                </span>
              </div>
            </div>
          </div>

          {/* LEFT COLUMN (in RTL): Event Details */}
          <div className="w-[190px] shrink-0 flex flex-col justify-center text-right pr-2">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="h-px bg-cyan-300/80 flex-1" />
              <div className="flex items-center gap-1 text-xs font-black text-[#008ba3]">
                <span>الفعالية</span>
                <svg className="w-3.5 h-3.5 text-[#008ba3]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm sm:text-base font-black text-[#0c234b] leading-snug mb-1">
              {eventTitleAr}
            </h3>
            <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 font-sans leading-tight">
              {eventSubtitleEn}
            </p>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* TIER 4: BOTTOM FOOTER BANNER OVER PANORAMIC SCENERY */}
        {/* ========================================================================= */}
        <div className="w-full relative z-10 mt-auto">
          <div className="bg-gradient-to-r from-[#0c1e45]/95 via-[#102a63]/95 to-[#0c1e45]/95 text-white py-2 sm:py-2.5 px-6 sm:px-10 flex items-center justify-between border-t border-cyan-400/30">
            <p className="text-xs sm:text-sm font-black tracking-wide text-white">
              {customSlogan || "نلتقي لنصنع أجمل اللحظات"}
            </p>
            <div className="text-[10px] sm:text-xs text-cyan-200 font-medium">
              نظام حجز مقاعد مسارح إدارة التعليم بمنطقة عسير © 2026
            </div>
          </div>
        </div>

      </div>
    );
  }

  /* ========================================================================= */
  /* DEDICATED 9:16 ELECTRONIC INVITATION (تصميم الدعوة الخاصة الفاخرة المطابق للصورة) */
  /* ========================================================================= */
  if (cardType === 'invitation') {
    const eventDate = activeEvent?.date ? activeEvent.date.split('(')[0].trim() : '2026 / 10 / 07';
    const eventTime = activeEvent?.time ? activeEvent.time.split('(')[0].trim() : '07:00 م';
    const eventVenue = activeEvent?.venue || "مسرح الإدارة العامة للتعليم بمنطقة عسير";
    const eventEntrance = seat.entrance || "المدخل الرئيسي";
    const guestName = seat.guest?.name || 'أحمد محمد القحطاني';
    const guestJobTitle = seat.guest?.jobTitle || (seat.guest?.category ? seat.guest.category : 'المسمى الوظيفي');
    const barcodeCode = `20261007${rowLetter}${String(seat.number).padStart(3, '0')}`;

    return (
      <div
        ref={innerRef}
        dir="rtl"
        className={`relative w-full max-w-[390px] aspect-[9/16] bg-[#f8fbff] text-[#162a5c] rounded-[28px] sm:rounded-[32px] shadow-[0_20px_50px_rgba(14,43,92,0.28)] border-2 border-indigo-200/70 overflow-hidden select-none flex flex-col justify-between ${className}`}
        style={{ fontFamily: "'Cairo', 'Readex Pro', sans-serif", aspectRatio: '9 / 16' }}
      >
        {/* Scenic Asir Mountain & Heritage Village Background Image (uploaded by user) */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('/aseer_vertical_bg.png')` }}
        />

        {/* Soft atmospheric white mist overlay for crystal clear contrast */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ 
            background: 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.85) 15%, rgba(255,255,255,0.92) 42%, rgba(255,255,255,0.88) 68%, rgba(255,255,255,0.2) 88%, rgba(255,255,255,0) 100%)' 
          }}
        />

        {/* ========================================================================= */}
        {/* TOP HEADER: VERTICAL MOTTO (RIGHT) & MINISTRY LOGO (LEFT) */}
        {/* ========================================================================= */}
        <div className="relative z-10 px-4 pt-3.5 pb-1 flex items-start justify-between">
          {/* Top Right (first in RTL): Vertical Motto */}
          <div className="flex flex-col items-center select-none text-center">
            <div className="flex flex-col text-[10px] sm:text-[11px] font-black text-[#162a5c] leading-[1.1] tracking-normal">
              <span>من</span>
              <span>أجل</span>
              <span>تعليم</span>
              <span>ملهم</span>
            </div>
            <div className="w-7 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-600 rounded-full mt-1"></div>
          </div>

          {/* Top Left (second in RTL): Logo */}
          <div className="flex items-center">
            {currentLogo ? (
              <img 
                src={currentLogo} 
                alt={activeEvent?.title || "شعار الفعالية"} 
                className="h-10 sm:h-11 max-h-11 max-w-[130px] object-contain"
              />
            ) : (
              <MinistryOfEducationLogo 
                className="h-10"
                color="#00a887"
                textColor="#00a887"
                subColor="#4a6b63"
              />
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INVITATION TITLE & GREETING */}
        {/* ========================================================================= */}
        <div className="relative z-10 px-3 text-center -mt-1">
          {/* Title with Laurel Leaf Flourishes */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <LaurelFlourish className="w-6 h-6 sm:w-7 sm:h-7 text-[#162a5c]" />
            <h1 className="text-2xl sm:text-[26px] font-black tracking-normal text-[#162a5c] leading-none">
              دَعْوَةٌ خَاصَّة
            </h1>
            <LaurelFlourish className="w-6 h-6 sm:w-7 sm:h-7 text-[#162a5c]" flip />
          </div>

          <div className="text-[8px] sm:text-[8.5px] font-black text-[#162a5c] tracking-[0.25em] uppercase font-sans mt-0.5">
            INVITATION & EVENT TICKET
          </div>

          {/* Formal Invitation Statement */}
          <div className="mt-1 space-y-0.5 leading-snug">
            <div className="text-[11px] sm:text-[12px] font-black text-[#162a5c] tracking-normal">
              تتشرف الإدارة العامة للتعليم بمنطقة عسير
            </div>
            <div className="text-[10.5px] sm:text-[11px] font-bold text-[#162a5c] tracking-normal">
              بدعوتكم لحضور الفعالية
            </div>
            <div className="text-[9.5px] sm:text-[10px] font-bold text-slate-700 tracking-normal" dir="rtl">
              {activeEvent.title ? activeEvent.title : "مسرح الإدارة العامة للتعليم بمنطقة عسير"}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* GUEST CARD (اسم الضيف مع خطوط الحواشي البنفسجية) */}
        {/* ========================================================================= */}
        <div className="relative z-10 px-3 my-1">
          <div className="bg-white/95 rounded-2xl p-2 px-3 border border-slate-200/90 shadow-sm flex items-center justify-between">
            {/* Right bracket bar */}
            <div className="w-1 h-8 bg-indigo-500 rounded-full shrink-0"></div>

            <div className="flex-1 text-center px-1">
              <span className="text-[9px] font-bold text-slate-500 block mb-0.5">
                اسم الضيف
              </span>
              <div className="flex items-center justify-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-[#162a5c] flex items-center justify-center text-white shrink-0">
                  <User className="w-3 h-3" />
                </div>
                <h2 className="text-base sm:text-lg font-black text-[#162a5c] leading-tight">
                  {guestName}
                </h2>
              </div>
              <div className="mt-0.5 flex items-center justify-center gap-1">
                <span className="text-[9px] text-slate-400 font-bold">— المنصب —</span>
                <span className="text-[11px] sm:text-xs font-black text-[#008ba3]">
                  {guestJobTitle}
                </span>
              </div>
            </div>

            {/* Left bracket bar */}
            <div className="w-1 h-8 bg-indigo-500 rounded-full shrink-0"></div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LUXURY 2-ROW SPECS GRID (بيانات المقعد والفعالية كاملة وواضحة بدون أي اقتطاع) */}
        {/* ========================================================================= */}
        <div className="relative z-10 px-2.5 my-1">
          <div className="bg-white/98 rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden divide-y divide-slate-100">
            
            {/* الصف الأول: بيانات المقعد وبوابة الدخول (3 أعمدة مريحة وواسعة) */}
            <div className="grid grid-cols-3 divide-x divide-x-reverse divide-slate-100 py-1.5 px-1 text-center bg-slate-50/60">
              
              {/* رقم الصف */}
              <div className="flex flex-col items-center justify-center px-1">
                <div className="flex items-center justify-center gap-1 mb-0.5 text-blue-600">
                  <Armchair className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-bold text-slate-700">رقم الصف</span>
                </div>
                <span className="font-mono text-base sm:text-lg font-black text-[#162a5c] leading-none">
                  {rowLetter}
                </span>
                <span className="text-[7px] text-slate-400 font-sans mt-0.5">Row</span>
              </div>

              {/* رقم المقعد */}
              <div className="flex flex-col items-center justify-center px-1">
                <div className="flex items-center justify-center gap-1 mb-0.5 text-blue-600">
                  <Ticket className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-bold text-slate-700">رقم المقعد</span>
                </div>
                <span className="font-mono text-sm sm:text-base font-black text-[#162a5c] leading-none">
                  {pillSeatCode}
                </span>
                <span className="text-[7px] text-slate-400 font-sans mt-0.5">Seat No</span>
              </div>

              {/* بوابة الدخول */}
              <div className="flex flex-col items-center justify-center px-1">
                <div className="flex items-center justify-center gap-1 mb-0.5 text-blue-600">
                  <DoorClosed className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-bold text-slate-700">المدخل</span>
                </div>
                <span className="text-[9.5px] sm:text-[10px] font-black text-[#162a5c] leading-tight text-center">
                  {eventEntrance}
                </span>
                <span className="text-[7px] text-slate-400 font-sans mt-0.5">Main Entrance</span>
              </div>

            </div>

            {/* الصف الثاني: بيانات الموعد والموقع (3 أعمدة مريحة وواسعة بدون اختصار) */}
            <div className="grid grid-cols-3 divide-x divide-x-reverse divide-slate-100 py-1.5 px-1 text-center bg-white">
              
              {/* الموقع والقاعة */}
              <div className="flex flex-col items-center justify-center px-1">
                <div className="flex items-center justify-center gap-1 mb-0.5 text-blue-600">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-bold text-slate-700">الموقع</span>
                </div>
                <span className="text-[9px] sm:text-[9.5px] font-black text-[#162a5c] leading-tight text-center">
                  {eventVenue}
                </span>
                <span className="text-[7px] text-slate-400 font-sans mt-0.5">Theater Hall</span>
              </div>

              {/* الوقت */}
              <div className="flex flex-col items-center justify-center px-1">
                <div className="flex items-center justify-center gap-1 mb-0.5 text-blue-600">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-bold text-slate-700">الوقت</span>
                </div>
                <span className="text-[9.5px] sm:text-[10px] font-black text-[#162a5c] leading-tight text-center">
                  {eventTime}
                </span>
                <span className="text-[7px] text-slate-400 font-sans mt-0.5">Time</span>
              </div>

              {/* التاريخ */}
              <div className="flex flex-col items-center justify-center px-1">
                <div className="flex items-center justify-center gap-1 mb-0.5 text-blue-600">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-bold text-slate-700">التاريخ</span>
                </div>
                <span className="text-[9px] sm:text-[9.5px] font-black text-[#162a5c] leading-tight text-center">
                  {eventDate}
                </span>
                <span className="text-[7px] text-slate-400 font-sans mt-0.5">Date</span>
              </div>

            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* COURTESY STATEMENT & WE ARE HONORED */}
        {/* ========================================================================= */}
        <div className="relative z-10 px-3 text-center my-1 space-y-0.5">
          <p className="text-[9.5px] sm:text-[10px] text-slate-800 leading-snug font-medium max-w-[310px] mx-auto tracking-normal">
            نأمل أن تشرفونا بحضوركم ومشاركتكم في هذه الفعالية<br />
            التي تأتي ضمن جهودنا في دعم مسيرة التعليم وصناعة مستقبل أكثر إشراقاً.
          </p>
          <div className="pt-0.5">
            <div className="text-base sm:text-lg font-black text-[#162a5c] tracking-normal leading-tight">
              وجودكم يسعدنا
            </div>
            <div className="text-[7.5px] font-black text-[#162a5c] tracking-[0.2em] uppercase font-sans mt-0.5">
              WE ARE HONORED BY YOUR PRESENCE
            </div>
            <div className="flex justify-center mt-0.5">
              <WingFlourish className="w-20 h-2 text-[#162a5c]" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TICKET STUB (تذكرة حضور + الباركود + تعليم يصنع الفرص) */}
        {/* ========================================================================= */}
        <div className="relative z-10 px-2.5 my-1">
          <div className="bg-white/95 rounded-2xl border border-slate-200/90 shadow-sm p-2 grid grid-cols-2 gap-1.5 relative select-none">
            
            {/* Left Col (in RTL): QR Code & Ticket Banner */}
            <div className="flex flex-col items-center justify-center text-center pl-1 border-l border-dashed border-cyan-400/80">
              <div className="w-full bg-[#1e3a8a] text-white py-0.5 px-2 rounded-lg mb-1 shadow-sm">
                <span className="text-[11px] font-black block leading-tight">تذكرة حضور</span>
                <span className="text-[6.5px] font-bold tracking-wider font-sans block uppercase text-blue-200">EVENT TICKET</span>
              </div>

              <div className="p-1 bg-white rounded-xl border border-slate-200 shadow-inner">
                <QRCodeSVG
                  value={qrUrl}
                  size={58}
                  level="H"
                  fgColor="#0f1f4b"
                  bgColor="#ffffff"
                  includeMargin={false}
                />
              </div>

              <span className="text-[8px] font-black text-[#162a5c] block mt-0.5 leading-tight">
                يرجى إبراز التذكرة عند الدخول
              </span>
              <span className="text-[6.5px] text-slate-500 font-sans block leading-none">
                Please show your ticket at the entrance
              </span>
            </div>

            {/* Right Col: Barcode & Education Creates Opportunities */}
            <div className="flex flex-col items-center justify-center text-center pr-1">
              <BarcodeGraphic code={barcodeCode} className="h-6 sm:h-7" />
              
              <div className="mt-1">
                <span className="text-xs font-black text-[#162a5c] block leading-tight">
                  تعليم يصنع الفرص
                </span>
                <span className="text-[6.5px] font-bold text-slate-500 uppercase tracking-wider font-sans block mt-0.5">
                  EDUCATION CREATES OPPORTUNITIES
                </span>
                <div className="w-6 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-600 rounded-full mx-auto mt-1"></div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM WAVE FOOTER BANNER (شريط التذييل الموجي المتناسق) */}
        {/* ========================================================================= */}
        <div className="w-full mt-auto relative z-10">
          <div className="bg-gradient-to-r from-[#202778] via-[#1a2f6e] to-[#121c4a] text-white py-1.5 px-3 rounded-b-[26px] sm:rounded-b-[30px] flex items-center justify-between shadow-lg">
            {/* Right text with cyan accent bar (first in RTL) */}
            <div className="text-right flex items-center gap-1.5">
              <div className="w-3.5 h-[2px] bg-cyan-400 rounded-full"></div>
              <div>
                <span className="text-[8.5px] font-black block leading-tight">إدارة تعليم منطقة عسير</span>
                <span className="text-[6px] text-blue-200 font-sans tracking-wide block uppercase leading-none mt-0.5">
                  Aseer Education General Directorate
                </span>
              </div>
            </div>

            {/* Left text (second in RTL) */}
            <div className="text-left">
              <span className="text-[8.5px] font-black block leading-tight">تعليم يدعم .. لمجتمع الفرص</span>
              <span className="text-[6px] text-blue-200 font-sans tracking-wide block uppercase leading-none mt-0.5">
                EDUCATION SUPPORTS .. FOR A COMMUNITY OF OPPORTUNITIES
              </span>
            </div>
          </div>
        </div>

      </div>
    );
  }

  /* ========================================================================= */
  /* 9:16 PORTRAIT ATTENDANCE TICKET - PREMIUM REDESIGN */
  /* ========================================================================= */

  const eventDate = activeEvent?.date ? activeEvent.date.split('(')[0].trim() : '2026/10/07';
  const eventDateEn = 'Wednesday'; // fallback
  const eventTime = activeEvent?.time ? activeEvent.time.split('(')[0].trim() : '08:00 م';
  const eventVenue = activeEvent?.venue || 'مسرح إدارة التعليم';
  const eventEntrance = seat.entrance || 'المدخل الرئيسي';
  const barcodeCode = `20261007${rowLetter}${String(seat.number).padStart(3, '0')}`;

  return (
    <div
      ref={innerRef}
      dir="rtl"
      className={`relative w-full max-w-[360px] aspect-[9/16] bg-[#f8fbff] text-[#0e2b5c] rounded-[24px] sm:rounded-[28px] shadow-[0_16px_50px_rgba(14,43,92,0.25)] border-2 border-indigo-200/80 overflow-hidden select-none flex flex-col ${className}`}
      style={{ fontFamily: "'Cairo', 'Readex Pro', sans-serif", aspectRatio: '9 / 16' }}
    >
      {/* Scenic Panoramic Asir Mountain Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url('/aseer_vertical_bg.png')` }}
      />
      {/* Mist overlay - lighter at bottom to show the mountain wave */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ 
          background: 'linear-gradient(180deg, rgba(248,251,255,0.78) 0%, rgba(248,251,255,0.94) 18%, rgba(248,251,255,0.94) 62%, rgba(220,235,255,0.3) 84%, rgba(100,140,220,0) 100%)' 
        }}
      />

      {/* ======================== TOP HEADER ======================== */}
      <div className="relative z-10 pt-3.5 px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center justify-center min-h-[42px]">
          {currentLogo ? (
            <img 
              src={currentLogo} 
              alt={activeEvent?.title || "شعار الفعالية"} 
              className="h-10 max-h-10 max-w-[120px] object-contain"
            />
          ) : (
            <MinistryOfEducationLogo 
              className="h-9"
              color="#0e2b5c"
              textColor="#0e2b5c"
              subColor="#476694"
            />
          )}
        </div>

        {/* Bismillah + Card Title */}
        <div className="text-center flex-1 px-2">
          <div className="text-[9px] font-bold text-slate-500 font-serif mb-0.5 select-none">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <h1 className="text-lg sm:text-xl font-black tracking-tight text-[#0e2b5c] leading-none">
            {title}
          </h1>
          <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mx-auto mt-1" />
          <p className="text-[7px] font-black text-slate-500 tracking-[0.2em] uppercase font-sans mt-0.5">
            {subtitle}
          </p>
        </div>

        {/* Seat Pill (compact, top-left in RTL) */}
        <div className="bg-[#0e2b5c] text-white px-2.5 py-1.5 rounded-xl shadow-md min-w-[52px] text-center">
          <span className="text-[8px] font-bold text-blue-200 block uppercase tracking-wider leading-none">مقعد</span>
          <span className="font-mono text-base font-black tracking-widest leading-tight block">
            {pillSeatCode}
          </span>
        </div>
      </div>

      {/* ======================== GUEST BANNER ======================== */}
      {seat.guest?.name && (
        <div className="relative z-10 mx-3.5 mt-2 bg-white/90 backdrop-blur-sm border border-cyan-200 rounded-2xl px-3 py-2 shadow-sm text-center">
          <div className="flex items-center justify-center gap-1.5 mb-0.5">
            <User className="w-3 h-3 text-[#008ba3]" />
            <span className="text-[9px] font-bold text-[#008ba3] uppercase tracking-wider">الضيف المحترم</span>
          </div>
          <span className="text-sm font-black text-[#0e2b5c] block leading-tight truncate">
            {seat.guest.name}
          </span>
          {seat.guest.jobTitle && (
            <span className="text-[10px] font-bold text-[#008ba3] block mt-0.5 truncate">
              {seat.guest.jobTitle}
            </span>
          )}
          {seat.guest.category && (
            <span className="inline-block mt-1 text-[9px] font-black text-cyan-900 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded-full">
              {seat.guest.category}
            </span>
          )}
        </div>
      )}

      {/* ======================== QR CODE ======================== */}
      <div className="relative z-10 flex justify-center mt-2 mx-3.5">
        <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-md flex items-center gap-3 px-3 py-2.5">
          {/* QR Code itself - large and clear */}
          <div className="shrink-0 p-1.5 bg-white border border-slate-100 rounded-xl">
            <QRCodeSVG
              value={qrUrl}
              size={seat.guest?.name ? 90 : 108}
              level="M"
              fgColor="#0e2b5c"
              bgColor="#ffffff"
              includeMargin={false}
            />
          </div>
          {/* Seat location summary next to QR */}
          <div className="flex-1 text-right min-w-0">
            <div className="flex items-center justify-end gap-1 mb-1">
              <span className="text-[9px] font-bold text-[#008ba3] uppercase tracking-wider">امسح للتحقق</span>
              <div className="w-4 h-4 rounded-full bg-[#008ba3]/10 flex items-center justify-center">
                <span className="text-[8px]">📲</span>
              </div>
            </div>
            {/* Seat location badge */}
            <div className="bg-[#0e2b5c] text-white rounded-xl px-2 py-1 text-center mb-1.5">
              <span className="text-[8px] font-bold text-blue-300 block leading-none">موقع مقعدك</span>
              <span className="font-mono text-xl font-black tracking-widest leading-tight block">
                {pillSeatCode}
              </span>
            </div>
            {/* Level & Sector */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-end gap-1">
                <span className="text-[9px] font-black text-[#0e2b5c]">
                  {seat.levelName || (seat.level === 'B' ? 'البلكونة' : 'الدور الأرضي')}
                </span>
                <span className="text-[8px] text-slate-500">:الدور</span>
              </div>
              <div className="flex items-center justify-end gap-1">
                <span className="text-[9px] font-black text-[#0e2b5c]">{seat.sector || 'الوسط'}</span>
                <span className="text-[8px] text-slate-500">:القطاع</span>
              </div>
              <div className="text-[7px] font-mono text-slate-400 font-bold tracking-wider mt-0.5">
                {barcodeCode}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================== INFO GRID — 2-col layout ======================== */}
      <div className="relative z-10 mx-3.5 mt-2.5 flex-1">
        
        {/* Row 1: التاريخ + الوقت */}
        <div className="grid grid-cols-2 gap-1.5 mb-1.5">

          {/* التاريخ */}
          <div className="bg-white/90 backdrop-blur-sm border border-indigo-100 rounded-2xl px-2.5 py-2 flex items-center gap-2 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-right flex-1 min-w-0">
              <span className="text-[8px] font-bold text-slate-400 block leading-none">التاريخ</span>
              <span className="text-[10px] font-black text-[#0e2b5c] block leading-tight mt-0.5 truncate">
                {eventDate.includes('،') ? eventDate.split('،')[1]?.trim() || eventDate : eventDate}
              </span>
              <span className="text-[6.5px] text-slate-400 font-sans block leading-none mt-0.5">
                {eventDate.includes('الجمعة') ? 'Friday' : eventDate.includes('السبت') ? 'Saturday' : 'Wednesday'}
              </span>
            </div>
          </div>

          {/* الوقت */}
          <div className="bg-white/90 backdrop-blur-sm border border-cyan-100 rounded-2xl px-2.5 py-2 flex items-center gap-2 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-cyan-600" />
            </div>
            <div className="text-right flex-1 min-w-0">
              <span className="text-[8px] font-bold text-slate-400 block leading-none">الوقت</span>
              <span className="text-[11px] font-black font-mono text-[#0e2b5c] block leading-tight mt-0.5">
                {eventTime}
              </span>
              <span className="text-[6.5px] text-slate-400 font-sans block leading-none mt-0.5">PM 07:00</span>
            </div>
          </div>
        </div>

        {/* Row 2: الموقع + المدخل */}
        <div className="grid grid-cols-2 gap-1.5 mb-1.5">

          {/* الموقع */}
          <div className="bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-2xl px-2.5 py-2 flex items-center gap-2 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-right flex-1 min-w-0">
              <span className="text-[8px] font-bold text-slate-400 block leading-none">الموقع</span>
              <span className="text-[9px] font-black text-[#0e2b5c] block leading-tight mt-0.5 line-clamp-2">
                {eventVenue}
              </span>
              <span className="text-[6.5px] text-slate-400 font-sans block leading-none mt-0.5">Theater</span>
            </div>
          </div>

          {/* المدخل */}
          <div className="bg-white/90 backdrop-blur-sm border border-amber-100 rounded-2xl px-2.5 py-2 flex items-center gap-2 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
              <DoorClosed className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-right flex-1 min-w-0">
              <span className="text-[8px] font-bold text-slate-400 block leading-none">المدخل</span>
              <span className="text-[9px] font-black text-[#0e2b5c] block leading-tight mt-0.5 line-clamp-2">
                {eventEntrance}
              </span>
              <span className="text-[6.5px] text-slate-400 font-sans block leading-none mt-0.5">Main Entrance</span>
            </div>
          </div>
        </div>

        {/* Row 3: رقم المقعد + رقم الصف (dark prominent blocks) */}
        <div className="grid grid-cols-2 gap-1.5">

          {/* رقم المقعد */}
          <div className="bg-gradient-to-br from-[#0c234b] to-[#1a3d7c] border border-indigo-700/60 rounded-2xl px-2.5 py-2 flex items-center gap-2 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <Armchair className="w-4 h-4 text-white" />
            </div>
            <div className="text-right flex-1">
              <span className="text-[8px] font-bold text-blue-300 block leading-none">رقم المقعد</span>
              <span className="text-2xl font-black font-mono text-white block leading-tight mt-0.5">
                {seatNum}
              </span>
              <span className="text-[6.5px] text-blue-300 font-sans block leading-none">Seat No.</span>
            </div>
          </div>

          {/* رقم الصف */}
          <div className="bg-gradient-to-br from-[#0c234b] to-[#1a3d7c] border border-indigo-700/60 rounded-2xl px-2.5 py-2 flex items-center gap-2 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <Ticket className="w-4 h-4 text-white" />
            </div>
            <div className="text-right flex-1">
              <span className="text-[8px] font-bold text-blue-300 block leading-none">رقم الصف</span>
              <span className="text-2xl font-black font-mono text-white block leading-tight mt-0.5">
                {rowLetter}
              </span>
              <span className="text-[6.5px] text-blue-300 font-sans block leading-none">Row</span>
            </div>
          </div>
        </div>

      </div>


      {/* ======================== FOOTER ======================== */}
      <div className="w-full relative mt-auto z-10 pt-1.5">
        <div className="bg-gradient-to-r from-[#0c1e45]/96 via-[#102a63]/96 to-[#0c1e45]/96 text-white py-2 px-3 text-center border-t border-cyan-400/30 shadow-inner rounded-b-[22px] sm:rounded-b-[26px]">
          <p className="text-[10px] sm:text-[11px] font-bold tracking-wide">
            {customSlogan}
          </p>
          <p className="text-[7px] text-cyan-200 font-sans mt-0.5 opacity-75">
            نظام حجز مقاعد مسارح إدارة التعليم بمنطقة عسير
          </p>
        </div>
      </div>

    </div>
  );
}

