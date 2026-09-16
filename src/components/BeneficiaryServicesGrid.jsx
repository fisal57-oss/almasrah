import React from 'react';
import { 
  Building2, 
  Ticket, 
  Armchair, 
  Info, 
  ChevronLeft, 
  Landmark, 
  Crown, 
  Tv, 
  Sparkles,
  Search
} from 'lucide-react';
import { DEFAULT_VENUES } from '../utils/storage';

export default function BeneficiaryServicesGrid({
  onOpenVenueModal,
  activeTab,
  onSelectTab,
  onFocusSearch
}) {
  return (
    <div className="space-y-4">
      {/* Header of Services Grid */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
          <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
            <span>منظومة الخدمات الإلكترونية وحجز القاعات</span>
            <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full font-bold">
              متاح للجهات والضيوف
            </span>
          </h3>
        </div>
        <span className="text-xs text-slate-400 hidden sm:inline">
          اختر أيقونة الخدمة أو القاعة للوصول السريع
        </span>
      </div>

      {/* 4 Main Interactive Service Icon Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* 1. حجز القاعات والمسارح */}
        <button
          type="button"
          onClick={() => onOpenVenueModal && onOpenVenueModal(null)}
          className="glass-panel-luxury p-4 rounded-2xl border border-amber-500/40 hover:border-amber-400 bg-gradient-to-b from-amber-500/15 via-slate-900/70 to-slate-950/90 hover:from-amber-500/25 transition-all text-right group shadow-lg hover:shadow-amber-500/10 active:scale-95 flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-start justify-between w-full mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6 text-slate-950" />
            </div>
            <span className="text-[9px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full font-bold">
              متاح للجهات
            </span>
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors">
              حجز القاعات والمسارح
            </h4>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
              تقديم طلب حجز إلكتروني لمسارح وقاعات تعليم عسير
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-amber-400 font-bold">
            <span>طلب حجز مسرح / قاعة 🏛️</span>
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          </div>
        </button>

        {/* 2. استعلام تذكرتي والباركود */}
        <button
          type="button"
          onClick={() => {
            if (onSelectTab) onSelectTab('find');
            if (onFocusSearch) onFocusSearch();
          }}
          className={`glass-panel-luxury p-4 rounded-2xl border ${
            activeTab === 'find' 
              ? 'border-cyan-400 bg-gradient-to-b from-cyan-500/25 via-slate-900/70 to-slate-950/90' 
              : 'border-cyan-500/30 hover:border-cyan-400 bg-gradient-to-b from-cyan-500/15 via-slate-900/70 to-slate-950/90 hover:from-cyan-500/25'
          } transition-all text-right group shadow-lg hover:shadow-cyan-500/10 active:scale-95 flex flex-col justify-between cursor-pointer`}
        >
          <div className="flex items-start justify-between w-full mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
              <Ticket className="w-6 h-6 text-slate-950" />
            </div>
            <span className="text-[9px] bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 px-2 py-0.5 rounded-full font-bold">
              بحث فوري
            </span>
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-cyan-300 transition-colors">
              استعلام تذكرتي والباركود
            </h4>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
              البحث بالاسم أو رقم الجوال واستعراض بطاقة الدخول
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-cyan-400 font-bold">
            <span>استعراض تذكرتي 🎟️</span>
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          </div>
        </button>

        {/* 3. خريطة كراسي المسرح */}
        <button
          type="button"
          onClick={() => onSelectTab && onSelectTab('map')}
          className={`glass-panel-luxury p-4 rounded-2xl border ${
            activeTab === 'map' 
              ? 'border-purple-400 bg-gradient-to-b from-purple-500/25 via-slate-900/70 to-slate-950/90' 
              : 'border-purple-500/30 hover:border-purple-400 bg-gradient-to-b from-purple-500/15 via-slate-900/70 to-slate-950/90 hover:from-purple-500/25'
          } transition-all text-right group shadow-lg hover:shadow-purple-500/10 active:scale-95 flex flex-col justify-between cursor-pointer`}
        >
          <div className="flex items-start justify-between w-full mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-400 to-indigo-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
              <Armchair className="w-6 h-6 text-slate-950" />
            </div>
            <span className="text-[9px] bg-purple-400/20 text-purple-300 border border-purple-400/30 px-2 py-0.5 rounded-full font-bold">
              مخطط المقاعد
            </span>
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-purple-300 transition-colors">
              خريطة كراسي المسرح
            </h4>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
              استعراض توزيع المقاعد ومدرجات المسرح التفاعلية
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-purple-400 font-bold">
            <span>فتح الخريطة 🗺️</span>
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          </div>
        </button>

        {/* 4. تفاصيل ودليل الفعالية */}
        <button
          type="button"
          onClick={() => onSelectTab && onSelectTab('info')}
          className={`glass-panel-luxury p-4 rounded-2xl border ${
            activeTab === 'info' 
              ? 'border-emerald-400 bg-gradient-to-b from-emerald-500/25 via-slate-900/70 to-slate-950/90' 
              : 'border-emerald-500/30 hover:border-emerald-400 bg-gradient-to-b from-emerald-500/15 via-slate-900/70 to-slate-950/90 hover:from-emerald-500/25'
          } transition-all text-right group shadow-lg hover:shadow-emerald-500/10 active:scale-95 flex flex-col justify-between cursor-pointer`}
        >
          <div className="flex items-start justify-between w-full mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
              <Info className="w-6 h-6 text-slate-950" />
            </div>
            <span className="text-[9px] bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
              معلومات الحضور
            </span>
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-emerald-300 transition-colors">
              دليل وتفاصيل الفعالية
            </h4>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
              التوقيت، الموقع الجغرافي، والتوجيهات الرسمية
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-emerald-400 font-bold">
            <span>عرض الدليل 📋</span>
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

      {/* Quick Direct Venue Icons (أيقونات المسارح والقاعات المتاحة للحجز المباشر) */}
      <div className="glass-panel-luxury p-3 sm:p-4 rounded-2xl border border-amber-500/25 bg-gradient-to-r from-amber-500/10 via-slate-900/50 to-amber-500/10 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 px-1">
          <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>أيقونات القاعات والمسارح المتاحة للحجز الفوري:</span>
          </span>
          <span className="text-[10px] text-slate-400">انقر على أيقونة القاعة لبدء طلب الحجز مباشرة</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {DEFAULT_VENUES.map(venue => {
            const isMain = venue.id === 'main-theater';
            const isEdu = venue.id === 'education-theater';
            const isHall = venue.id === 'faisal-hall';
            return (
              <button
                key={venue.id}
                type="button"
                onClick={() => onOpenVenueModal && onOpenVenueModal(venue.id)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/80 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/60 transition-all text-right group active:scale-95 shadow-sm cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-md ${
                  isMain ? 'bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 font-black' :
                  isEdu ? 'bg-gradient-to-tr from-cyan-400 to-blue-500 text-slate-950 font-black' :
                  isHall ? 'bg-gradient-to-tr from-purple-400 to-pink-500 text-slate-950 font-black' :
                  'bg-gradient-to-tr from-emerald-400 to-teal-500 text-slate-950 font-black'
                }`}>
                  {isMain ? <Landmark className="w-5 h-5" /> :
                   isEdu ? <Tv className="w-5 h-5" /> :
                   isHall ? <Crown className="w-5 h-5" /> :
                   <Sparkles className="w-5 h-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-black text-white truncate group-hover:text-amber-300 transition-colors">
                    {venue.name.split('(')[0]}
                  </div>
                  <div className="text-[10px] text-amber-400 font-bold font-mono">
                    {venue.capacity}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
