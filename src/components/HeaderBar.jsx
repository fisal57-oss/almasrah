import React, { useState } from 'react';
import { Search, Bell, Building2, Crown, Sparkles, LogOut, Lock, Users, ExternalLink } from 'lucide-react';
import { MinistryOfEducationLogo } from './ModernAttendanceCard';

export default function HeaderBar({ eventDetails = {}, onSearchQuery, onLogout, onOpenBeneficiary }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearchQuery) {
      onSearchQuery(e.target.value);
    }
  };

  return (
    <header className="h-16 border-b border-white/10 bg-[#060D1A]/90 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30" dir="rtl">
      
      {/* Right Side: Ministry & Department Branding */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0">
          <Crown className="w-5 h-5 text-amber-400" />
        </div>

        <div className="hidden sm:block">
          <h2 className="text-xs font-black text-white flex items-center gap-1.5">
            <span>الإدارة العامة للتعليم بمنطقة عسير</span>
            <span className="text-[10px] bg-cyan-500/20 px-2 py-0.5 rounded text-cyan-300 font-mono font-bold">
              لوحة الإدارة
            </span>
          </h2>
          <p className="text-[10px] text-slate-400 font-medium">
            نظام إدارة وحجز مقاعد المسرح وبطاقات QR
          </p>
        </div>
      </div>

      {/* Center Search Input */}
      <div className="flex-1 max-w-md mx-4 sm:mx-8">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="بحث فوري في الضيوف، المقاعد، الفعاليات..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-white/5 border border-white/15 focus:border-cyan-400 focus:bg-white/10 rounded-xl pr-10 pl-4 py-2 text-xs text-white placeholder-slate-400 outline-none transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Left Side: Actions (Beneficiary Link + Event Badge + Logout) */}
      <div className="flex items-center gap-2.5">
        
        {/* Active Event Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold truncate max-w-[200px]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">{eventDetails.title || 'مسرح عسير'}</span>
        </div>

        {/* Guest Portal Quick Launch */}
        <button
          onClick={onOpenBeneficiary || (() => window.open('beneficiary.html', '_blank'))}
          title="فتح بوابة الضيوف والمستفيدين في نافذة جديدة"
          className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/15 text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95"
        >
          <Users className="w-3.5 h-3.5 text-cyan-300" />
          <span className="hidden sm:inline">بوابة الضيف</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </button>

        {/* Logout / Lock Admin */}
        {onLogout && (
          <button
            onClick={onLogout}
            title="قفل لوحة التحكم وتسجيل الخروج"
            className="p-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-400/30 transition-all flex items-center gap-1 text-xs font-bold active:scale-95"
          >
            <Lock className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">قفل</span>
          </button>
        )}

      </div>

    </header>
  );
}
