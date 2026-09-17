import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Download, 
  Printer, 
  Share2, 
  Check, 
  ShieldCheck,
  DoorClosed,
  KeyRound
} from 'lucide-react';
import { exportElementToPng } from '../utils/exportImage';
import OrganizerBadgeCard from './OrganizerBadgeCard';

export default function OrganizerBadgeModal({
  staff,
  eventDetails = {},
  onClose
}) {
  const cardOnlyRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!staff) return null;

  const staffName = staff.name || 'المنظم';
  const staffGate = staff.gate || 'المدخل الرئيسي';
  const staffUsername = staff.username || 'staff';

  const handleDownloadPNG = async () => {
    const targetElement = cardOnlyRef.current;
    if (!targetElement) return;
    setIsDownloading(true);
    try {
      await exportElementToPng(
        targetElement,
        `بطاقة_منظم_${staffName}_${staffGate}.png`,
        {
          pixelRatio: 3,
          backgroundColor: null,
          onSuccess: () => setIsDownloading(false),
          onError: () => setIsDownloading(false)
        }
      );
    } catch (err) {
      console.error('Error rendering PNG', err);
      alert('حدث خطأ أثناء تصدير البطاقة، يرجى المحاولة مرة أخرى.');
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    try {
      document.body.classList.add('is-printing-organizer-badge');
      window.print();
    } catch (e) {
      console.error('Print error:', e);
    } finally {
      setTimeout(() => {
        document.body.classList.remove('is-printing-organizer-badge');
      }, 1200);
    }
  };

  const handleCopyWhatsApp = () => {
    const baseUrl = window.location.origin + window.location.pathname.replace(/[^/]*$/, '');
    const portalUrl = `${baseUrl}staff.html`;

    const text = `🪪 *بـطـاقـة تـنـظـيـم مـعـتـمـدة - فـريـق الـتـنـظـيـم* 🪪\n\n` +
      `✨ *${eventDetails.title || 'مسرح الإدارة العامة للتعليم بمنطقة عسير'}* ✨\n\n` +
      `👤 *اسم المنظم:* ${staffName}\n` +
      `🛡️ *المهمة:* ${staff.role || 'منظم بوابة الدخول'}\n` +
      `🚪 *البوابة المخصصة:* ${staffGate}\n` +
      `🔑 *اسم المستخدم:* ${staffUsername}\n` +
      `🔒 *كلمة المرور:* ${staff.password || '••••••••'}\n\n` +
      `📲 *رابط بوابة الموظف والمنظمين:*\n` +
      `${portalUrl}\n\n` +
      `مرفق بطاقتكم التنظيمية الرسمية المعتمدة لحملها أثناء الفعالية ✨`;

    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 md:py-6 bg-[#030917]/90 backdrop-blur-2xl overflow-y-auto">
      
      <div className="relative w-full max-w-xl my-2 flex flex-col items-center">
        
        {/* TOP TOOLBAR CONTROLS */}
        <div className="no-print flex flex-wrap items-center justify-between mb-4 glass-panel-luxury p-3 sm:p-4 rounded-2xl border border-emerald-500/30 w-full gap-2 shadow-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-black text-white block">بطاقة المنظم الرسمية المعتمدة</span>
              <span className="text-[10px] text-emerald-300">نفس الهوية البصرية الملكية المعتمدة لتعليم عسير</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Download PNG */}
            <button
              onClick={handleDownloadPNG}
              disabled={isDownloading}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:brightness-110 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-950" />
              <span>{isDownloading ? 'جاري الحفظ...' : 'تصدير صورة'}</span>
            </button>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-300" />
              <span>طباعة</span>
            </button>

            {/* WhatsApp Share */}
            <button
              onClick={handleCopyWhatsApp}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'تم النسخ!' : 'واتساب'}</span>
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

        {/* FLAT BADGE VIEW */}
        <div ref={cardOnlyRef} dir="rtl" className="w-full max-w-md flex justify-center py-2 printable-organizer-area">
          <OrganizerBadgeCard
            staff={staff}
            eventDetails={eventDetails}
            className="shadow-[0_15px_40px_rgba(14,43,92,0.3)]"
          />
        </div>

      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
}
