import React, { useState } from 'react';
import { 
  Armchair, 
  Sparkles, 
  Search, 
  Crown, 
  UserCheck, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  CheckCircle2,
  Plus,
  X,
  Save,
  Trash2,
  RefreshCw,
  Sliders,
  Check
} from 'lucide-react';
import { formatArabicSeatCode, getSeats, saveSeats, deleteSeat, renumberAllSeats, addSeatsToRow } from '../utils/storage';

const SECTORS = [
  { key: 'left',   name: 'اليسار'  },
  { key: 'center', name: 'الوسط'   },
  { key: 'right',  name: 'اليمين'  },
];

export default function TheaterMap({ 
  seats, 
  onSelectSeat, 
  onSeatsUpdated,
  highlightSeatId = null,
  isBeneficiaryView = false
}) {
  const [activeLevel, setActiveLevel] = useState('G');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomScale, setZoomScale] = useState(1);
  const [deleteMode, setDeleteMode] = useState(false);
  const [actionNotice, setActionNotice] = useState('');

  // Auto switch floor level to highlighted seat
  React.useEffect(() => {
    if (highlightSeatId) {
      const targetSeat = seats.find(s => s.id === highlightSeatId);
      if (targetSeat && targetSeat.level) {
        setActiveLevel(targetSeat.level);
      }
    }
  }, [highlightSeatId, seats]);

  // Quick-add state
  const [addPanel, setAddPanel] = useState(null); // { row, level }
  const [addForm, setAddForm] = useState({ sectorKey: 'center', count: 1, autoRenumber: true });
  const [addSaving, setAddSaving] = useState(false);
  const [addSuccess, setAddSuccess] = useState('');

  const levelSeats = seats.filter((s) => s.level === activeLevel);

  const filteredSeats = levelSeats.filter((seat) => {
    if (statusFilter !== 'all' && seat.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const codeStr = seat.id.toLowerCase();
      const arabicCodeStr = formatArabicSeatCode(seat).toLowerCase();
      const guestName = seat.guest?.name?.toLowerCase() || '';
      return codeStr.includes(q) || arabicCodeStr.includes(q) || guestName.includes(q);
    }
    return true;
  });

  const rowKeys = Array.from(new Set(levelSeats.map((s) => s.row))).sort();

  // Quick-add a seat to a row
  const handleQuickAdd = (rowLabel) => {
    setAddSuccess('');
    setAddPanel({ row: rowLabel, level: activeLevel });
    // Auto-detect best sector (the one with fewest seats)
    const rowSeats = seats.filter(s => s.level === activeLevel && s.row === rowLabel);
    const counts = { left: 0, center: 0, right: 0 };
    rowSeats.forEach(s => { if (counts[s.sectorKey] !== undefined) counts[s.sectorKey]++; });
    const minSector = Object.entries(counts).sort((a,b) => a[1]-b[1])[0][0];
    setAddForm({ sectorKey: minSector, count: 1, autoRenumber: true });
  };

  const handleConfirmAdd = () => {
    if (!addPanel) return;
    setAddSaving(true);

    const result = addSeatsToRow(
      activeLevel,
      addPanel.row,
      addForm.sectorKey,
      addForm.count,
      addForm.autoRenumber
    );

    if (result.success) {
      if (onSeatsUpdated) onSeatsUpdated(result.seats);
      setAddSaving(false);
      const sectorObj = SECTORS.find(s => s.key === addForm.sectorKey);
      setAddSuccess(`✅ أُضيف ${result.addedCount} مقعد لقطاع ${sectorObj?.name || 'الوسط'} بالصف ${addPanel.row}`);
      setTimeout(() => {
        setAddPanel(null);
        setAddSuccess('');
      }, 1200);
    } else {
      setAddSaving(false);
      alert('حدث خطأ أثناء إضافة المقعد');
    }
  };


  // Seat to delete modal state
  const [seatToDeleteModal, setSeatToDeleteModal] = useState(null);
  const [autoRenumberOnDelete, setAutoRenumberOnDelete] = useState(true);

  // Direct seat deletion trigger
  const handleDeleteSeatDirect = (seat) => {
    if (seat.status !== 'available') {
      alert(`⚠️ لا يمكن إزالة هذا المقعد لأنه محجوز باسم: ${seat.guest?.name || 'ضيف'}. يجب إلغاء الحجز أولاً.`);
      return;
    }
    setSeatToDeleteModal(seat);
  };

  const confirmDeleteModalSeat = () => {
    if (!seatToDeleteModal) return;
    const seat = seatToDeleteModal;
    const code = formatArabicSeatCode(seat);
    const res = deleteSeat(seat.id);
    if (res.success) {
      let updatedSeats = res.seats;
      if (autoRenumberOnDelete) {
        updatedSeats = renumberAllSeats();
      }
      if (onSeatsUpdated) onSeatsUpdated(updatedSeats);
      setActionNotice(`✅ تم إزالة المقعد (${code}) بنجاح`);
      setTimeout(() => setActionNotice(''), 3500);
      setSeatToDeleteModal(null);
    } else {
      alert(res.message);
    }
  };

  // Renumber all seats
  const handleRenumberAll = () => {
    if (confirm('هل ترغب في إعادة ترقيم جميع مقاعد المسرح تلقائياً بالتسلسل (01, 02, 03...) من اليسار لليمين؟')) {
      const updated = renumberAllSeats();
      if (onSeatsUpdated) onSeatsUpdated(updated);
      setActionNotice('✅ تمت إعادة ترقيم جميع المقاعد بنجاح');
      setTimeout(() => setActionNotice(''), 3000);
    }
  };



  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Action Notice Alert if any */}
      {actionNotice && (
        <div className="p-3.5 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl text-cyan-200 font-bold text-xs flex items-center justify-between animate-fade-in shadow-lg">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-cyan-300" />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice('')} className="text-white/60 hover:text-white text-xs">✕</button>
        </div>
      )}

      {/* Top Filter & Level Switcher Bar */}
      {isBeneficiaryView ? (
        /* Dedicated Clean Guest View Bar */
        <div className="glass-panel-luxury p-3 sm:p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 border border-white/15">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-amber-300 font-bold flex items-center gap-1.5">
              <Armchair className="w-3.5 h-3.5" />
              <span>اختر الدور:</span>
            </span>
            <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/15">
              <button
                type="button"
                onClick={() => setActiveLevel('G')}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeLevel === 'G'
                    ? 'bg-gradient-to-r from-[#00d2ff] to-[#7952b3] text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                الدور الأرضي ({seats.filter(s => s.level === 'G').length} مقعد)
              </button>
              <button
                type="button"
                onClick={() => setActiveLevel('B')}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeLevel === 'B'
                    ? 'bg-gradient-to-r from-[#00d2ff] to-[#7952b3] text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                الدور الثاني - البلكونة ({seats.filter(s => s.level === 'B').length} مقعد)
              </button>
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/15">
            <button
              type="button"
              onClick={() => setZoomScale((z) => Math.min(z + 0.15, 1.5))}
              className="p-1.5 rounded-lg text-white hover:text-amber-300"
              title="تكبير"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-amber-300 font-mono px-1">{Math.round(zoomScale * 100)}%</span>
            <button
              type="button"
              onClick={() => setZoomScale((z) => Math.max(z - 0.15, 0.65))}
              className="p-1.5 rounded-lg text-white hover:text-amber-300"
              title="تصغير"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomScale(1)}
              className="p-1.5 rounded-lg text-white hover:text-amber-300"
              title="إعادة ضبط الحجم"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Admin View Bar */
        <div className="glass-panel-luxury p-4 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Floor Switcher */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 w-full lg:w-auto">
            <button
              type="button"
              onClick={() => setActiveLevel('G')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
                activeLevel === 'G'
                  ? 'bg-gradient-to-l from-[#00d2ff] via-[#334b85] to-[#7952b3] text-white shadow-lg shadow-cyan-500/30'
                  : 'text-slate-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Armchair className="w-4 h-4" />
              <span>الدور الأرضي ({seats.filter(s=>s.level==='G').length} مقعد)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveLevel('B')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
                activeLevel === 'B'
                  ? 'bg-gradient-to-l from-[#00d2ff] via-[#334b85] to-[#7952b3] text-white shadow-lg shadow-cyan-500/30'
                  : 'text-slate-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Crown className="w-4 h-4 text-cyan-300" />
              <span>الدور الثاني - البلكونة ({seats.filter(s=>s.level==='B').length} مقعد)</span>
            </button>
          </div>

          {/* Action Tools: Delete Mode & Renumber */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDeleteMode(!deleteMode)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-black border transition-all ${
                deleteMode 
                  ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/40 animate-pulse' 
                  : 'bg-white/10 hover:bg-rose-500/20 text-rose-300 border-rose-400/30 hover:border-rose-400/60'
              }`}
              title="تفعيل وضع حذف وإزالة المقاعد بالنقر المباشر"
            >
              <Trash2 className="w-4 h-4" />
              <span>{deleteMode ? 'إيقاف وضع الحذف ✕' : 'وضع إزالة المقاعد 🗑'}</span>
            </button>

            <button
              type="button"
              onClick={handleRenumberAll}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold bg-white/10 hover:bg-white/20 text-cyan-200 border border-cyan-400/30 transition-all"
              title="إعادة ترتيب وترقيم جميع المقاعد من 01 تصاعدياً"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-300" />
              <span className="hidden sm:inline">إعادة ترقيم الكل</span>
            </button>
          </div>

          {/* Zoom Controls & Search */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            
            {/* Zoom Buttons */}
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md p-1 rounded-2xl border border-white/20">
              <button
                type="button"
                onClick={() => setZoomScale((z) => Math.min(z + 0.15, 1.5))}
                className="p-2 rounded-xl text-white hover:text-yellow-300 hover:bg-white/10"
                title="تكبير الخريطة"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <span className="text-[11px] text-yellow-300 font-mono px-1">{Math.round(zoomScale * 100)}%</span>
              <button
                type="button"
                onClick={() => setZoomScale((z) => Math.max(z - 0.15, 0.65))}
                className="p-2 rounded-xl text-white hover:text-yellow-300 hover:bg-white/10"
                title="تصغير الخريطة"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoomScale(1)}
                className="p-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10"
                title="إعادة الحجم الافتراضي"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Search */}
            <div className="relative flex-1 lg:w-64">
              <Search className="w-4 h-4 text-yellow-300 absolute right-3.5 top-3.5" />
              <input
                type="text"
                placeholder="ابحث باسم المدعو أو كود المقعد..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/15 backdrop-blur-md border border-white/30 focus:border-yellow-300 rounded-2xl pr-10 pl-8 py-2.5 text-xs text-white placeholder-slate-200 outline-none transition-all"
              />
              {searchQuery && (
                <button 
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-3 text-xs text-slate-300 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Status Filter Buttons */}
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md p-1 rounded-2xl border border-white/20 text-xs">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  statusFilter === 'all' ? 'bg-white/20 text-white shadow-md' : 'text-slate-200 hover:text-white'
                }`}
              >
                الكل
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('available')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  statusFilter === 'available' ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40' : 'text-slate-200 hover:text-emerald-300'
                }`}
              >
                متاح
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('reserved')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  statusFilter === 'reserved' ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/40' : 'text-slate-200 hover:text-cyan-300'
                }`}
              >
                محجوز
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('checked_in')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  statusFilter === 'checked_in' ? 'bg-purple-500/30 text-purple-200 border border-purple-400/40' : 'text-slate-200 hover:text-purple-300'
                }`}
              >
                تم الدخول
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Delete Mode Active Banner (Admin only) */}
      {!isBeneficiaryView && deleteMode && (
        <div className="p-3 bg-rose-500/20 border border-rose-400/50 rounded-2xl flex items-center justify-between text-xs text-rose-200 animate-pulse">
          <div className="flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-rose-400" />
            <span className="font-extrabold text-sm">وضع إزالة المقاعد نشط:</span>
            <span>انقر على أي مقعد متاح (أخضر) لإزالته نهائياً من المخطط. (المقاعد المحجوزة محمية من الحذف).</span>
          </div>
          <button
            type="button"
            onClick={() => setDeleteMode(false)}
            className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg font-bold"
          >
            إغلاق الوضع
          </button>
        </div>
      )}

      {/* Legend Indicator Bar */}
      {isBeneficiaryView ? (
        <div className="flex flex-wrap items-center justify-center gap-4 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs shadow-inner">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-gradient-to-b from-red-500 to-red-700 animate-pulse border-2 border-white shadow-lg shadow-red-500/80"></span>
            <span className="text-red-300 font-black">مقعدك المخصص (أحمر متوهج 🔴)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-white/20 border border-white/30"></span>
            <span className="text-slate-300 font-medium">باقي مقاعد المسرح</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-5 px-6 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs shadow-inner">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-md bg-gradient-to-b from-emerald-400 to-emerald-700 shadow-md shadow-emerald-500/30 border border-emerald-300/40"></span>
            <span className="text-white font-bold">متاح للحجز</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-md bg-gradient-to-b from-cyan-400 to-blue-700 shadow-md shadow-cyan-500/30 border border-cyan-300/40"></span>
            <span className="text-white font-bold">محجوز (تذكرة مجهزة)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-md bg-gradient-to-b from-purple-400 to-purple-800 shadow-md shadow-purple-500/30 border border-purple-300/40"></span>
            <span className="text-white font-bold">تم تسجيل الدخول</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-md bg-gradient-to-b from-red-500 to-red-700 animate-pulse border-2 border-white shadow-lg shadow-red-500/80"></span>
            <span className="text-red-300 font-extrabold">مقعد المستفيد (أحمر متوهج 🔴)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-black">+</span>
            <span className="text-emerald-300 font-bold">إضافة مقاعد للصف</span>
          </div>
          <div className="flex items-center gap-2 text-rose-300 font-medium">
            <span className="text-white/60">💡 تلميح:</span>
            <span>يمكنك أيضاً النقر بزر الفأرة الأيمن على أي مقعد متاح لحذفه مباشرة</span>
          </div>
        </div>
      )}

      {/* Main Theater Arena Container */}
      <div className="glass-panel-luxury p-3 sm:p-6 lg:p-8 rounded-3xl border-2 border-white/20 shadow-2xl relative w-full overflow-hidden">
        
        {/* Mobile Swipe Hint */}
        <div className="lg:hidden mb-3 flex items-center justify-center gap-1.5 text-[11px] text-cyan-300 font-bold bg-cyan-500/10 border border-cyan-400/20 py-1.5 px-3 rounded-xl select-none">
          <span>↔️ اسحب الخريطة أفقياً للتنقل بين المقاعد والأجنحة</span>
        </div>

        <div className="overflow-x-auto pb-4 custom-scrollbar">
          <div className="min-w-[920px] mx-auto">
            
            {/* Stage Screen */}
            <div className="mb-10 text-center relative">
              <div className="stage-spotlight max-w-2xl mx-auto py-3.5 px-10 rounded-b-3xl">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-lg font-black tracking-widest text-cyan-200 uppercase drop-shadow-md">
                    المسرح الرئيسي • STAGE
                  </span>
                </div>
                <div className="text-[10px] text-cyan-100 mt-0.5 tracking-widest font-mono">
                  {activeLevel === 'G' ? `الدور الأرضي - ${rowKeys.length} صفاً` : `الدور الثاني - ${rowKeys.length} صفوف`}
                </div>
              </div>
            </div>

            {/* Rows Grid with Zoom Transform */}
            <div 
              className="flex flex-col gap-2.5 transition-transform origin-top duration-300 items-center"
              style={{ transform: `scale(${zoomScale})` }}
            >
              {rowKeys.map((rowLabel) => {
                const rowSeats = levelSeats.filter((s) => s.row === rowLabel);
                
                const leftSector = rowSeats.filter((s) => s.sectorKey === 'left');
                const centerSector = rowSeats.filter((s) => s.sectorKey === 'center');
                const rightSector = rowSeats.filter((s) => s.sectorKey === 'right');

                const isAddOpen = addPanel?.row === rowLabel && addPanel?.level === activeLevel;

                return (
                  <div key={rowLabel}>
                    <div 
                      className="flex items-center justify-center gap-2 sm:gap-4 py-0.5 px-2 rounded-xl hover:bg-white/10 transition-all w-full"
                    >
                      
                      {/* Row Identifier Badge Right */}
                      <div className="w-7 h-7 rounded-lg bg-white/20 border border-white/40 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-lg backdrop-blur-md">
                        {rowLabel}
                      </div>

                      {/* Left Sector */}
                      <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md p-1.5 rounded-xl border border-white/20 shadow-inner flex-nowrap shrink-0">
                        {leftSector.map((seat) => (
                          <Seat3DButton 
                            key={seat.id} 
                            seat={seat} 
                            onClick={() => deleteMode ? handleDeleteSeatDirect(seat) : onSelectSeat(seat)}
                            onContextMenu={(e) => {
                              e.preventDefault();
                              if (seat.status === 'available') {
                                handleDeleteSeatDirect(seat);
                              }
                            }}
                            deleteMode={deleteMode}
                            isHighlighted={highlightSeatId === seat.id}
                            isFilteredOut={!filteredSeats.some(s => s.id === seat.id)}
                          />
                        ))}
                      </div>

                      {/* Sleek Aisle Pathway (Left <-> Center) */}
                      <div className="w-8 flex items-center justify-center shrink-0 self-stretch relative">
                        <div className="w-px h-full bg-gradient-to-b from-cyan-400/10 via-cyan-400/30 to-cyan-400/10"></div>
                        <div className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/50 border border-cyan-300/70 shadow-sm shadow-cyan-400/60"></div>
                      </div>

                      {/* Center Sector */}
                      <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md p-1.5 rounded-xl border border-cyan-400/30 shadow-lg flex-nowrap shrink-0">
                        {centerSector.map((seat) => (
                          <Seat3DButton 
                            key={seat.id} 
                            seat={seat} 
                            onClick={() => deleteMode ? handleDeleteSeatDirect(seat) : onSelectSeat(seat)}
                            onContextMenu={(e) => {
                              e.preventDefault();
                              if (seat.status === 'available') {
                                handleDeleteSeatDirect(seat);
                              }
                            }}
                            deleteMode={deleteMode}
                            isHighlighted={highlightSeatId === seat.id}
                            isFilteredOut={!filteredSeats.some(s => s.id === seat.id)}
                          />
                        ))}
                      </div>

                      {/* Sleek Aisle Pathway (Center <-> Right) */}
                      <div className="w-8 flex items-center justify-center shrink-0 self-stretch relative">
                        <div className="w-px h-full bg-gradient-to-b from-cyan-400/10 via-cyan-400/30 to-cyan-400/10"></div>
                        <div className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/50 border border-cyan-300/70 shadow-sm shadow-cyan-400/60"></div>
                      </div>

                      {/* Right Sector */}
                      <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md p-1.5 rounded-xl border border-white/20 shadow-inner flex-nowrap shrink-0">
                        {rightSector.map((seat) => (
                          <Seat3DButton 
                            key={seat.id} 
                            seat={seat} 
                            onClick={() => deleteMode ? handleDeleteSeatDirect(seat) : onSelectSeat(seat)}
                            onContextMenu={(e) => {
                              e.preventDefault();
                              if (seat.status === 'available') {
                                handleDeleteSeatDirect(seat);
                              }
                            }}
                            deleteMode={deleteMode}
                            isHighlighted={highlightSeatId === seat.id}
                            isFilteredOut={!filteredSeats.some(s => s.id === seat.id)}
                          />
                        ))}
                      </div>

                      {/* Row Identifier Badge Left */}
                      <div className="w-7 h-7 rounded-lg bg-white/20 border border-white/40 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-lg backdrop-blur-md">
                        {rowLabel}
                      </div>

                      {/* Quick Add Seats to Row Button */}
                      {!isBeneficiaryView && onSeatsUpdated && (
                        <button
                          type="button"
                          onClick={() => isAddOpen ? setAddPanel(null) : handleQuickAdd(rowLabel)}
                          title={`إضافة مقاعد جديدة إلى الصف (${rowLabel})`}
                          className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center transition-all shrink-0 ${
                            isAddOpen
                              ? 'bg-rose-500 text-white shadow-md'
                              : 'bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 border border-emerald-400/30 hover:scale-105'
                          }`}
                        >
                          {isAddOpen ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </button>
                      )}

                    </div>

                    {/* Inline Quick-Add Panel */}
                    {isAddOpen && (
                      <div className="mx-auto mt-1 mb-2 p-3 bg-emerald-500/10 border border-emerald-400/30 rounded-2xl flex flex-wrap items-center gap-3 max-w-2xl text-xs animate-fade-in shadow-xl">
                        <span className="text-emerald-300 font-black text-sm">+ الصف {rowLabel}</span>
                        
                        {/* Sector selector */}
                        <div className="flex items-center gap-1">
                          {SECTORS.map(s => (
                            <button
                              key={s.key}
                              onClick={() => setAddForm(f => ({ ...f, sectorKey: s.key }))}
                              className={`px-2.5 py-1 rounded-lg font-bold border transition-all ${
                                addForm.sectorKey === s.key
                                  ? 'bg-emerald-500/40 text-emerald-200 border-emerald-400/50 shadow'
                                  : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
                              }`}
                            >
                              {s.name}
                            </button>
                          ))}
                        </div>

                        {/* Count */}
                        <div className="flex items-center gap-2">
                          <span className="text-white/60 font-bold">العدد:</span>
                          <button
                            onClick={() => setAddForm(f => ({ ...f, count: Math.max(1, f.count - 1) }))}
                            className="w-6 h-6 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center justify-center font-black"
                          >−</button>
                          <span className="text-white font-black w-6 text-center">{addForm.count}</span>
                          <button
                            onClick={() => setAddForm(f => ({ ...f, count: Math.min(20, f.count + 1) }))}
                            className="w-6 h-6 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center justify-center font-black"
                          >+</button>
                        </div>

                        {/* Auto renumber checkbox */}
                        <label className="flex items-center gap-1.5 text-slate-200 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={addForm.autoRenumber}
                            onChange={(e) => setAddForm(f => ({ ...f, autoRenumber: e.target.checked }))}
                            className="accent-cyan-400 rounded"
                          />
                          <span className="text-[11px]">ترقيم تسلسلي تلقائي</span>
                        </label>

                        {/* Confirm */}
                        {addSuccess ? (
                          <span className="text-emerald-300 font-black">{addSuccess}</span>
                        ) : (
                          <button
                            onClick={handleConfirmAdd}
                            disabled={addSaving}
                            className="px-4 py-1.5 rounded-xl bg-gradient-to-l from-[#00d2ff] to-[#7952b3] text-white font-black shadow hover:scale-105 transition-all flex items-center gap-1.5"
                          >
                            <Save className="w-3.5 h-3.5" />
                            إضافة الآن
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      {/* Seat Deletion Confirmation Modal */}
      {seatToDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md glass-panel-luxury rounded-3xl p-6 shadow-2xl border border-rose-500/40 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-400 shadow-lg">
              <Trash2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-lg font-black text-white">
                تأكيد إزالة المقعد نهائياً
              </h3>
              <p className="text-cyan-300 font-black text-base mt-1">
                {formatArabicSeatCode(seatToDeleteModal)}
              </p>
              <p className="text-xs text-slate-300 mt-1">
                القطاع: {seatToDeleteModal.sector} • الكود: {seatToDeleteModal.id}
              </p>
            </div>

            <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-xs text-slate-300 text-right space-y-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoRenumberOnDelete}
                  onChange={(e) => setAutoRenumberOnDelete(e.target.checked)}
                  className="accent-cyan-400 rounded w-4 h-4"
                />
                <span className="text-white font-bold">إعادة ترقيم جميع مقاعد الصف تلقائياً بعد الحذف</span>
              </label>
              <p className="text-[11px] text-slate-400">
                سيتم حذف المقعد نهائياً وتحديث إجمالي مقاعد القاعة فوراً.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={confirmDeleteModalSeat}
                className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>نعم، إزالة المقعد</span>
              </button>
              <button
                onClick={() => setSeatToDeleteModal(null)}
                className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-xs border border-white/20 transition-all"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


/**
 * 3D Seat Button
 */
function Seat3DButton({ seat, onClick, onContextMenu, deleteMode, isHighlighted, isFilteredOut }) {
  let statusClass = 'seat-available';

  if (seat.status === 'reserved') {
    statusClass = 'seat-reserved';
  } else if (seat.status === 'checked_in') {
    statusClass = 'seat-checkedin';
  }

  if (isHighlighted) {
    statusClass = 'guest-seat-highlight';
  }

  if (isFilteredOut) {
    statusClass = 'bg-white/5 text-slate-400 border border-white/10 opacity-25 cursor-not-allowed';
  }

  // Delete mode style for available seats
  const isDeletable = deleteMode && seat.status === 'available';

  return (
    <div className="relative group inline-block shrink-0">
      <button
        onClick={onClick}
        onContextMenu={onContextMenu}
        disabled={isFilteredOut}
        className={`seat-3d w-7 h-7 sm:w-8 sm:h-8 flex flex-col items-center justify-center text-[10px] font-black transition-all relative ${statusClass} ${
          isDeletable ? '!border-rose-400 !bg-rose-600/60 hover:!bg-rose-600 hover:scale-110 !shadow-rose-500/50' : ''
        }`}
      >
        <span className="leading-none tracking-tight">{seat.number}</span>
        {isDeletable && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 text-white rounded-full flex items-center justify-center text-[8px] font-black shadow">
            ✕
          </span>
        )}
      </button>

      {/* Floating Hover Tooltip */}
      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-50 w-48 animate-fade-in">
        <div className="glass-panel-luxury text-slate-100 p-2.5 rounded-2xl border border-white/30 shadow-2xl text-[11px] w-full text-center space-y-1">
          <div className="font-black text-cyan-300 text-xs">
            {formatArabicSeatCode(seat)}
          </div>
          <div className="text-[10px] text-slate-200">
            القطاع: <strong className="text-white">{seat.sector}</strong>
          </div>
          {seat.guest ? (
            <div className="mt-1 pt-1 border-t border-white/20 text-emerald-300 font-bold truncate flex items-center justify-center gap-1">
              <UserCheck className="w-3.5 h-3.5" />
              <span>{seat.guest.name}</span>
            </div>
          ) : deleteMode ? (
            <div className="mt-1 text-rose-300 font-bold text-[10px] bg-rose-500/20 py-0.5 rounded-lg border border-rose-400/30">
              🗑 انقر لحذف هذا المقعد
            </div>
          ) : (
            <div className="space-y-0.5">
              <div className="mt-1 text-emerald-200 font-bold text-[10px] bg-emerald-500/20 py-0.5 rounded-lg border border-emerald-400/30">
                ✨ انقر للحجز
              </div>
              <div className="text-[9px] text-rose-300/80">
                (زر الفأرة الأيمن للإزالة)
              </div>
            </div>
          )}
        </div>
        <div className="w-2 h-2 bg-indigo-950 rotate-45 border-r border-b border-white/30 -mt-1"></div>
      </div>
    </div>
  );
}

