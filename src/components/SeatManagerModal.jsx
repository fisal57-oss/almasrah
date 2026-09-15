import React, { useState, useEffect } from 'react';
import { X, Plus, Save, RefreshCw, Sparkles, Info, Hash } from 'lucide-react';
import { getSeats, saveSeats, renumberAllSeats } from '../utils/storage';

const LEVELS = [
  { key: 'G', name: 'الدور الأرضي', levelName: 'الدور الأرضي' },
  { key: 'B', name: 'الدور الثاني - البلكونة', levelName: 'الدور الثاني - البلكونة' },
];

const SECTORS = [
  { key: 'left',   name: 'اليسار'  },
  { key: 'center', name: 'الوسط'   },
  { key: 'right',  name: 'اليمين'  },
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function SeatManagerModal({ seats, onClose, onSeatsUpdated }) {
  const [form, setForm] = useState({
    level: 'G',
    row: '',
    sectorKey: 'center',
    count: 6,
    appendMode: true,  // true = append after last seat in row, false = manual
    startNumber: 1,
  });
  const [bulkRows, setBulkRows] = useState('');
  const [mode, setMode] = useState('single');  // 'single' | 'bulk' | 'existing'
  const [preview, setPreview] = useState([]);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [renumbered, setRenumbered] = useState(false);

  // Get existing rows grouped by level
  const getRowsForLevel = (level) => {
    const levelSeats = seats.filter(s => s.level === level);
    const rowMap = {};
    levelSeats.forEach(s => {
      if (!rowMap[s.row]) rowMap[s.row] = { seats: [], sectors: {} };
      rowMap[s.row].seats.push(s);
      if (!rowMap[s.row].sectors[s.sectorKey]) rowMap[s.row].sectors[s.sectorKey] = 0;
      rowMap[s.row].sectors[s.sectorKey]++;
    });
    return rowMap;
  };

  const rowsForLevel = getRowsForLevel(form.level);
  const existingRowLetters = Object.keys(rowsForLevel).sort();

  // Get next seat number for a row+sector
  const getNextSeatNumber = (level, row, sectorKey) => {
    const rowSeats = seats.filter(s => s.level === level && s.row === row && s.sectorKey === sectorKey);
    if (rowSeats.length === 0) return 1;
    const maxNum = Math.max(...rowSeats.map(s => s.rawNumber || parseInt(s.number)));
    return maxNum + 1;
  };

  // When row or level or sector changes in append mode, auto-set startNumber
  useEffect(() => {
    if (form.appendMode && form.row) {
      const next = getNextSeatNumber(form.level, form.row.toUpperCase(), form.sectorKey);
      setForm(f => ({ ...f, startNumber: next }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.row, form.level, form.sectorKey, form.appendMode]);

  const buildPreview = () => {
    setError('');
    setSaved(false);
    const levelObj = LEVELS.find(l => l.key === form.level);
    const sectorObj = SECTORS.find(s => s.key === form.sectorKey);

    let rows = [];
    if (mode === 'bulk') {
      rows = bulkRows.split(',').map(r => r.trim().toUpperCase()).filter(r => ALPHABET.includes(r));
    } else if (mode === 'existing') {
      rows = existingRowLetters;
    } else {
      rows = form.row ? [form.row.toUpperCase()] : [];
    }

    if (rows.length === 0) {
      setError('يرجى إدخال حروف صفوف صحيحة أو اختيار صف');
      return;
    }

    const existing = getSeats();
    const timestamp = Date.now();
    const generated = [];

    rows.forEach((row, rowIdx) => {
      // If append mode, start from after the last seat in this row+sector
      const startNum = (mode === 'existing' || form.appendMode)
        ? getNextSeatNumber(form.level, row, form.sectorKey)
        : Number(form.startNumber);

      for (let i = 0; i < Number(form.count); i++) {
        const num = startNum + i;
        const nStr = String(num).padStart(2, '0');
        const tempId = `${form.level}-${row}-${form.sectorKey}-${timestamp}-${rowIdx}-${i}`;
        generated.push({
          id: tempId,
          level: form.level,
          levelName: levelObj.levelName,
          row,
          number: nStr,
          rawNumber: num,
          sector: sectorObj.name,
          sectorKey: form.sectorKey,
          status: 'available',
          guest: null,
          _duplicate: false,
        });
      }
    });

    setPreview(generated);
  };

  const handleSave = () => {
    const newSeats = preview.map(({ _duplicate, ...s }) => s);
    if (newSeats.length === 0) {
      setError('لا توجد مقاعد للإضافة');
      return;
    }
    const existing = getSeats();
    const merged = [...existing, ...newSeats];
    saveSeats(merged);
    const renumbered = renumberAllSeats();
    onSeatsUpdated(renumbered);
    setSaved(true);
    setRenumbered(true);
    setPreview([]);
    setError('');
  };

  const handleRenumber = () => {
    if (!window.confirm('هل تريد إعادة ترقيم جميع المقاعد من جديد؟\n\nسيتم ترقيم كل صف من 01 بالترتيب (يسار → وسط → يمين).\nبيانات الحجوزات ستُحفظ.')) return;
    const result = renumberAllSeats();
    onSeatsUpdated(result);
    setRenumbered(true);
    setSaved(false);
    setPreview([]);
  };

  const groundSeats = seats.filter(s => s.level === 'G');
  const balconySeats = seats.filter(s => s.level === 'B');
  const groundRows = [...new Set(groundSeats.map(s => s.row))].sort();
  const balconyRows = [...new Set(balconySeats.map(s => s.row))].sort();

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:py-6 bg-indigo-950/80 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-4xl my-2 space-y-4">

        {/* Header */}
        <div className="glass-panel-luxury p-5 rounded-3xl border border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00d2ff] to-[#7952b3] flex items-center justify-center shadow-lg">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">إضافة وإدارة مقاعد المسرح</h2>
              <p className="text-xs text-white/60">
                إضافة مقاعد لصفوف موجودة أو جديدة · الإجمالي: <strong className="text-cyan-300">{seats.length}</strong> مقعد
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add Seats Form */}
        <div className="glass-panel-luxury p-6 rounded-3xl border border-white/20 shadow-2xl">
          <h3 className="text-sm font-black text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            إضافة مقاعد جديدة
          </h3>

          {/* Mode switcher */}
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <button
              onClick={() => { setMode('existing'); setPreview([]); }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${mode === 'existing' ? 'bg-gradient-to-l from-[#00d2ff] via-[#334b85] to-[#7952b3] text-white shadow-md' : 'bg-white/10 text-white/70 hover:text-white border border-white/10'}`}
            >
              ✨ إضافة لكل الصفوف الموجودة
            </button>
            <button
              onClick={() => { setMode('single'); setPreview([]); }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${mode === 'single' ? 'bg-gradient-to-l from-[#00d2ff] via-[#334b85] to-[#7952b3] text-white shadow-md' : 'bg-white/10 text-white/70 hover:text-white border border-white/10'}`}
            >
              صف واحد
            </button>
            <button
              onClick={() => { setMode('bulk'); setPreview([]); }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${mode === 'bulk' ? 'bg-gradient-to-l from-[#00d2ff] via-[#334b85] to-[#7952b3] text-white shadow-md' : 'bg-white/10 text-white/70 hover:text-white border border-white/10'}`}
            >
              صفوف متعددة (حروف محددة)
            </button>
          </div>

          {/* A-Z Letter Picker — shown for single mode */}
          {mode === 'single' && (
            <div className="mb-5">
              <p className="text-[11px] text-white/50 font-bold mb-2 flex items-center gap-1">
                <Info className="w-3 h-3" />
                اختر حرف الصف — <span className="text-cyan-300">موجود</span> · <span className="text-emerald-300">جديد</span> · رمادي = غير متاح
              </p>
              <div className="flex flex-wrap gap-1.5">
                {ALPHABET.map(letter => {
                  const rowSeats = seats.filter(s => s.level === form.level && s.row === letter);
                  const exists = rowSeats.length > 0;
                  const isSelected = form.row === letter;
                  return (
                    <button
                      key={letter}
                      onClick={() => setForm(f => ({ ...f, row: letter, appendMode: exists }))}
                      title={exists ? `الصف ${letter}: ${rowSeats.length} مقعد` : `صف جديد ${letter}`}
                      className={`w-10 h-10 rounded-xl text-sm font-black border transition-all relative ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#00d2ff] to-[#7952b3] text-white border-cyan-300 shadow-lg shadow-cyan-500/30 scale-110'
                          : exists
                          ? 'bg-cyan-500/15 text-cyan-300 border-cyan-400/30 hover:bg-cyan-500/25 hover:scale-105'
                          : 'bg-white/5 text-white/40 border-white/10 hover:bg-emerald-500/15 hover:text-emerald-300 hover:border-emerald-400/30 hover:scale-105'
                      }`}
                    >
                      {letter}
                      {exists && (
                        <span className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-cyan-500 text-white text-[7px] flex items-center justify-center font-black">
                          {rowSeats.length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {form.row && (
                <div className={`mt-2 text-[11px] font-bold px-3 py-1.5 rounded-lg inline-block ${
                  form.appendMode
                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-400/20'
                    : 'bg-emerald-500/10 text-emerald-300 border border-emerald-400/20'
                }`}>
                  {form.appendMode
                    ? `✓ صف ${form.row} موجود · سيُضاف من رقم ${form.startNumber}`
                    : `✦ صف ${form.row} جديد · سيبدأ من رقم 01`
                  }
                </div>
              )}
            </div>
          )}

          {/* Form fields */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {/* Level */}
            <div>
              <label className="text-[11px] text-white/50 font-bold mb-1 block">الدور</label>
              <select
                value={form.level}
                onChange={e => setForm(f => ({ ...f, level: e.target.value, row: '' }))}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white outline-none"
              >
                {LEVELS.map(l => <option key={l.key} value={l.key} className="bg-indigo-950">{l.name}</option>)}
              </select>
            </div>

            {/* Row input removed — replaced by letter picker above for single mode */}

            {mode === 'bulk' && (
              <div>
                <label className="text-[11px] text-white/50 font-bold mb-1 block">الصفوف (مفصولة بفاصلة)</label>
                <input
                  type="text"
                  value={bulkRows}
                  onChange={e => setBulkRows(e.target.value.toUpperCase())}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white outline-none font-mono"
                  placeholder="A,B,C,V,W"
                />
              </div>
            )}

            {mode === 'existing' && (
              <div className="flex items-end">
                <div className="text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-400/20 rounded-xl px-3 py-2 w-full text-center">
                  سيُضاف لكل {existingRowLetters.length} صف موجود
                </div>
              </div>
            )}

            {/* Sector */}
            <div>
              <label className="text-[11px] text-white/50 font-bold mb-1 block">القطاع</label>
              <select
                value={form.sectorKey}
                onChange={e => setForm(f => ({ ...f, sectorKey: e.target.value }))}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white outline-none"
              >
                {SECTORS.map(s => <option key={s.key} value={s.key} className="bg-indigo-950">{s.name}</option>)}
              </select>
            </div>

            {/* Count */}
            <div>
              <label className="text-[11px] text-white/50 font-bold mb-1 block">عدد المقاعد المضافة</label>
              <input
                type="number"
                min={1}
                max={50}
                value={form.count}
                onChange={e => setForm(f => ({ ...f, count: e.target.value }))}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white outline-none"
              />
            </div>

            {/* Start number - only show when not in append mode */}
            {!form.appendMode && mode !== 'existing' && (
              <div>
                <label className="text-[11px] text-white/50 font-bold mb-1 block">رقم البداية</label>
                <input
                  type="number"
                  min={1}
                  value={form.startNumber}
                  onChange={e => setForm(f => ({ ...f, startNumber: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white outline-none"
                />
              </div>
            )}

            {/* Show auto start info when in append mode */}
            {form.appendMode && form.row && mode === 'single' && (
              <div className="flex items-end">
                <div className="text-[11px] text-emerald-300 bg-emerald-500/10 border border-emerald-400/20 rounded-xl px-3 py-2 w-full">
                  سيبدأ من رقم <strong>{form.startNumber}</strong> (بعد آخر مقعد في الصف)
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="mb-4 px-4 py-2 bg-red-500/20 border border-red-400/30 rounded-xl text-xs text-red-300 font-bold">
              ⚠️ {error}
            </div>
          )}

          {saved && (
            <div className="mb-4 px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 rounded-xl text-xs text-emerald-300 font-bold">
              ✅ تم حفظ المقاعد الجديدة بنجاح! يمكنك الآن إعادة الترقيم إن أردت.
            </div>
          )}

          {renumbered && (
            <div className="mb-4 px-4 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-xl text-xs text-cyan-300 font-bold">
              🔢 تم إعادة ترقيم جميع المقاعد بنجاح!
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={buildPreview}
              className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs border border-white/20 transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              معاينة المقاعد
            </button>
            {preview.filter(s => !s._duplicate).length > 0 && (
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-gradient-to-l from-[#00d2ff] via-[#334b85] to-[#7952b3] text-white font-extrabold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                إضافة {preview.filter(s => !s._duplicate).length} مقعد
              </button>
            )}
            {/* Renumber Button */}
            <button
              onClick={handleRenumber}
              className="px-5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-extrabold text-xs border border-amber-400/30 transition-all flex items-center gap-2 mr-auto"
            >
              <Hash className="w-4 h-4" />
              إعادة ترقيم كل المقاعد
            </button>
          </div>

          {/* Preview */}
          {preview.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-white/50 mb-2 font-bold">
                معاينة —{' '}
                <span className="text-emerald-300">{preview.filter(s => !s._duplicate).length} مقعد جديد</span>
                {preview.some(s => s._duplicate) && (
                  <span className="text-amber-300 mr-2">· {preview.filter(s => s._duplicate).length} موجود مسبقاً (سيُتجاهل)</span>
                )}
              </p>
              <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-2 bg-white/5 rounded-2xl">
                {preview.map(s => (
                  <span
                    key={s.id}
                    className={`px-2 py-1 rounded-lg text-xs font-mono font-bold ${
                      s._duplicate
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                    }`}
                  >
                    {s.level}-{s.row}-{s.number}
                    {s._duplicate && ' ⚠'}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Existing Seats Overview */}
        <div className="glass-panel-luxury p-6 rounded-3xl border border-white/20 shadow-2xl">
          <h3 className="text-sm font-black text-white mb-4">الصفوف الحالية وعدد المقاعد</h3>

          {/* Ground Floor */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-lg bg-gradient-to-l from-[#00d2ff]/20 to-[#7952b3]/20 border border-cyan-400/30 text-cyan-300 text-xs font-black">
                الدور الأرضي — {groundSeats.length} مقعد ({groundRows.length} صف)
              </span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {groundRows.map(row => {
                const rowSeats = groundSeats.filter(s => s.row === row);
                const leftCount = rowSeats.filter(s => s.sectorKey === 'left').length;
                const centerCount = rowSeats.filter(s => s.sectorKey === 'center').length;
                const rightCount = rowSeats.filter(s => s.sectorKey === 'right').length;
                return (
                  <div key={row} className="bg-white/5 border border-white/10 rounded-xl p-2 text-center hover:border-cyan-400/30 transition-all">
                    <div className="text-sm font-black text-white font-mono">{row}</div>
                    <div className="text-[9px] text-white/40 mt-1">{rowSeats.length} مقعد</div>
                    <div className="flex justify-center gap-1 mt-1">
                      <span className="text-[7px] text-blue-300">{leftCount}</span>
                      <span className="text-[7px] text-white/30">·</span>
                      <span className="text-[7px] text-cyan-300">{centerCount}</span>
                      <span className="text-[7px] text-white/30">·</span>
                      <span className="text-[7px] text-purple-300">{rightCount}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Balcony */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-lg bg-gradient-to-l from-[#7952b3]/20 to-[#334b85]/20 border border-purple-400/30 text-purple-300 text-xs font-black">
                البلكونة — {balconySeats.length} مقعد ({balconyRows.length} صف)
              </span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {balconyRows.map(row => {
                const rowSeats = balconySeats.filter(s => s.row === row);
                const leftCount = rowSeats.filter(s => s.sectorKey === 'left').length;
                const centerCount = rowSeats.filter(s => s.sectorKey === 'center').length;
                const rightCount = rowSeats.filter(s => s.sectorKey === 'right').length;
                return (
                  <div key={row} className="bg-white/5 border border-white/10 rounded-xl p-2 text-center hover:border-purple-400/30 transition-all">
                    <div className="text-sm font-black text-white font-mono">{row}</div>
                    <div className="text-[9px] text-white/40 mt-1">{rowSeats.length} مقعد</div>
                    <div className="flex justify-center gap-1 mt-1">
                      <span className="text-[7px] text-blue-300">{leftCount}</span>
                      <span className="text-[7px] text-white/30">·</span>
                      <span className="text-[7px] text-cyan-300">{centerCount}</span>
                      <span className="text-[7px] text-white/30">·</span>
                      <span className="text-[7px] text-purple-300">{rightCount}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-[10px] text-white/30 mt-3 text-center">
            الأرقام الملونة: <span className="text-blue-300">يسار</span> · <span className="text-cyan-300">وسط</span> · <span className="text-purple-300">يمين</span>
          </p>
        </div>

      </div>
    </div>
  );
}
