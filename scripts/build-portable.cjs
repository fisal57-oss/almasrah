const { packager } = require('@electron/packager');
const path = require('path');
const fs = require('fs');

async function buildPortable() {
  console.log('🚀 جاري بدء تحزيم البرنامج المحمول (Portable Desktop App)...');

  const srcDir = path.resolve(__dirname, '..');
  const outDir = path.resolve(srcDir, 'Portable-App-Build');

  // Clean old output folder if exists
  if (fs.existsSync(outDir)) {
    try {
      fs.rmSync(outDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
    } catch (e) {
      console.log('Notice: proceed with overwrite mode.');
    }
  }

  try {
    const appPaths = await packager({
      dir: srcDir,
      out: outDir,
      name: 'نظام حجز مقاعد المسرح',
      executableName: 'TheaterSeatsApp',
      platform: 'win32',
      arch: 'x64',
      overwrite: true,
      asar: true,
      prune: true,
      ignore: [
        /\.git($|\/)/,
        /dist-electron($|\/)/,
        /Portable-App($|\/)/,
        /src($|\/)/,
        /public($|\/)/,
        /node_modules\/@electron\/packager($|\/)/,
        /node_modules\/electron-builder($|\/)/,
        /node_modules\/vite($|\/)/,
        /node_modules\/@vitejs($|\/)/,
      ]
    });

    console.log('✅ تم إنشاء البرنامج المحمول بنجاح في:');
    console.log(appPaths[0]);
  } catch (err) {
    console.error('❌ حدث خطأ أثناء التحزيم:', err);
    process.exit(1);
  }
}

buildPortable();
