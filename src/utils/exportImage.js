import { toPng, toBlob } from 'html-to-image';
import html2canvas from 'html2canvas';

/**
 * High-fidelity PNG exporter designed specifically for Arabic typography.
 * Uses html-to-image (SVG foreignObject via native browser rendering) to preserve
 * Arabic ligatures, cursive joins, tashkeel, and fonts with 100% precision.
 * Falls back to html2canvas if foreignObject fails.
 */
export async function exportElementToPng(element, fileName = 'ticket.png', options = {}) {
  if (!element) return;

  // 1. Ensure web fonts (Cairo, Readex Pro, etc.) are fully loaded
  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  } catch (e) {
    console.warn('Font loading check skipped', e);
  }

  const {
    pixelRatio = 4,
    backgroundColor = null,
    onSuccess,
    onError
  } = options;

  try {
    // Primary method: Native browser rendering via html-to-image
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: pixelRatio,
      cacheBust: true,
      backgroundColor: backgroundColor,
      skipAutoScale: true,
      style: {
        transform: 'none',
        margin: '0 auto'
      }
    });

    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (onSuccess) onSuccess();
    return true;

  } catch (primaryErr) {
    console.warn('html-to-image primary export failed, falling back to html2canvas:', primaryErr);

    try {
      // Fallback: html2canvas with optimal Arabic/bidi settings
      const canvas = await html2canvas(element, {
        scale: pixelRatio,
        useCORS: true,
        backgroundColor: backgroundColor,
        logging: false,
        allowTaint: true
      });

      canvas.toBlob((blob) => {
        if (!blob) {
          if (onError) onError(new Error('Canvas blob generation failed'));
          return;
        }
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = fileName;
        link.href = blobUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
        if (onSuccess) onSuccess();
      }, 'image/png');

      return true;

    } catch (fallbackErr) {
      console.error('All image export methods failed:', fallbackErr);
      if (onError) onError(fallbackErr);
      throw fallbackErr;
    }
  }
}
