import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Printer, 
  Users, 
  Check, 
  Filter, 
  DoorClosed, 
  Sparkles,
  Layers,
  ShieldCheck
} from 'lucide-react';
import OrganizerBadgeCard from './OrganizerBadgeCard';

export default function BatchOrganizerBadgesPrintModal({
  staffAccounts = [],
  eventDetails = {},
  onClose
}) {
  const [gateFilter, setGateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('active_only'); // 'active_only' | 'all'
  const [badgesPerPage, setBadgesPerPage] = useState('2'); // '2' or '4'
  const [selectedIds, setSelectedIds] = useState(() => 
    staffAccounts.map(s => s.id)
  );

  // Filter gates
  const gates = Array.from(new Set(staffAccounts.map(s => s.gate).filter(Boolean)));

  const filteredStaff = staffAccounts.filter(staff => {
    if (statusFilter === 'active_only' && !staff.active) return false;
    if (gateFilter !== 'all' && staff.gate !== gateFilter) return false;
    return true;
  });

  const targetStaff = filteredStaff.filter(s => selectedIds.includes(s.id));

  const handleToggleSelectAll = () => {
    if (targetStaff.length === filteredStaff.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredStaff.map(s => s.id));
    }
  };

  const handleToggleStaff = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handlePrint = () => {
    try {
      document.body.classList.add('is-printing-batch-organizers');
      window.print();
    } catch (e) {
      console.error('Batch organizers print error:', e);
    } finally {
      setTimeout(() => {
        document.body.classList.remove('is-printing-batch-organizers');
      }, 1500);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
      
      <div className="relative w-full max-w-6xl my-2 flex flex-col items-center">
        
        {/* Top Controls Toolbar */}
        <div className="no-print w-full glass-panel-luxury p-4 rounded-3xl border border-emerald-500/30 mb-4 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 font-bold shadow-lg">
              <Users className="w-5 h-5 text-slate-950" />
            </div>
            <div className="text-right">
              <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <span>طباعة بطاقات المنظمين وموظفي البوابات</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                  {targetStaff.length} بطاقة محددة
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                تصميم مطابق تماماً لهوية الدعوة الرسمية - مقاس جاهز للطباعة على ورق A4 والقص
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Badges per page toggle */}
            <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setBadgesPerPage('2')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${badgesPerPage === '2' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'}`}
                title="بطاقتين في كل صفحة A4 (حجم كبير واضح)"
              >
                2 بالصفحة (كبير)
              </button>
              <button
                type="button"
                onClick={() => setBadgesPerPage('4')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${badgesPerPage === '4' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'}`}
                title="4 بطاقات في كل صفحة A4 (اقتصادي)"
              >
                4 بالصفحة (اقتصادي)
              </button>
            </div>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              disabled={targetStaff.length === 0}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
            >
              <Printer className="w-4 h-4 text-slate-950" />
              <span>طباعة الكل الآن ({targetStaff.length})</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Filter Bar */}
        <div className="no-print w-full bg-[#0b162b] p-3 rounded-2xl border border-white/10 mb-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 font-bold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              تصفية:
            </span>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/5 border border-white/15 rounded-xl px-3 py-1.5 text-white outline-none"
            >
              <option value="active_only" className="bg-slate-900 text-white">الحسابات المفعلة فقط</option>
              <option value="all" className="bg-slate-900 text-white">جميع الحسابات (مفعل ومعطل)</option>
            </select>

            {/* Gate Filter */}
            {gates.length > 0 && (
              <select
                value={gateFilter}
                onChange={(e) => setGateFilter(e.target.value)}
                className="bg-white/5 border border-white/15 rounded-xl px-3 py-1.5 text-white outline-none"
              >
                <option value="all" className="bg-slate-900 text-white">كافة البوابات ({gates.length})</option>
                {gates.map(g => (
                  <option key={g} value={g} className="bg-slate-900 text-white">{g}</option>
                ))}
              </select>
            )}

            {/* Select All */}
            <button
              type="button"
              onClick={handleToggleSelectAll}
              className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-bold"
            >
              {targetStaff.length === filteredStaff.length ? 'إلغاء تحديد الكل' : 'تحديد الكل'}
            </button>
          </div>

          <div className="text-[11px] text-slate-400">
            معاينة حية للمطبوعات أدناه • انقر على أي بطاقة لتحديدها أو استثنائها
          </div>
        </div>

        {/* Printable Badges Container */}
        <div className="w-full batch-organizers-container">
          {targetStaff.length === 0 ? (
            <div className="text-center py-12 bg-white/5 rounded-3xl border border-white/10 text-slate-400 text-xs">
              <Users className="w-12 h-12 mx-auto mb-2 text-slate-600" />
              <p className="font-bold">لا توجد بطاقات مطابقة لخيارات التصفية</p>
            </div>
          ) : (
            <div 
              className={`batch-organizers-grid grid gap-6 sm:gap-8 justify-items-center ${
                badgesPerPage === '2' 
                  ? 'grid-cols-1 md:grid-cols-2' 
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              }`}
            >
              {targetStaff.map((staff) => {
                const isSelected = selectedIds.includes(staff.id);

                return (
                  <div 
                    key={staff.id}
                    onClick={() => handleToggleStaff(staff.id)}
                    className={`single-organizer-badge-wrapper cursor-pointer transition-all relative rounded-[32px] p-2 ${
                      isSelected 
                        ? 'ring-2 ring-emerald-400/80 shadow-2xl' 
                        : 'opacity-40 grayscale'
                    }`}
                  >
                    {/* Selection Indicator on Screen */}
                    <div className="no-print absolute top-4 right-4 z-30 w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-lg border-2 border-white">
                      <Check className="w-4 h-4" />
                    </div>

                    <OrganizerBadgeCard
                      staff={staff}
                      eventDetails={eventDetails}
                      className="shadow-xl"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
}
