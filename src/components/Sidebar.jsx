import React, { useState } from 'react';
import { 
  Rocket, 
  Armchair, 
  Calendar, 
  QrCode, 
  Printer, 
  Settings, 
  Building2,
  CheckCircle2,
  PlusCircle,
  Users,
  Mail,
  LayoutDashboard,
  Crown,
  FileSpreadsheet,
  Lock,
  ExternalLink,
  ShieldCheck,
  X
} from 'lucide-react';
import { getEventDetails } from '../utils/storage';

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  stats = {}, 
  eventDetails,
  onOpenPrintLabels, 
  onOpenSeatManager, 
  onOpenPrintAllTickets,
  onOpenBeneficiaryPortal,
  onOpenSettings,
  onLogout,
  isMobileOpen = false,
  onCloseMobile
}) {
  const [logoError, setLogoError] = useState(false);
  const activeEvent = eventDetails || getEventDetails();
  const activeLogo = !logoError && activeEvent?.logoUrl;
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'لوحة القيادة والمؤشرات', 
      icon: LayoutDashboard,
      badge: `${stats.reserved || 0} نشط`
    },
    { 
      id: 'itqan', 
      label: 'نظام إتقان لإدارة القاعات', 
      icon: Building2, 
      badge: 'إتقان 🏢'
    },
    { 
      id: 'booking-form', 
      label: 'استمارة حجز القاعات والمسارح', 
      icon: FileSpreadsheet, 
      badge: 'طلب حجز 📝'
    },
    { 
      id: 'map', 
      label: 'خريطة مقاعد المسرح', 
      icon: Armchair, 
      badge: `${stats.available || 0} شاغر`
    },
    { 
      id: 'invitations', 
      label: 'مركز الدعوات والبطاقات', 
      icon: Mail, 
      badge: `${stats.reserved || 0} دعوة`
    },
    { 
      id: 'list', 
      label: 'كشف الضيوف والحجوزات', 
      icon: Calendar, 
      badge: `${stats.reserved || 0} ضيف`
    },
    { 
      id: 'scanner', 
      label: 'ماسح الباركود عند الباب', 
      icon: QrCode,
      badge: `${stats.checkedIn || 0} حاضر`
    },
    { 
      id: 'staff-portal', 
      label: 'بوابة الموظف والمنظمين', 
      icon: ShieldCheck, 
      onClick: () => window.open('staff.html', '_blank'),
      isExternal: true
    },
    { 
      id: 'beneficiary-portal', 
      label: 'بوابة المستفيدين والضيوف', 
      icon: Users, 
      onClick: onOpenBeneficiaryPortal,
      isExternal: true
    },
    { 
      id: 'print-all-tickets', 
      label: 'طباعة جميع تذاكر الحضور', 
      icon: Printer, 
      onClick: onOpenPrintAllTickets
    },
    { 
      id: 'seat-manager', 
      label: 'تخصيص وإدارة المقاعد', 
      icon: PlusCircle, 
      onClick: onOpenSeatManager
    },
    { 
      id: 'labels', 
      label: 'طباعة ملصقات المقاعد QR', 
      icon: Printer, 
      onClick: onOpenPrintLabels 
    },
    { 
      id: 'settings', 
      label: 'إعدادات الفعالية والمسرح', 
      icon: Settings, 
      onClick: onOpenSettings
    },
  ];

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    } else {
      setCurrentTab(item.id);
    }
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const renderNavContent = (isDrawer = false) => (
    <>
      <div>
        {/* Top Logo & App Title */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {activeLogo ? (
              <img 
                src={activeLogo} 
                alt="شعار الفعالية" 
                onError={() => setLogoError(true)}
                className="h-10 sm:h-11 max-h-11 max-w-[120px] object-contain rounded-xl p-1 bg-white/10 backdrop-blur-md border border-white/20 shadow-md shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-black shrink-0">
                <Crown className="w-5 h-5 text-amber-300" />
              </div>
            )}
            <div>
              <h1 className="text-sm sm:text-base font-black tracking-wide text-white">
                مسرح تعليم عسير
              </h1>
              <p className="text-[10px] text-cyan-400 font-bold tracking-wider uppercase">
                لوحة تحكم الإدارة
              </p>
            </div>
          </div>

          {/* Close button for mobile drawer */}
          {isDrawer && onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-all"
              aria-label="إغلاق القائمة"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items List */}
        <nav className="p-3 space-y-1.5 mt-2">
          <div className="text-[10px] font-black text-slate-400 px-3 uppercase tracking-wider mb-2">
            الأقسام الرئيسية
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-l from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25 scale-[1.01] font-black'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                  <span>{item.label}</span>
                </div>
                
                {item.badge && (
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    isActive 
                      ? 'bg-slate-950/20 text-slate-950 font-black' 
                      : item.id === 'map'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : item.id === 'scanner'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}

                {item.isExternal && (
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer: Stats & Lock */}
      <div className="p-3 border-t border-white/10 space-y-2">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center justify-between text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 block">إجمالي المقاعد</span>
            <span className="text-white font-black">{stats.total || 746} مقعد</span>
          </div>
          <div className="text-left font-mono">
            <span className="text-[10px] text-emerald-400 block font-bold">الحضور</span>
            <span className="text-emerald-300 font-bold">{stats.checkedIn || 0}</span>
          </div>
        </div>

        {onLogout && (
          <button
            onClick={() => {
              if (onCloseMobile) onCloseMobile();
              onLogout();
            }}
            className="w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Lock className="w-3.5 h-3.5 text-rose-400" />
            <span>قفل لوحة التحكم</span>
          </button>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#060D1A] border-l border-white/10 flex-col justify-between h-screen sticky top-0 shrink-0 select-none z-30 overflow-y-auto" dir="rtl">
        {renderNavContent(false)}
      </aside>

      {/* Mobile Backdrop & Slide Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end" dir="rtl">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-fade-in transition-opacity"
            onClick={onCloseMobile}
          />
          
          {/* Drawer Content */}
          <aside className="relative z-50 w-72 max-w-[85vw] bg-[#060D1A] border-l border-white/15 flex flex-col justify-between h-full shadow-2xl overflow-y-auto animate-slide-left select-none">
            {renderNavContent(true)}
          </aside>
        </div>
      )}
    </>
  );
}
