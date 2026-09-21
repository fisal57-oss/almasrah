import React, { useState, useRef } from 'react';
import { X, ExternalLink, Maximize2, Minimize2, RefreshCw, Building2 } from 'lucide-react';

/**
 * BookingFormModal
 * يعرض نموذج حجز القاعات والمسارح (booking_form_digital.html) داخل iframe بالكامل
 */
export default function BookingFormModal({ isOpen, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);

  if (!isOpen) return null;

  const BOOKING_FORM_URL = 'https://fisal57-oss.github.io/itgan/booking_form_digital.html';

  const handleRefresh = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = BOOKING_FORM_URL;
    }
  };

  const handleOpenExternal = () => {
    window.open(BOOKING_FORM_URL, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className={`relative flex flex-col bg-slate-950 rounded-2xl shadow-2xl border border-amber-500/30 overflow-hidden transition-all duration-300 ${
          isFullscreen
            ? 'w-full h-full rounded-none'
            : 'w-full max-w-4xl'
        }`}
        style={isFullscreen ? {} : { height: '90vh' }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border-b border-amber-500/20 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Building2 className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white">نموذج طلب حجز قاعة / مسرح</h2>
              <p className="text-[10px] text-amber-300/80 font-medium">تعليم عسير — النموذج الرسمي الرقمي</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Refresh */}
            <button
              onClick={handleRefresh}
              title="تحديث النموذج"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Open External */}
            <button
              onClick={handleOpenExternal}
              title="فتح في تبويب جديد"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all"
            >
              <ExternalLink className="w-4 h-4" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'تصغير' : 'تكبير'}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              title="إغلاق"
              className="w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 flex items-center justify-center text-red-400 hover:text-red-300 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 top-[52px] flex flex-col items-center justify-center bg-slate-950 z-10">
            <div className="w-12 h-12 rounded-full border-4 border-amber-500/30 border-t-amber-400 animate-spin mb-4" />
            <p className="text-slate-400 text-sm">جاري تحميل نموذج الحجز...</p>
          </div>
        )}

        {/* IFrame */}
        <iframe
          ref={iframeRef}
          src={BOOKING_FORM_URL}
          title="نموذج طلب حجز قاعة / مسرح"
          className="w-full flex-1 border-0"
          onLoad={() => setIsLoading(false)}
          style={{ background: '#f1f5f9' }}
          allow="clipboard-write"
        />
      </div>
    </div>
  );
}
