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
  X,
  Layers,
  Wrench,
  BarChart3,
  DoorClosed,
  Ban
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

  const menuSections = [
    {
      title: 'إدارة المسرح والفعالية',
      items: [
        { 
          id: 'dashboard', 
          label: 'لوحة القيادة والمؤشرات', 
          icon: LayoutDashboard,
          badge: `${stats.reserved || 0} نشط`,
          badgeType: 'cyan'
        },
        { 
          id: 'map', 
          label: 'خريطة مقاعد المسرح', 
          icon: Armchair, 
          badge: `${stats.available || 0} شاغر`,
          badgeType: 'emerald'
        },
        { 
          id: 'list', 
          label: 'كشف الضيوف والحجوزات', 
          icon: Calendar, 
          badge: `${stats.reserved || 0} ضيف`,
          badgeType: 'amber'
        },
        { 
          id: 'invitations', 
          label: 'مركز الدعوات والبطاقات', 
          icon: Mail, 
          badge: `${stats.reserved || 0} دعوة`,
          badgeType: 'cyan'
        },
        { 
          id: 'scanner', 
          label: 'ماسح الباركود عند الباب', 
          icon: QrCode,
          badge: `${stats.checkedIn || 0} حاضر`,
          badgeType: 'purple'
        }
      ]
    },
    {
      title: 'أدوات المقاعد والطباعة',
      items: [
        { 
          id: 'seat-manager', 
          label: 'تخصيص وإدارة المقاعد', 
          icon: PlusCircle, 
          onClick: onOpenSeatManager
        },
        { 
          id: 'labels', 
          label: 'طباعة ملصقات المقاعد QR', 
          icon: QrCode, 
          onClick: onOpenPrintLabels 
        },
        { 
          id: 'print-all-tickets', 
          label: 'طباعة تذاكر الحضور دفعة واحدة', 
          icon: Printer, 
          onClick: onOpenPrintAllTickets
        }
      ]
    },
    {
      title: 'البوابات الإلكترونية السريعة',
      items: [
        { 
          id: 'manager-portal', 
          label: 'بوابة المتابعة للمدير', 
          icon: Crown, 
          onClick: () => window.open('manager.html', '_blank'),
          isExternal: true,
          badge: 'مباشر',
          badgeType: 'cyan'
        },
        { 
          id: 'staff-portal', 
          label: 'بوابة المنظمين والموظفين', 
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
        }
      ]
    }
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

  const getBadgeStyle = (type, isActive) => {
    if (isActive) {
      return 'bg-cyan-400 text-slate-950 font-black shadow-sm';
    }
    switch (type) {
      case 'emerald':
        return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30';
      case 'purple':
        return 'bg-purple-500/15 text-purple-300 border border-purple-500/30';
      case 'rose':
        return 'bg-rose-500/15 text-rose-300 border border-rose-500/30';
      case 'amber':
        return 'bg-amber-500/15 text-amber-300 border border-amber-500/30';
      case 'cyan':
      default:
        return 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30';
    }
  };

  const renderNavContent = (isDrawer = false) => (
    <>
      <div className="flex-1 flex flex-col min-h-0">
        {/* Top Logo & App Title */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#060D1A]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            {activeLogo ? (
              <img 
                src={activeLogo} 
                alt="شعار الفعالية" 
                onError={() => setLogoError(true)}
                className="h-10 sm:h-11 max-h-11 max-w-[120px] object-contain rounded-xl p-1 bg-white/10 backdrop-blur-md border border-white/20 shadow-md shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-black shrink-0 border border-white/15">
                <Crown className="w-5 h-5 text-amber-300" />
              </div>
            )}
            <div>
              <h1 className="text-sm sm:text-base font-black tracking-wide text-white leading-tight">
                منظومة المسارح والقاعات
              </h1>
              <p className="text-[10px] text-cyan-400 font-bold tracking-wider uppercase mt-0.5">
                لوحة التحكم الموحدة
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

        {/* Navigation Items List - with sleek smooth scroll */}
        <nav className="p-3 space-y-4 flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
          {menuSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {/* Section Header */}
              <div className="flex items-center justify-between px-2.5 py-1 text-[11px] font-black text-slate-400 uppercase tracking-wider border-b border-white/[0.04] mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]"></span>
                  <span className="text-slate-300 font-bold">{section.title}</span>
                </div>
              </div>

              {/* Items in section */}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-150 group text-right ${
                        isActive
                          ? 'bg-gradient-to-l from-cyan-500/20 via-blue-600/15 to-transparent text-cyan-200 border-r-[3px] border-cyan-400 font-black shadow-sm shadow-cyan-500/10'
                          : 'text-slate-300 hover:text-white hover:bg-white/[0.06] font-medium border-r-[3px] border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive 
                            ? 'text-cyan-400' 
                            : 'text-slate-400 group-hover:text-cyan-400'
                        }`} />
                        <span className="whitespace-nowrap text-[12.5px] tracking-tight">{item.label}</span>
                      </div>
                      
                      {item.badge && (
                        <span className={`text-[9.5px] font-mono px-2 py-0.5 rounded-md font-bold shrink-0 mr-1.5 transition-all ${getBadgeStyle(item.badgeType, isActive)}`}>
                          {item.badge}
                        </span>
                      )}

                      {item.isExternal && (
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-cyan-400 shrink-0 mr-1.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Theater Promo Card matching Screenshot 2 & 4 */}
        <div className="p-3 mx-3 my-2 rounded-2xl bg-gradient-to-br from-[#0c1e3d] via-[#09152b] to-[#060D1A] border border-cyan-500/20 relative overflow-hidden group shadow-lg shrink-0">
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-amber-400/40 relative shadow-md">
              <img 
                src="theater_stage.jpg" 
                alt="المسرح" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                onError={(e) => { e.target.src = 'src/assets/theater_stage.jpg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-0.5">
                <Crown className="w-3 h-3 text-amber-300" />
              </div>
            </div>
            <div>
              <h4 className="text-xs font-black text-white group-hover:text-cyan-300 transition-colors">مسرحنا .. أكثر من فعالية</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">تجربة ملهمة تجمع الإبداع والتنظيم</p>
            </div>
          </div>
        </div>

        {/* Support & Help widget */}
        <div className="px-3 py-2 mx-3 mb-2 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]"></span>
            <span className="text-[11px] font-bold text-slate-300">الدعم والمساعدة</span>
          </div>
          <span className="text-[10px] text-cyan-400 font-mono">24/7 نشط</span>
        </div>
      </div>

      {/* Dedicated Settings Button & Bottom Footer */}
      <div className="p-3 border-t border-white/10 space-y-2 bg-[#060D1A]/95 shrink-0">
        {/* Settings Button */}
        <button
          onClick={() => {
            if (onOpenSettings) onOpenSettings();
            if (onCloseMobile) onCloseMobile();
          }}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all duration-200 border ${
            currentTab === 'settings'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black border-cyan-400 shadow-lg shadow-cyan-500/25 scale-[1.01]'
              : 'bg-white/[0.03] hover:bg-cyan-500/10 text-slate-200 hover:text-white border-white/10 hover:border-cyan-500/30 font-bold group'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className={`p-1 rounded-lg ${currentTab === 'settings' ? 'bg-slate-950/20 text-slate-950' : 'bg-cyan-500/15 text-cyan-400 group-hover:scale-110 transition-transform'}`}>
              <Settings className="w-4 h-4" />
            </div>
            <span className="text-[12px]">إعدادات الفعالية والمسرح</span>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
            currentTab === 'settings' ? 'bg-slate-950/20 text-slate-950' : 'bg-white/5 text-slate-400 border border-white/10'
          }`}>
            تخصيص
          </span>
        </button>

        {/* Stats Widget */}
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
      <aside className="hidden lg:flex w-72 bg-[#060D1A] border-l border-white/10 flex-col justify-between h-screen sticky top-0 shrink-0 select-none z-30 overflow-y-auto" dir="rtl">
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
