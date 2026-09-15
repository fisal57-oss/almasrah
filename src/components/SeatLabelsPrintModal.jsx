import React, { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Printer, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function SeatLabelsPrintModal({ seats, eventDetails, onClose }) {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [printMode, setPrintMode] = useState('numbers_only');
  const [isPrinting, setIsPrinting] = useState(false);

  const printableSeats = seats.filter((seat) => {
    if (selectedLevel !== 'all' && seat.level !== selectedLevel) return false;
    if (selectedSector !== 'all' && seat.sectorKey !== selectedSector) return false;
    return true;
  });

  const baseUrl = window.location.origin + window.location.pathname;

  const handlePrint = () => {
    setIsPrinting(true);

    // Build stickers in rows of 3 using table for max print compatibility
    const COLS = 3;
    const rows = [];
    for (let i = 0; i < printableSeats.length; i += COLS) {
      rows.push(printableSeats.slice(i, i + COLS));
    }

    const tableRowsHtml = rows.map((row) => {
      const cells = row.map((seat) => {
        const codeStr = `${seat.row}-${seat.number}`;
        if (printMode === 'numbers_only') {
          return `<td class="cell">
            <div class="sticker">
              <div class="label">${seat.levelName} · ${seat.sector}</div>
              <div class="code">${codeStr}</div>
              <div class="seat-id">${seat.id}</div>
            </div>
          </td>`;
        } else {
          const qrText = `${baseUrl}?invitation=${seat.guest?.token || seat.id}`;
          const qrSvgStr = renderToStaticMarkup(
            <QRCodeSVG value={qrText} size={55} level="L" fgColor="#000000" bgColor="#ffffff" />
          );
          return `<td class="cell">
            <div class="sticker sticker-qr">
              <div class="sticker-header">
                <span class="theater-name">المسرح الرئيسي</span>
                <span class="code-badge">${codeStr}</span>
              </div>
              <div class="level-name">${seat.levelName}</div>
              <div class="code-sm">${codeStr}</div>
              <div class="sector-name">${seat.sector}</div>
              <div class="sticker-footer">
                <span class="seat-id">${seat.id}</span>
                <div class="qr-box">${qrSvgStr}</div>
              </div>
            </div>
          </td>`;
        }
      });
      // Pad incomplete rows
      while (cells.length < COLS) cells.push('<td class="cell cell-empty"></td>');
      return `<tr>${cells.join('')}</tr>`;
    }).join('');

    const printHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>ملصقات كراسي المسرح — ${printableSeats.length} مقعد</title>
  <style>
    @page { size: A4 portrait; margin: 8mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Arial', sans-serif;
      background: #ffffff;
      color: #000000;
      direction: rtl;
      width: 100%;
    }
    table.stickers-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 4mm;
      table-layout: fixed;
    }
    td.cell {
      width: 33.33%;
      vertical-align: top;
      padding: 0;
    }
    td.cell-empty { border: none !important; }
    .sticker {
      display: block;
      border: 2px solid #000000;
      border-radius: 6px;
      padding: 4mm 3mm;
      min-height: 26mm;
      text-align: center;
      page-break-inside: avoid;
      break-inside: avoid;
      width: 100%;
    }
    .sticker-qr {
      min-height: 38mm;
      padding: 3mm;
      text-align: right;
    }
    .label {
      font-size: 7pt;
      color: #333;
      font-weight: bold;
      margin-bottom: 2mm;
      text-align: center;
      display: block;
    }
    .code {
      font-size: 26pt;
      font-weight: 900;
      color: #000000;
      font-family: 'Courier New', monospace;
      letter-spacing: 0.05em;
      line-height: 1.1;
      display: block;
      text-align: center;
    }
    .code-sm {
      font-size: 18pt;
      font-weight: 900;
      color: #000000;
      font-family: 'Courier New', monospace;
      letter-spacing: 0.05em;
      line-height: 1.1;
      display: block;
      text-align: center;
      margin: 1mm 0;
    }
    .seat-id {
      font-size: 6pt;
      color: #666;
      font-family: monospace;
      display: block;
      margin-top: 1.5mm;
      text-align: center;
    }
    .sticker-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid #aaa;
      padding-bottom: 1mm;
      margin-bottom: 1.5mm;
    }
    .theater-name { font-size: 7pt; font-weight: bold; color: #333; }
    .code-badge {
      font-size: 7pt; font-weight: 900; color: #000;
      font-family: monospace;
      border: 1px solid #000; padding: 0.5mm 1.5mm; border-radius: 2px;
    }
    .level-name { font-size: 6.5pt; color: #555; display: block; }
    .sector-name { font-size: 7.5pt; font-weight: bold; color: #333; margin-top: 0.5mm; display: block; }
    .sticker-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      border-top: 1px solid #aaa;
      padding-top: 1.5mm;
      margin-top: 1.5mm;
    }
    .qr-box { line-height: 0; border: 1px solid #ccc; border-radius: 3px; }
    .qr-box svg { display: block; }
  </style>
</head>
<body>
  <table class="stickers-table">
    ${tableRowsHtml}
  </table>
</body>
</html>`;

    const printWindow = window.open('', '_blank', 'width=900,height=1100,scrollbars=yes');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(printHtml);
      printWindow.document.close();
      // Wait for content to render then print
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };
      // Fallback if onload doesn't fire
      setTimeout(() => {
        try { printWindow.focus(); printWindow.print(); } catch(e) {}
      }, 800);
    } else {
      alert('يرجى السماح بفتح النوافذ المنبثقة في المتصفح للطباعة');
    }

    setIsPrinting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:py-8 bg-indigo-950/70 backdrop-blur-xl overflow-y-auto">
      
      <div className="relative w-full max-w-5xl my-2">
        
        {/* Top Control Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 glass-panel-luxury p-4 rounded-3xl border border-cyan-500/30 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00d2ff] to-[#7952b3] flex items-center justify-center text-white shadow-lg">
              <Printer className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">طباعة ملصقات وترقيم كراسي المسرح</h2>
              <p className="text-xs text-white/70">سيُفتح نافذة طباعة منفصلة بملصقات نظيفة على خلفية بيضاء</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            
            {/* Mode Switcher */}
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/20 text-xs">
              <button
                onClick={() => setPrintMode('numbers_only')}
                className={`px-3 py-1.5 rounded-lg font-black transition-all ${
                  printMode === 'numbers_only'
                    ? 'bg-gradient-to-l from-[#00d2ff] via-[#334b85] to-[#7952b3] text-white shadow-md'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                أرقام فقط (A-01)
              </button>
              <button
                onClick={() => setPrintMode('with_qr')}
                className={`px-3 py-1.5 rounded-lg font-black transition-all ${
                  printMode === 'with_qr'
                    ? 'bg-gradient-to-l from-[#00d2ff] via-[#334b85] to-[#7952b3] text-white shadow-md'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                شامل مع الـ QR
              </button>
            </div>

            {/* Filter Floor */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 text-xs text-white outline-none"
            >
              <option value="all" className="bg-indigo-950 text-white">كافة الأدوار (746 مقعد)</option>
              <option value="G" className="bg-indigo-950 text-white">الدور الأرضي (542 مقعد)</option>
              <option value="B" className="bg-indigo-950 text-white">الدور الثاني - البلكونة (204 مقعد)</option>
            </select>

            {/* Filter Sector */}
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 text-xs text-white outline-none"
            >
              <option value="all" className="bg-indigo-950 text-white">جميع القطاعات</option>
              <option value="left" className="bg-indigo-950 text-white">قطاع اليسار</option>
              <option value="center" className="bg-indigo-950 text-white">قطاع الوسط</option>
              <option value="right" className="bg-indigo-950 text-white">قطاع اليمين</option>
            </select>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              disabled={isPrinting}
              className="px-5 py-2 rounded-xl bg-gradient-to-l from-[#00d2ff] via-[#334b85] to-[#7952b3] text-white font-extrabold text-xs shadow-lg shadow-cyan-500/30 hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-wait"
            >
              <Printer className="w-4 h-4 text-white" />
              <span>{isPrinting ? 'جاري التحضير...' : `طباعة الملصقات (${printableSeats.length} مقعد)`}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preview Grid (screen only — first 36 seats) */}
        <div className="glass-panel-luxury p-6 rounded-3xl border border-white/20 shadow-2xl">
          
          <div className="pb-3 mb-4 border-b border-white/20 flex items-center justify-between text-xs text-white/70">
            <span>
              معاينة — النمط: <strong className="text-cyan-300">{printMode === 'numbers_only' ? 'أرقام فقط (A-01)' : 'شامل مع QR'}</strong> · عدد المقاعد: <strong className="text-white">{printableSeats.length}</strong>
            </span>
            <span className="font-mono text-cyan-300">
              ~{Math.ceil(printableSeats.length / (printMode === 'numbers_only' ? 18 : 12))} صفحة A4
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {printableSeats.map((seat) => {
              const codeStr = `${seat.row}-${seat.number}`;
              return (
                <div
                  key={seat.id}
                  className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-white flex flex-col items-center justify-center shadow-lg hover:border-cyan-400/50 transition-all text-center"
                  style={{ minHeight: '90px' }}
                >
                  <span className="text-[8px] text-white/60 font-bold mb-1">
                    {seat.levelName} · {seat.sector}
                  </span>
                  <h2 className="text-xl font-black text-cyan-300 tracking-wider font-mono">
                    {codeStr}
                  </h2>
                  <span className="text-[7px] font-mono text-white/40 mt-1">
                    {seat.id}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
