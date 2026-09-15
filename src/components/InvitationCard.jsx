import React, { useRef, useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Share2, 
  Check, 
  Smartphone, 
  ExternalLink,
  Armchair, 
  Calendar, 
  Clock, 
  MapPin, 
  DoorClosed, 
  Ticket, 
  User, 
  Wallet, 
  Sparkles,
  Wifi,
  Battery,
  Layers,
  Copy,
  Briefcase
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { formatArabicSeatCode } from '../utils/storage';
import ModernAttendanceCard from './ModernAttendanceCard';

/**
 * Official Ministry of Education Vector Logo Component
 */
function MinistryOfEducationLogo({ className = "h-10", color = "#00a887", textColor = "#00a887", subColor = "#4a6b63" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 100 80" className="h-full w-auto shrink-0" fill={color}>
        {/* Ministry Palm / Book Dots Pattern */}
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

/**
 * Barcode Vector Graphic Generator
 */
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

export default function InvitationCard({ 
  seat, 
  eventDetails = {}, 
  onClose, 
  onPreviewGuestView 
}) {
  const cardOnlyRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [walletAdded, setWalletAdded] = useState(false);

  if (!seat || !seat.guest) return null;

  const baseUrl = window.location.origin + window.location.pathname;
  const invitationUrl = `${baseUrl}?invitation=${seat.guest.token}`;
  const seatDisplay = `${seat.row}${parseInt(seat.number, 10)}`;
  const barcodeNumber = `20261007${seat.row}${String(seat.number).padStart(3, '0')}`;

  // Download high-resolution PNG
  const handleDownloadPNG = async () => {
    const targetElement = cardOnlyRef.current;
    if (!targetElement) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(targetElement, {
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

  // Print Ticket
  const handlePrint = () => {
    try {
      document.body.classList.add('is-printing-card');
      window.print();
    } catch (e) {
      console.error('Print error:', e);
    } finally {
      setTimeout(() => {
        document.body.classList.remove('is-printing-card');
      }, 1200);
    }
  };

  // WhatsApp Share
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

  // Apple Wallet / Digital Pass
  const handleAddToWallet = () => {
    setWalletAdded(true);
    setTimeout(() => setWalletAdded(false), 4000);
  };

  // Render the core white ticket card (used in both phone mockup and flat card view)
  const renderTicketCard = () => (
    <ModernAttendanceCard
      innerRef={cardOnlyRef}
      seat={seat}
      eventDetails={eventDetails}
      cardType="attendance"
      customTitle="بطاقة حضور"
      customSubtitle="ATTENDANCE TICKET"
      customSlogan="نلتقي لنصنع أجمل اللحظات"
      className="shadow-[0_15px_40px_rgba(14,43,92,0.3)]"
    />
  );


  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 md:py-6 bg-[#030917]/90 backdrop-blur-2xl overflow-y-auto">
      
      <div className="relative w-full max-w-xl my-2 flex flex-col items-center">
        
        {/* ========================================================================= */}
        {/* TOP TOOLBAR CONTROLS */}
        {/* ========================================================================= */}
        <div className="no-print flex flex-wrap items-center justify-between mb-4 glass-panel-luxury p-3 sm:p-4 rounded-2xl border border-cyan-500/30 w-full gap-2 shadow-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-black text-white block">تذكرة الحضور الرسمية (التصميم المعتمد)</span>
              <span className="text-[10px] text-cyan-200">تصميم الهاتف الذكي ومسرح تعليم عسير</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Toggle */}


            {/* Download PNG */}
            <button
              onClick={handleDownloadPNG}
              disabled={isDownloading}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:brightness-110 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? 'جاري الحفظ...' : 'حفظ كصورة'}</span>
            </button>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-300" />
              <span>طباعة</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* FLAT PRINTABLE CARD */}
        <div ref={cardOnlyRef} dir="rtl" className="w-full max-w-md flex justify-center py-2">
          {renderTicketCard()}
        </div>

      </div>
    </div>
  );
}
