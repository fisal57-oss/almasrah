import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Armchair, 
  User, 
  Printer, 
  QrCode, 
  FileSpreadsheet, 
  Settings, 
  ExternalLink, 
  X, 
  CheckCircle2, 
  Sparkles,
  Command,
  ArrowRight,
  Send,
  PlusCircle
} from 'lucide-react';
import { formatArabicSeatCode } from '../utils/storage';

export default function CommandPalette({ 
  isOpen, 
  onClose, 
  seats = [], 
  onSelectSeat,
  onOpenBookingModal,
  onOpenAllTicketsPrint,
  onOpenBatchSeatCards,
  onOpenPrintLabels,
  onOpenSettings,
  onOpenScanner,
  onExportExcel
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global Keybindings
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent if passing down, but toggleable here
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Build Results
  const normalizedQuery = query.trim().toLowerCase();

  // Filter Quick Actions
  const actionItems = [
    {
      id: 'act-book',
      type: 'action',
      title: 'حجز مقعد جديد لضيف',
      subtitle: 'فتح نافذة الحجز واختيار مقعد شاغر',
      icon: <PlusCircle className="w-4 h-4 text-emerald-300" />,
      run: () => { onClose(); onOpenBookingModal?.(); }
    },
    {
      id: 'act-scanner',
      type: 'action',
      title: 'تشغيل ماسح تذاكر الباب (QR Scanner)',
      subtitle: 'التحضير السريع للضيوف والتأكد من المقاعد',
      icon: <QrCode className="w-4 h-4 text-cyan-300" />,
      run: () => { onClose(); onOpenScanner?.(); }
    },
    {
      id: 'act-print-tickets',
      type: 'action',
      title: 'طباعة جميع التذاكر الرسمية للفعالية (A4)',
      subtitle: 'تذاكر ملونة عالية الدقة مع باركود وQR',
      icon: <Printer className="w-4 h-4 text-amber-300" />,
      run: () => { onClose(); onOpenAllTicketsPrint?.(); }
    },
    {
      id: 'act-print-cards',
      type: 'action',
      title: 'طباعة بطاقات المقاعد الأفقية الفاخرة',
      subtitle: 'لافتات ورقية توضع على كراسي المسرح للضيوف',
      icon: <Armchair className="w-4 h-4 text-purple-300" />,
      run: () => { onClose(); onOpenBatchSeatCards?.(); }
    },
    {
      id: 'act-print-labels',
      type: 'action',
      title: 'طباعة ملصقات الباركود والـ QR اللاصقة',
      subtitle: 'ملصقات للمقاعد سهلة التركيب',
      icon: <Printer className="w-4 h-4 text-rose-300" />,
      run: () => { onClose(); onOpenPrintLabels?.(); }
    },
    {
      id: 'act-export-excel',
      type: 'action',
      title: 'تصدير كشف الحجوزات إلى Excel',
      subtitle: 'تحميل جدول الحضور بصيغة .xlsx',
      icon: <FileSpreadsheet className="w-4 h-4 text-emerald-400" />,
      run: () => { onClose(); onExportExcel?.(); }
    },
    {
      id: 'act-settings',
      type: 'action',
      title: 'إعدادات الفعالية والمسرح',
      subtitle: 'تعديل اسم الحفل، التاريخ، القاعة، وكلمة المرور',
      icon: <Settings className="w-4 h-4 text-slate-300" />,
      run: () => { onClose(); onOpenSettings?.(); }
    },
    {
      id: 'act-staff-portal',
      type: 'action',
      title: 'الانتقال إلى بوابة الموظف (Staff Portal)',
      subtitle: 'فتح بوابة المنظمين ومسؤولي البوابات',
      icon: <ExternalLink className="w-4 h-4 text-cyan-400" />,
      run: () => { window.open('staff.html', '_blank'); onClose(); }
    },
    {
      id: 'act-beneficiary-portal',
      type: 'action',
      title: 'الانتقال إلى بوابة المستفيد (Beneficiary Portal)',
      subtitle: 'عرض تذاكر الضيوف وتوجيه المقاعد',
      icon: <ExternalLink className="w-4 h-4 text-amber-400" />,
      run: () => { window.open('beneficiary.html', '_blank'); onClose(); }
    }
  ].filter(act => 
    !normalizedQuery || 
    act.title.toLowerCase().includes(normalizedQuery) || 
    act.subtitle.toLowerCase().includes(normalizedQuery)
  );

  // Filter Seats & Guests
  const seatItems = seats.filter(s => {
    if (!normalizedQuery) return s.status === 'reserved' || s.status === 'checked_in';
    const guestName = s.guest?.name?.toLowerCase() || '';
    const jobTitle = s.guest?.jobTitle?.toLowerCase() || '';
    const phone = s.guest?.phone?.toLowerCase() || '';
    const category = s.guest?.category?.toLowerCase() || '';
    const code = `${s.row}-${s.number}`.toLowerCase();
    const arabicCode = formatArabicSeatCode(s).toLowerCase();
    const level = s.level === 'B' ? 'بلكونة' : 'ارضي أرضي';

    return (
      guestName.includes(normalizedQuery) ||
      jobTitle.includes(normalizedQuery) ||
      phone.includes(normalizedQuery) ||
      category.includes(normalizedQuery) ||
      code.includes(normalizedQuery) ||
      arabicCode.includes(normalizedQuery) ||
      level.includes(normalizedQuery)
    );
  }).slice(0, 8).map(s => ({
    id: `seat-${s.id}`,
    type: 'seat',
    title: s.guest?.name || `مقعد شاغر: ${formatArabicSeatCode(s)}`,
    subtitle: `${formatArabicSeatCode(s)} • ${s.level === 'B' ? 'البلكونة' : 'الدور الأرضي'} • ${s.sector || 'الوسط'} ${s.guest?.jobTitle ? `• ${s.guest.jobTitle}` : ''}`,
    status: s.status,
    seat: s,
    icon: (
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
        s.status === 'checked_in'
          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
          : s.status === 'reserved'
          ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
          : 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
      }`}>
        <Armchair className="w-3.5 h-3.5" />
      </div>
    ),
    run: () => {
      onClose();
      onSelectSeat?.(s);
    }
  }));

  const allResults = [...actionItems, ...seatItems];

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (allResults.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + allResults.length) % (allResults.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (allResults[selectedIndex]) {
        allResults[selectedIndex].run();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in" dir="rtl">
      
      {/* Palette Container */}
      <div className="relative w-full max-w-2xl bg-[#091325] border-2 border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/10 flex flex-col max-h-[80vh]">
        
        {/* Search Bar Header */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-white/10 bg-[#060D1A]">
          <Search className="w-5 h-5 text-cyan-400 mr-1" />
          <input
            ref={inputRef}
            type="text"
            placeholder="ابحث عن ضيف، رقم مقعد، إجراء طباعة، أو أمر سريع... (مثال: فيصل، A04، طباعة)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none outline-none text-white placeholder-slate-400 px-3 text-sm font-medium"
          />
          <div className="flex items-center gap-1.5 shrink-0">
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 rounded-md">
              ESC
            </kbd>
            <button
              onClick={onClose}
              className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-white/5">
          {allResults.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Search className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-xs text-slate-400 font-bold">لم يتم العثور على نتائج مطابقة لـ "{query}"</p>
              <p className="text-[10px] text-slate-500">جرب البحث برقم المقعد (مثل B02) أو اسم الضيف</p>
            </div>
          ) : (
            <>
              {/* Action Section if any */}
              {actionItems.length > 0 && (
                <div className="pt-1 pb-1">
                  <span className="text-[10px] font-black text-cyan-400 px-3 py-1 block">
                    الإجراءات والأدوات السريعة
                  </span>
                  {actionItems.map((item, idx) => {
                    const isSelected = selectedIndex === idx;
                    return (
                      <div
                        key={item.id}
                        onClick={item.run}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-2xl cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 text-white shadow-md' 
                            : 'text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white">{item.title}</h4>
                            <p className="text-[10px] text-slate-400">{item.subtitle}</p>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="flex items-center gap-1 text-[10px] text-cyan-300 font-bold">
                            <span>تنفيذ</span>
                            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Seats & Guests Section */}
              {seatItems.length > 0 && (
                <div className="pt-2 pb-1">
                  <span className="text-[10px] font-black text-amber-400 px-3 py-1 block">
                    الضيوف والمقاعد ({seatItems.length})
                  </span>
                  {seatItems.map((item, idx) => {
                    const globalIdx = actionItems.length + idx;
                    const isSelected = selectedIndex === globalIdx;
                    return (
                      <div
                        key={item.id}
                        onClick={item.run}
                        onMouseEnter={() => setSelectedIndex(globalIdx)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-2xl cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-gradient-to-r from-amber-500/20 to-cyan-500/20 border border-amber-400/40 text-white shadow-md' 
                            : 'text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-white">{item.title}</h4>
                              <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                                item.status === 'checked_in'
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : item.status === 'reserved'
                                  ? 'bg-amber-500/20 text-amber-300'
                                  : 'bg-slate-500/20 text-slate-300'
                              }`}>
                                {item.status === 'checked_in' ? 'حاضر' : item.status === 'reserved' ? 'محجوز' : 'شاغر'}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400">{item.subtitle}</p>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="flex items-center gap-1 text-[10px] text-amber-300 font-bold">
                            <span>عرض المقعد</span>
                            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="px-4 py-2.5 bg-[#060D1A] border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 font-mono text-[9px] bg-white/10 rounded">↑↓</kbd>
              <span>للتنقل</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 font-mono text-[9px] bg-white/10 rounded">↵</kbd>
              <span>للاختيار</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>البحث الذكي الموحد</span>
          </div>
        </div>

      </div>
    </div>
  );
}
