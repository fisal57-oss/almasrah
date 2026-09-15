import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Camera, X, Flashlight, AlertTriangle, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function MobileCameraScannerModal({ isOpen, onClose, onScanSuccess }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [hasTorch, setHasTorch] = useState(false);
  const [manualCode, setManualCode] = useState('');
  
  const qrRegionId = 'mobile-qr-reader-region';
  const html5QrCodeRef = useRef(null);
  const videoTrackRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    setErrorMsg(null);
    setIsScanning(false);
    
    // Give DOM a tick to mount the div
    const timer = setTimeout(() => {
      startCamera();
    }, 200);

    return () => {
      clearTimeout(timer);
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    try {
      if (html5QrCodeRef.current) {
        await stopCamera();
      }

      const html5QrCode = new Html5Qrcode(qrRegionId, {
        formatsToSupport: [
          Html5QrcodeSupportedFormats.QR_CODE,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.EAN_13
        ],
        verbose: false
      });
      html5QrCodeRef.current = html5QrCode;

      const config = {
        fps: 15,
        qrbox: (viewfinderWidth, viewfinderHeight) => {
          const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
          const edgeSize = Math.floor(minEdge * 0.75);
          return { width: edgeSize, height: edgeSize };
        },
        aspectRatio: 1.0
      };

      await html5QrCode.start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          if (decodedText) {
            if (navigator.vibrate) {
              try { navigator.vibrate([100, 50, 100]); } catch (e) {}
            }
            onScanSuccess(decodedText);
            stopCamera();
            onClose();
          }
        },
        () => {
          // ignore frame scan errors
        }
      );

      setIsScanning(true);

      // Check for torch/flashlight capability
      try {
        const videoElement = document.querySelector(`#${qrRegionId} video`);
        if (videoElement && videoElement.srcObject) {
          const track = videoElement.srcObject.getVideoTracks()[0];
          if (track) {
            videoTrackRef.current = track;
            const capabilities = track.getCapabilities ? track.getCapabilities() : {};
            if (capabilities.torch) {
              setHasTorch(true);
            }
          }
        }
      } catch (e) {
        console.log('Torch check error', e);
      }

    } catch (err) {
      console.error('Camera init error:', err);
      let message = 'تعذر تشغيل كاميرا الجوال. يرجى التأكد من منح إذن الكاميرا للمتصفح.';
      if (err.name === 'NotAllowedError') {
        message = 'تم رفض إذن الكاميرا. يرجى تمكين الكاميرا في إعدادات المتصفح.';
      } else if (err.name === 'NotFoundError') {
        message = 'لم يتم العثور على كاميرا في هذا الجهاز.';
      }
      setErrorMsg(message);
      setIsScanning(false);
    }
  };

  const stopCamera = async () => {
    try {
      if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current.clear();
      }
    } catch (e) {
      console.warn('Camera stop warning:', e);
    }
    html5QrCodeRef.current = null;
    videoTrackRef.current = null;
    setIsScanning(false);
    setTorchOn(false);
  };

  const toggleTorch = async () => {
    if (!videoTrackRef.current) return;
    try {
      const nextState = !torchOn;
      await videoTrackRef.current.applyConstraints({
        advanced: [{ torch: nextState }]
      });
      setTorchOn(nextState);
    } catch (e) {
      console.warn('Torch toggle failed', e);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualCode.trim()) {
      onScanSuccess(manualCode.trim());
      setManualCode('');
      stopCamera();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fade-in" dir="rtl">
      
      {/* Container */}
      <div className="relative w-full max-w-md bg-[#0b162b] border-2 border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#071124] border-b border-cyan-500/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Camera className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">كاميرا مسح التذاكر</h3>
              <p className="text-[10px] text-cyan-300">وجه الكاميرا نحو باركود التذكرة</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasTorch && isScanning && (
              <button
                onClick={toggleTorch}
                className={`p-2 rounded-xl border transition-all ${
                  torchOn 
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-400/30' 
                    : 'bg-white/10 text-slate-300 border-white/10'
                }`}
                title="تشغيل الفلاش"
              >
                <Flashlight className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {
                stopCamera();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewfinder View */}
        <div className="relative flex-1 bg-black min-h-[300px] flex items-center justify-center overflow-hidden">
          
          <div id={qrRegionId} className="w-full h-full max-h-[360px]" />

          {/* Scanner Overlay graphics when scanning */}
          {isScanning && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="relative w-56 h-56 border-2 border-dashed border-cyan-400/80 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,210,255,0.4)]">
                {/* Laser animation line */}
                <div className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-pulse shadow-[0_0_10px_#00d2ff]" />
                
                {/* Corner Accents */}
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="absolute inset-0 bg-[#0b162b]/95 p-6 flex flex-col items-center justify-center text-center space-y-3 z-20">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <p className="text-xs text-rose-200 font-bold max-w-xs">{errorMsg}</p>
              <button
                onClick={startCamera}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black rounded-xl transition-all flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>إعادة المحاولة</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer with Manual Input fallback */}
        <div className="p-4 bg-[#071124] border-t border-cyan-500/20 space-y-3">
          <form onSubmit={handleManualSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="أو اكتب رقم المقعد (مثل A04)..."
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="flex-1 bg-white/5 border border-cyan-500/30 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 outline-none font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>تحضير</span>
            </button>
          </form>

          <p className="text-[10px] text-center text-slate-400">
            يدعم باركود التذكرة وQR الدعوات ورقم المقعد المباشر
          </p>
        </div>

      </div>
    </div>
  );
}
