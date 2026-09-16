import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  ShieldCheck, 
  DoorClosed, 
  User, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  KeyRound,
  CheckCircle2,
  Ticket
} from 'lucide-react';
import { MinistryOfEducationLogo } from './ModernAttendanceCard';
import { getEventDetails } from '../utils/storage';
import aseerVerticalBg from '../assets/aseer_vertical_bg.png';

/**
 * Laurel Leaf Flourish SVG for badge title
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
function BarcodeGraphic({ code = "2026ORG1007", className = "h-7 sm:h-8" }) {
  const bars = [];
  for (let i = 0; i < 46; i++) {
    const isWide = (i * 7 + code.charCodeAt(i % code.length)) % 3 === 0;
    const isSkip = (i * 13) % 29 === 0;
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
      <span className="font-mono text-[9px] sm:text-[9.5px] font-black text-[#0f1f4b] tracking-wider mt-0.5">
        {code}
      </span>
    </div>
  );
}

/**
 * Organizer Badge Card Component
 * Identical visual identity to the Official Electronic Invitation:
 * - Scenic Asir Mountain Heritage Background
 * - Ministry of Education Logo & Event Logo
 * - Laurel Leaf Flourishes & Motto
 * - Organizer Details, Gate, Role, QR Code, Barcode, and Wave Footer Banner
 */
export default function OrganizerBadgeCard({
  staff,
  eventDetails = {},
  innerRef,
  className = "",
  showLanyardSlot = true
}) {
  if (!staff) return null;

  const activeEvent = (eventDetails && (eventDetails.logoUrl || eventDetails.title)) 
    ? eventDetails 
    : getEventDetails();
  const currentLogo = activeEvent?.logoUrl;
  const [logoError, setLogoError] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? (window.location.origin + window.location.pathname.replace(/[^/]*$/, '')) : '';
  const portalUrl = `${baseUrl}staff.html`;

  const staffName = staff.name || 'عضو فريق التنظيم';
  const staffRole = staff.role || 'منظم بوابة الدخول';
  const staffGate = staff.gate || 'المدخل الرئيسي 1';
  const staffUsername = staff.username || 'staff';
  const staffCode = `ORG-${String(staff.id || '101').replace(/\D/g, '').slice(-4) || '2026'}`;
  const barcodeCode = `2026ORG${staffUsername.toUpperCase()}`;

  const eventDate = activeEvent?.date ? activeEvent.date.split('(')[0].trim() : '2026 / 10 / 07';
  const eventVenue = activeEvent?.venue || "مسرح الإدارة العامة للتعليم بمنطقة عسير";

  return (
    <div
      ref={innerRef}
      dir="rtl"
      className={`organizer-badge-card relative w-full max-w-[390px] aspect-[9/16] bg-gradient-to-b from-[#f8fbff] via-[#eef5fc] to-[#e4f0fa] text-[#162a5c] rounded-[28px] sm:rounded-[32px] shadow-[0_20px_50px_rgba(14,43,92,0.28)] border-2 border-indigo-200/70 overflow-hidden select-none flex flex-col justify-between ${className}`}
      style={{ fontFamily: "'Cairo', 'Readex Pro', sans-serif", aspectRatio: '9 / 16' }}
    >
      {/* Scenic Asir Mountain & Heritage Village Background Image */}
      {aseerVerticalBg && (
        <img 
          src={aseerVerticalBg} 
          alt="" 
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        />
      )}

      {/* Soft atmospheric white mist overlay for crystal-clear readability and contrast */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ 
          background: 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.85) 15%, rgba(255,255,255,0.92) 42%, rgba(255,255,255,0.88) 68%, rgba(255,255,255,0.2) 88%, rgba(255,255,255,0) 100%)' 
        }}
      />

      {/* Lanyard Hole Indicator (Top Center) */}
      {showLanyardSlot && (
        <div className="relative z-20 w-full flex justify-center pt-2">
          <div className="w-12 h-2.5 rounded-full bg-slate-300/60 border border-slate-400/80 shadow-inner flex items-center justify-center">
            <span className="text-[7px] text-slate-500 font-sans tracking-widest font-bold">LANYARD</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOP HEADER: VERTICAL MOTTO (RIGHT) & MINISTRY LOGO (LEFT) */}
      {/* ========================================================================= */}
      <div className={`relative z-10 px-4 ${showLanyardSlot ? 'pt-1.5' : 'pt-3.5'} pb-1 flex items-start justify-between`}>
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

        {/* Top Left (second in RTL): Logo with automatic fallback */}
        <div className="flex items-center">
          {currentLogo && !logoError ? (
            <img 
              src={currentLogo} 
              alt={activeEvent?.title || "شعار الفعالية"} 
              onError={() => setLogoError(true)}
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
      {/* BADGE TITLE & COMMITTEE HEADING */}
      {/* ========================================================================= */}
      <div className="relative z-10 px-3 text-center -mt-1">
        {/* Title with Laurel Leaf Flourishes */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          <LaurelFlourish className="w-6 h-6 sm:w-7 sm:h-7 text-[#162a5c]" />
          <h1 className="text-2xl sm:text-[26px] font-black tracking-normal text-[#162a5c] leading-none">
            بِطَاقَةُ مُنَظِّم
          </h1>
          <LaurelFlourish className="w-6 h-6 sm:w-7 sm:h-7 text-[#162a5c]" flip />
        </div>

        <div className="text-[8px] sm:text-[8.5px] font-black text-[#162a5c] tracking-[0.25em] uppercase font-sans mt-0.5">
          OFFICIAL EVENT ORGANIZER
        </div>

        {/* Committee Statement */}
        <div className="mt-1 space-y-0.5 leading-snug">
          <div className="text-[11px] sm:text-[12px] font-black text-[#162a5c] tracking-normal">
            الإدارة العامة للتعليم بمنطقة عسير
          </div>
          <div className="text-[10px] sm:text-[10.5px] font-bold text-indigo-900 tracking-normal flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>فريق التنظيم والإشراف الميداني</span>
          </div>
          <div className="text-[9px] sm:text-[9.5px] font-bold text-slate-600 tracking-normal">
            {activeEvent.title ? activeEvent.title : "مسرح الإدارة العامة للتعليم بمنطقة عسير"}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ORGANIZER IDENTITY CARD (اسم المنظم + الرتبة + الحواشي البنفسجية) */}
      {/* ========================================================================= */}
      <div className="relative z-10 px-3 my-1">
        <div className="bg-white/95 rounded-2xl p-2.5 px-3 border border-slate-200/90 shadow-sm flex items-center justify-between">
          {/* Right bracket bar */}
          <div className="w-1.5 h-10 bg-emerald-500 rounded-full shrink-0"></div>

          <div className="flex-1 text-center px-1">
            <div className="flex items-center justify-center gap-2 mb-0.5">
              <span className="text-[9px] font-bold text-slate-500">
                عضو فريق التنظيم المعتمد
              </span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[8.5px] font-bold font-mono">
                {staffCode}
              </span>
            </div>

            <div className="flex items-center justify-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-[#162a5c] flex items-center justify-center text-white shrink-0 shadow-sm">
                <User className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-base sm:text-lg font-black text-[#162a5c] leading-tight">
                {staffName}
              </h2>
            </div>

            <div className="mt-1 flex items-center justify-center gap-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-[10px] sm:text-[10.5px] font-black text-emerald-800">
                {staffRole}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-300 text-[10px] sm:text-[10.5px] font-black text-blue-800">
                {staffGate}
              </span>
            </div>
          </div>

          {/* Left bracket bar */}
          <div className="w-1.5 h-10 bg-emerald-500 rounded-full shrink-0"></div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SPECS GRID (بيانات الموقع والبوابة والصلاحية) */}
      {/* ========================================================================= */}
      <div className="relative z-10 px-2.5 my-1">
        <div className="bg-white/98 rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden divide-y divide-slate-100">
          
          {/* الصف الأول: البوابة والموقع واسم المستخدم */}
          <div className="grid grid-cols-3 divide-x divide-x-reverse divide-slate-100 py-1.5 px-1 text-center bg-slate-50/60">
            
            {/* البوابة المخصصة */}
            <div className="flex flex-col items-center justify-center px-1">
              <div className="flex items-center justify-center gap-1 mb-0.5 text-blue-600">
                <DoorClosed className="w-3.5 h-3.5" />
                <span className="text-[9px] font-bold text-slate-700">البوابة</span>
              </div>
              <span className="text-[9.5px] sm:text-[10px] font-black text-[#162a5c] leading-tight text-center">
                {staffGate}
              </span>
              <span className="text-[7px] text-slate-400 font-sans mt-0.5">Assigned Gate</span>
            </div>

            {/* الصلاحية */}
            <div className="flex flex-col items-center justify-center px-1">
              <div className="flex items-center justify-center gap-1 mb-0.5 text-emerald-600">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[9px] font-bold text-slate-700">الصلاحية</span>
              </div>
              <span className="text-[9.5px] sm:text-[10px] font-black text-emerald-700 leading-tight text-center">
                فحص وإرشاد
              </span>
              <span className="text-[7px] text-slate-400 font-sans mt-0.5">Staff Access</span>
            </div>

            {/* المعرف */}
            <div className="flex flex-col items-center justify-center px-1">
              <div className="flex items-center justify-center gap-1 mb-0.5 text-blue-600">
                <KeyRound className="w-3.5 h-3.5" />
                <span className="text-[9px] font-bold text-slate-700">المستخدم</span>
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] font-black text-[#162a5c] leading-none">
                {staffUsername}
              </span>
              <span className="text-[7px] text-slate-400 font-sans mt-0.5">Username</span>
            </div>

          </div>

          {/* الصف الثاني: الموقع والفعالية */}
          <div className="grid grid-cols-2 divide-x divide-x-reverse divide-slate-100 py-1.5 px-2 text-center bg-white">
            
            {/* الموقع والقاعة */}
            <div className="flex flex-col items-center justify-center px-1">
              <div className="flex items-center justify-center gap-1 mb-0.5 text-blue-600">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[9px] font-bold text-slate-700">الموقع</span>
              </div>
              <span className="text-[9px] sm:text-[9.5px] font-black text-[#162a5c] leading-tight text-center truncate max-w-[130px]">
                {eventVenue}
              </span>
              <span className="text-[7px] text-slate-400 font-sans mt-0.5">Theater Venue</span>
            </div>

            {/* تاريخ الفعالية */}
            <div className="flex flex-col items-center justify-center px-1">
              <div className="flex items-center justify-center gap-1 mb-0.5 text-blue-600">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-[9px] font-bold text-slate-700">التاريخ</span>
              </div>
              <span className="text-[9px] sm:text-[9.5px] font-black text-[#162a5c] leading-tight text-center">
                {eventDate}
              </span>
              <span className="text-[7px] text-slate-400 font-sans mt-0.5">Event Date</span>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* OFFICIAL NOTICE / INSTRUCTIONS */}
      {/* ========================================================================= */}
      <div className="relative z-10 px-3 text-center my-0.5 space-y-0.5">
        <p className="text-[9px] sm:text-[9.5px] text-slate-700 leading-snug font-medium max-w-[310px] mx-auto tracking-normal">
          حامل هذه البطاقة مخول رسمياً بتنظيم مقاعد الحضور وتدقيق تذاكر الـ QR Code<br />
          وفق التعليمات المعتمدة من إدارة التعليم بمنطقة عسير.
        </p>
        <div className="pt-0.5">
          <div className="text-sm sm:text-base font-black text-[#162a5c] tracking-normal leading-tight">
            خدمتكم شرف وتميز
          </div>
          <div className="flex justify-center mt-0.5">
            <WingFlourish className="w-20 h-2 text-[#162a5c]" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ORGANIZER PASS STUB (QR Code + Barcode) */}
      {/* ========================================================================= */}
      <div className="relative z-10 px-2.5 my-1">
        <div className="bg-white/95 rounded-2xl border border-slate-200/90 shadow-sm p-2 grid grid-cols-2 gap-1.5 relative select-none">
          
          {/* Left Col (in RTL): QR Code & Staff Pass Banner */}
          <div className="flex flex-col items-center justify-center text-center pl-1 border-l border-dashed border-emerald-400/80">
            <div className="w-full bg-emerald-700 text-white py-0.5 px-2 rounded-lg mb-1 shadow-sm">
              <span className="text-[11px] font-black block leading-tight">بوابة المنظم</span>
              <span className="text-[6.5px] font-bold tracking-wider font-sans block uppercase text-emerald-200">STAFF PORTAL</span>
            </div>

            <div className="p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
              <QRCodeSVG
                value={portalUrl}
                size={66}
                level="M"
                fgColor="#0f1f4b"
                bgColor="#ffffff"
                includeMargin={true}
              />
            </div>

            <span className="text-[8px] font-black text-[#162a5c] block mt-0.5 leading-tight">
              امسح للوصول للبوابة
            </span>
            <span className="text-[6.5px] text-slate-500 font-sans block leading-none">
              Scan for organizer portal
            </span>
          </div>

          {/* Right Col: Barcode & Slogan */}
          <div className="flex flex-col items-center justify-center text-center pr-1">
            <BarcodeGraphic code={barcodeCode} className="h-6 sm:h-7" />
            
            <div className="mt-1">
              <span className="text-xs font-black text-[#162a5c] block leading-tight">
                تعليم يصنع الفرص
              </span>
              <span className="text-[6.5px] font-bold text-slate-500 uppercase tracking-wider font-sans block mt-0.5">
                EDUCATION CREATES OPPORTUNITIES
              </span>
              <div className="w-6 h-[2px] bg-gradient-to-r from-emerald-400 to-teal-600 rounded-full mx-auto mt-1"></div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM WAVE FOOTER BANNER */}
      {/* ========================================================================= */}
      <div className="w-full mt-auto relative z-10">
        <div className="bg-gradient-to-r from-[#123e35] via-[#164d42] to-[#0d2a24] text-white py-1.5 px-3 rounded-b-[26px] sm:rounded-b-[30px] flex items-center justify-between shadow-lg">
          {/* Right text with emerald accent bar */}
          <div className="text-right flex items-center gap-1.5">
            <div className="w-3.5 h-[2px] bg-emerald-400 rounded-full"></div>
            <div>
              <span className="text-[9.5px] sm:text-[10px] font-black block leading-tight text-white">
                نلتقي لنصنع أجمل اللحظات
              </span>
              <span className="text-[6.5px] sm:text-[7px] text-emerald-200 block font-sans">
                TOGETHER CREATING MEMORABLE MOMENTS
              </span>
            </div>
          </div>

          {/* Left copyright */}
          <div className="text-left font-sans leading-none">
            <span className="text-[7.5px] text-emerald-200 font-bold block">
              تعليم عسير © 2026
            </span>
            <span className="text-[6.5px] text-emerald-300/80 block mt-0.5">
              بطاقة معتمدة
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
