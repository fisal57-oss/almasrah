import React from 'react';

export default function MiniHallStageMap({ 
  selectedSeat = null, 
  userSeatCode = 'F-12',
  interactive = false,
  onSeatClick = null,
  compact = false,
  showLegend = true
}) {
  // Generate visual curved seat grid matching the screenshots
  // Left block (purple/blue), Center block (cyan/gold), Right block (purple/blue)
  const leftRows = [
    [1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1]
  ];

  const centerRows = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 'MY_SEAT', 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ['VIP', 'VIP', 'VIP', 'VIP', 'VIP', 'VIP', 'VIP', 'VIP'],
    ['VIP', 'VIP', 'VIP', 'VIP', 'VIP', 'VIP', 'VIP', 'VIP']
  ];

  const rightRows = [
    [1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1]
  ];

  return (
    <div className="w-full flex flex-col items-center select-none" dir="rtl">
      {/* Curved Stage Header */}
      <div className="relative w-full max-w-[420px] flex flex-col items-center mb-4">
        <div className="w-[85%] h-8 bg-gradient-to-b from-[#182848] to-[#0d1b33] rounded-t-[45px] border-t-2 border-x border-amber-400/80 shadow-[0_0_15px_rgba(251,191,36,0.3)] flex items-center justify-center">
          <span className="text-[11px] font-black tracking-widest text-amber-300 uppercase">المسرح</span>
        </div>
        {/* Stage lighting aura */}
        <div className="w-3/4 h-2 bg-gradient-to-r from-transparent via-amber-300/40 to-transparent blur-[2px]" />
      </div>

      {/* Main Seating Blocks (Left - Center - Right) */}
      <div className="w-full max-w-[500px] flex items-center justify-between gap-2 sm:gap-3 px-2">
        
        {/* Left Sector (اليسار) */}
        <div className="flex-1 flex flex-col items-end gap-1">
          <div className="text-[9px] font-bold text-slate-400 mb-1 text-center w-full">اليسار</div>
          {leftRows.map((row, rIdx) => (
            <div key={`l-${rIdx}`} className="flex gap-1 justify-end">
              {row.map((_, cIdx) => {
                const isPurple = (rIdx + cIdx) % 2 === 0;
                return (
                  <div
                    key={`l-${rIdx}-${cIdx}`}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] transition-transform hover:scale-125 cursor-pointer ${
                      isPurple 
                        ? 'bg-[#8b5cf6] shadow-[0_0_5px_rgba(139,92,246,0.4)]' 
                        : 'bg-[#3b82f6]'
                    }`}
                    title={`قطاع اليسار - صف ${rIdx + 1}`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Center Sector (القاعة الرئيسية) */}
        <div className="flex-[1.8] flex flex-col items-center gap-1">
          <div className="text-[9px] font-bold text-cyan-300 mb-1 text-center w-full">القاعة الرئيسية</div>
          {centerRows.map((row, rIdx) => (
            <div key={`c-${rIdx}`} className="flex gap-1 justify-center">
              {row.map((cell, cIdx) => {
                if (cell === 'MY_SEAT') {
                  return (
                    <div
                      key={`c-${rIdx}-${cIdx}`}
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[3px] bg-amber-400 border-2 border-white shadow-[0_0_12px_rgba(251,191,36,0.9)] animate-pulse flex items-center justify-center text-[7px] text-slate-950 font-black cursor-pointer scale-110"
                      title={`مقعدك المخصص: ${userSeatCode || 'F-12'}`}
                    >
                      ★
                    </div>
                  );
                }
                if (cell === 'VIP') {
                  return (
                    <div
                      key={`c-${rIdx}-${cIdx}`}
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.5)] cursor-pointer hover:scale-125 transition-transform"
                      title={`كبار الشخصيات VIP - صف ${rIdx + 1}`}
                    />
                  );
                }
                const isCyan = (rIdx + cIdx) % 3 !== 0;
                return (
                  <div
                    key={`c-${rIdx}-${cIdx}`}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] transition-transform hover:scale-125 cursor-pointer ${
                      isCyan 
                        ? 'bg-[#00d2ff] shadow-[0_0_5px_rgba(0,210,255,0.4)]' 
                        : 'bg-[#1e40af]'
                    }`}
                    title={`القاعة الرئيسية - مقعد`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Right Sector (اليمين) */}
        <div className="flex-1 flex flex-col items-start gap-1">
          <div className="text-[9px] font-bold text-slate-400 mb-1 text-center w-full">اليمين</div>
          {rightRows.map((row, rIdx) => (
            <div key={`r-${rIdx}`} className="flex gap-1 justify-start">
              {row.map((_, cIdx) => {
                const isPurple = (rIdx + cIdx) % 2 === 0;
                return (
                  <div
                    key={`r-${rIdx}-${cIdx}`}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] transition-transform hover:scale-125 cursor-pointer ${
                      isPurple 
                        ? 'bg-[#8b5cf6] shadow-[0_0_5px_rgba(139,92,246,0.4)]' 
                        : 'bg-[#00d2ff]'
                    }`}
                    title={`قطاع اليمين - صف ${rIdx + 1}`}
                  />
                );
              })}
            </div>
          ))}
        </div>

      </div>

      {/* Rear Label */}
      <div className="text-[9px] font-bold text-slate-500 mt-2">الخلف</div>

      {/* Legend */}
      {showLegend && (
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-3 pt-2.5 border-t border-white/10 text-[10px] text-slate-300 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#00d2ff]" />
            <span>متاح</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#8b5cf6]" />
            <span>محجوز</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-amber-400 border border-white" />
            <span className="text-amber-300 font-bold">مقعدي</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-amber-500" />
            <span>VIP</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-600" />
            <span>غير متوفر</span>
          </div>
        </div>
      )}
    </div>
  );
}
