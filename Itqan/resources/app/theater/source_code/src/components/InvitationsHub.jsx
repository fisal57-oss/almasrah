import React, { useState } from 'react';
import { 
  Mail, 
  Armchair, 
  Ticket, 
  Search, 
  Printer, 
  Share2, 
  Download, 
  Check, 
  Sparkles, 
  Smartphone, 
  Users, 
  Award,
  Crown,
  Filter
} from 'lucide-react';
import { formatArabicSeatCode, buildInvitationQrUrl } from '../utils/storage';

export default function InvitationsHub({
  seats,
  eventDetails,
  onOpenInvitation,
  onOpenSeatCard,
  onOpenTicket,
  onOpenBatchSeatCards,
  onOpenBatchTickets,
  onPreviewGuestView
}) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  const bookedSeats = seats.filter(s => s.guest && s.status !== 'available');

  const categories = Array.from(
    new Set(bookedSeats.map(s => s.guest?.category).filter(Boolean))
  );

  const filteredSeats = bookedSeats.filter(seat => {
    if (selectedCategory !== 'all' && seat.guest?.category !== selectedCategory) return false;
    if (selectedStatus === 'checked_in' && seat.status !== 'checked_in') return false;
    if (selectedStatus === 'reserved' && seat.status !== 'reserved') return false;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const name = seat.guest.name.toLowerCase();
      const phone = (seat.guest.phone || '').toLowerCase();
      const seatCode = seat.id.toLowerCase();
      const arabicCode = formatArabicSeatCode(seat).toLowerCase();
      const token = (seat.guest.token || '').toLowerCase();
      return name.includes(q) || phone.includes(q) || seatCode.includes(q) || arabicCode.includes(q) || token.includes(q);
    }
    return true;
  });

  const vipCount = bookedSeats.filter(s => 
    (s.guest?.category || '').toLowerCase().includes('vip') || 
    (s.guest?.category || '').includes('شرف')
  ).length;

  const handleCopyWhatsApp = (seat) => {
    const baseUrl = window.location.origin + window.location.pathname;
    const invitationUrl = buildInvitationQrUrl(seat, baseUrl);
    const seatDisplay = `${seat.row}${parseInt(seat.number, 10)}`;

    const text = `⚜️ *دعــوة خــاصــة ورسـمـيـة* ⚜️\n\n` +
      `يسر الإدارة العامة للتعليم بمنطقة عسير دعوتكم لحضور:\n` +
      `✨ *${eventDetails.title}* ✨\n\n` +
      `👤 *المدعو:* ${seat.guest.name}\n` +
      (seat.guest.jobTitle ? `💼 *المنصب:* ${seat.guest.jobTitle}\n` : '') +
      `🏷️ *الفئة:* ${seat.guest.category}\n` +
      `📅 *التاريخ:* ${eventDetails.date}\n` +
      `⏰ *الوقت:* ${eventDetails.time}\n` +
      `📍 *المكان:* ${eventDetails.venue || 'مسرح الإدارة العامة للتعليم بمنطقة عسير'}\n\n` +
      `💺 *المقعد المخصص:* ${seatDisplay} (الصف: ${seat.row} - القطاع: ${seat.sector})\n\n` +
      `📲 *رابط بطاقة الدعوة وموقع المقعد بالمسرح:*\n${invitationUrl}`;

    navigator.clipboard.writeText(text);
    setCopiedId(seat.id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel-luxury p-6 sm:p-8 rounded-3xl border border-amber-500/30 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-bold border border-amber-500/30">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>إدارة الدعوات الإلكترونية وبطاقات المقاعد</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              مركز الدعوات وبطاقات كراسي المسرح
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl">
              يمكنك هنا توليد واستعراض وطباعة الدعوات الإلكترونية الفاخرة المخصصة لكل ضيف، وتصدير بطاقات المقاعد المجهزة للتثبيت على كراسي المسرح أو المشاركة عبر الواتساب.
            </p>
          </div>

          {/* Quick Global Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenBatchSeatCards}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:brightness-110 text-white font-black text-xs shadow-lg transition-all flex items-center gap-2"
            >
              <Armchair className="w-4 h-4" />
              <span>طباعة بطاقات المقاعد جماعياً (A4)</span>
            </button>

            <button
              onClick={onOpenBatchTickets}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all flex items-center gap-2"
            >
              <Ticket className="w-4 h-4 text-cyan-300" />
              <span>طباعة تذاكر الحضور ({bookedSeats.length})</span>
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-center">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-400 block font-bold">إجمالي الحجوزات</span>
            <span className="text-xl font-black text-white">{bookedSeats.length}</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-amber-300 block font-bold">كبار الشخصيات (VIP)</span>
            <span className="text-xl font-black text-amber-300">{vipCount}</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-purple-300 block font-bold">تم تسجيل الدخول</span>
            <span className="text-xl font-black text-purple-300">{bookedSeats.filter(s => s.status === 'checked_in').length}</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-cyan-300 block font-bold">المقاعد المتبقية</span>
            <span className="text-xl font-black text-cyan-300">{seats.filter(s => s.status === 'available').length}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel-luxury p-4 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
          <input
            type="text"
            placeholder="ابحث باسم الضيف أو رقم الكرسي أو الجوال..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/10 border border-white/20 focus:border-amber-400 rounded-xl pr-9 pl-4 py-2.5 text-xs text-white placeholder-slate-400 outline-none transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute left-3 top-2.5 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl border border-white/15">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedStatus === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              الكل ({bookedSeats.length})
            </button>
            <button
              onClick={() => setSelectedStatus('reserved')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedStatus === 'reserved' ? 'bg-cyan-500/30 text-cyan-200 font-bold' : 'text-slate-300 hover:text-cyan-300'
              }`}
            >
              محجوز
            </button>
            <button
              onClick={() => setSelectedStatus('checked_in')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedStatus === 'checked_in' ? 'bg-purple-500/30 text-purple-200 font-bold' : 'text-slate-300 hover:text-purple-300'
              }`}
            >
              تم الدخول
            </button>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/10 text-white border border-white/20 rounded-xl px-3 py-2 outline-none text-xs"
            >
              <option value="all" className="bg-slate-900">كافة الفئات ({categories.length})</option>
              {categories.map((c) => (
                <option key={c} value={c} className="bg-slate-900">{c}</option>
              ))}
            </select>
          )}
        </div>

      </div>

      {/* Guests & Seats Cards Grid */}
      {filteredSeats.length === 0 ? (
        <div className="py-20 text-center glass-panel-luxury rounded-3xl border border-white/10 space-y-3">
          <Mail className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">لا توجد حجوزات مطابقة</h3>
          <p className="text-xs text-slate-400">يمكنك إضافة حجوزات جديدة من خريطة المسرح ثم إصدار الدعوات وبطاقات المقاعد لها.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSeats.map((seat) => {
            const seatDisplay = `${seat.row}${parseInt(seat.number, 10)}`;
            const isCopied = copiedId === seat.id;

            return (
              <div
                key={seat.id}
                className="glass-panel-luxury p-5 rounded-3xl border border-white/15 hover:border-amber-400/40 transition-all shadow-xl flex flex-col justify-between space-y-4 group"
              >
                
                {/* Top Info */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block">اسم الضيف</span>
                      <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                        {seat.guest.name}
                      </h3>
                      {seat.guest.jobTitle && (
                        <p className="text-xs text-amber-300/90 font-semibold">
                          {seat.guest.jobTitle}
                        </p>
                      )}
                    </div>

                    <div className="px-3 py-1.5 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-center">
                      <span className="text-[9px] text-cyan-300 block font-bold">المقعد</span>
                      <span className="text-base font-black text-white font-mono">{seatDisplay}</span>
                    </div>
                  </div>

                  {/* Badges & Meta */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
                      {seat.guest.category || 'ضيف'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/15 font-mono">
                      صف {seat.row} · {seat.sector}
                    </span>
                    {seat.guest.phone && (
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/15 font-mono">
                        {seat.guest.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  
                  {/* Primary 2 Generators: Electronic Invitation & Seat Card */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenInvitation(seat)}
                      className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-slate-950" />
                      <span>الدعوة الإلكترونية</span>
                    </button>

                    <button
                      onClick={() => onOpenSeatCard(seat)}
                      className="px-3 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <Armchair className="w-3.5 h-3.5 text-cyan-300" />
                      <span>بطاقة المقعد</span>
                    </button>
                  </div>

                  {/* Secondary Actions: WhatsApp Share, Ticket, Mobile View */}
                  <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                    <button
                      onClick={() => handleCopyWhatsApp(seat)}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-bold transition-all flex items-center justify-center gap-1 text-[11px]"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'تم النسخ!' : 'مشاركة واتساب'}</span>
                    </button>

                    <button
                      onClick={() => onOpenTicket(seat)}
                      className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
                      title="عرض تذكرة الحضور والباركود"
                    >
                      <Ticket className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onPreviewGuestView(seat.guest.token)}
                      className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-300 hover:text-white transition-all"
                      title="معاينة شاشة الجوال للضيف"
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
