import React, { useState, useEffect } from 'react';
import { Search, Bell, Crown, Menu, Lock } from 'lucide-react';

export default function HeaderBar({ 
  eventDetails = {}, 
  onSearchQuery, 
  onLogout, 
  onOpenCommandPalette,
  onToggleMobileMenu
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }));
      setDateStr(now.toLocaleDateString('ar-SA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearchQuery) {
      onSearchQuery(e.target.value);
    }
  };

  return (
    <header className="h-16 border-b border-white/10 bg-[#071124]/95 backdrop-blur-xl px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 select-none shadow-xl" dir="rtl">
      
      {/* Left: User Profile + Notifications + Logout */}
      <div className="flex items-center gap-3">
        {/* User Profile Chip */}
        <div className="flex items-center gap-2.5 p-1.5 pl-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/30 transition-all cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-xs text-slate-950">
            أ
          </div>
          <div className="hidden sm:block text-right leading-tight">
            <div className="text-xs font-bold text-white">أحمد السبيعي</div>
            <div className="text-[10px] text-cyan-400 font-medium">مدير العمليات</div>
          </div>
        </div>

        {/* Notifications Bell with badge 3 */}
        <div className="relative p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] cursor-pointer transition-all">
          <Bell className="w-4 h-4 text-slate-300" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-black text-[9px] flex items-center justify-center border-2 border-[#071124]">
            3
          </span>
        </div>

        {/* Logout */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="hidden sm:flex items-center gap-1.5 p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-white/10 hover:border-rose-500/30 text-xs font-bold transition-all"
            title="قفل لوحة التحكم"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Center: System Status Pill + Search Box + Date Clock */}
      <div className="hidden md:flex items-center gap-4 flex-1 max-w-2xl mx-6">
        
        {/* Date and Time pill */}
        <div className="text-right shrink-0 hidden xl:block text-[11px] text-slate-300 font-mono font-bold bg-white/[0.03] px-3 py-1.5 rounded-xl border border-white/10">
          <span>{dateStr || 'الجمعة 25 أكتوبر 2026'}</span> • <span className="text-cyan-300">{timeStr || '07:12 م'}</span>
        </div>

        {/* Search input with Ctrl+K */}
        <div 
          onClick={onOpenCommandPalette}
          className="relative flex-1 cursor-pointer group"
        >
          <Search className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors" />
          <input
            type="text"
            readOnly
            placeholder="ابحث عن فعالية أو قاعة أو رقم حجز أو اسم مستخدم ... (Ctrl + K)"
            className="w-full bg-white/[0.04] group-hover:bg-white/[0.07] border border-white/10 group-hover:border-cyan-400/40 rounded-2xl pr-10 pl-16 py-2 text-xs text-white placeholder-slate-400 outline-none transition-all cursor-pointer"
          />
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
            <kbd className="px-2 py-0.5 text-[9px] font-mono font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-400/30 rounded-md">
              Ctrl+K
            </kbd>
          </div>
        </div>

        {/* Status indicator pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-[11px] text-emerald-300 font-bold shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>النظام يعمل بكفاءة</span>
        </div>

      </div>

      {/* Right: Mobile Menu Toggle + Portal Logo */}
      <div className="flex items-center gap-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-300 border border-white/15 active:scale-95 transition-all"
            aria-label="القائمة"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="text-right">
          <div className="text-sm font-black text-white tracking-wide">
            بوابة المسرح والقاعات
          </div>
          <div className="text-[10px] text-cyan-400 font-bold tracking-wider">
            إدارة وتشغيل الفعاليات
          </div>
        </div>

        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 border border-white/15 shrink-0">
          <div className="flex items-end gap-0.5">
            <span className="w-1 h-3.5 bg-white rounded-full"></span>
            <span className="w-1 h-5 bg-cyan-200 rounded-full"></span>
            <span className="w-1 h-2.5 bg-white rounded-full"></span>
          </div>
        </div>
      </div>

    </header>
  );
}
