import React, { useState } from 'react';
import { Search, Bell, Building2, Crown, Sparkles, LogOut, Lock, Users, ExternalLink, Menu } from 'lucide-react';
import { MinistryOfEducationLogo } from './ModernAttendanceCard';

export default function HeaderBar({ 
  eventDetails = {}, 
  onSearchQuery, 
  onLogout, 
  onOpenBeneficiary, 
  onOpenCommandPalette,
  onToggleMobileMenu
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearchQuery) {
      onSearchQuery(e.target.value);
    }
  };

  return (
    <header className="h-16 border-b border-white/10 bg-[#060D1A]/90 backdrop-blur-xl px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30" dir="rtl">
      
      {/* Right Side: Mobile Hamburger + Ministry & Department Branding */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        
        {/* Mobile Hamburger Toggle Button */}
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-300 border border-white/15 shrink-0 active:scale-95 transition-all"
            aria-label="فتح القائمة الجانبية"
            title="القائمة"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0">
          <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
        </div>

        <div>
          <h2 className="text-xs font-black text-white flex items-center gap-1.5 leading-tight">
            <span>مسرح تعليم عسير</span>
            <span className="hidden sm:inline-block text-[10px] bg-cyan-500/20 px-2 py-0.5 rounded text-cyan-300 font-mono font-bold">
              لوحة الإدارة
            </span>
          </h2>
          <p className="hidden sm:block text-[10px] text-slate-400 font-medium">
            نظام إدارة وحجز مقاعد المسرح وبطاقات QR
          </p>
        </div>
      </div>

      {/* Center Search Input / Command Palette Launcher */}
      <div className="flex-1 max-w-md mx-2 sm:mx-8">
        
        {/* Desktop / Tablet Search Box */}
        <div 
          onClick={onOpenCommandPalette}
          className="hidden sm:block relative cursor-pointer group"
        >
          <Search className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors" />
          <input
            type="text"
            readOnly
            placeholder="بحث فوري في الضيوف، المقاعد، الفعاليات... (اضغط Ctrl+K)"
            className="w-full bg-white/5 group-hover:bg-white/10 border border-white/15 group-hover:border-cyan-400/50 rounded-xl pr-10 pl-16 py-2 text-xs text-white placeholder-slate-400 outline-none transition-all shadow-inner cursor-pointer"
          />
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-400/30 rounded-md">
              Ctrl+K
            </kbd>
          </div>
        </div>

        {/* Mobile Compact Search Trigger Button */}
        <button
          onClick={onOpenCommandPalette}
          className="sm:hidden flex items-center gap-2 w-full bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl px-3 py-1.5 text-slate-400 text-xs transition-all active:scale-95"
          title="بحث فوري"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="truncate text-[11px]">بحث سريع...</span>
        </button>

      </div>

      {/* Left Side: Actions (Beneficiary Link + Event Badge + Logout) */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        
        {/* Active Event Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold truncate max-w-[180px]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">{eventDetails.title || 'مسرح عسير'}</span>
        </div>

        {/* Guest Portal Quick Launch */}
        <button
          onClick={onOpenBeneficiary || (() => window.open('beneficiary.html', '_blank'))}
          title="فتح بوابة الضيوف والمستفيدين"
          className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/15 text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95"
        >
          <Users className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
          <span className="hidden md:inline">بوابة الضيف</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </button>

        {/* Logout / Lock Admin */}
        {onLogout && (
          <button
            onClick={onLogout}
            title="قفل لوحة التحكم وتسجيل الخروج"
            className="p-1.5 sm:p-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-400/30 transition-all flex items-center gap-1 text-xs font-bold active:scale-95"
          >
            <Lock className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden md:inline">قفل</span>
          </button>
        )}

      </div>

    </header>
  );
}
