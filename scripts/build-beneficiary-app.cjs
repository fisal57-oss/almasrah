const { packager } = require('@electron/packager');
const path = require('path');
const fs = require('fs');

async function buildBeneficiaryApp() {
  console.log('🚀 جاري بدء تحزيم برنامج بوابة المستفيد والضيوف المحمول...');

  const srcDir = path.resolve(__dirname, '..');
  const outDir = path.resolve(srcDir, 'Portable-Beneficiary-App-Build');

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
      name: 'بوابة المستفيد والضيوف - مسرح التعليم',
      executableName: 'BeneficiaryPortalApp',
      platform: 'win32',
      arch: 'x64',
      overwrite: true,
      asar: true,
      prune: false,
      ignore: (file) => {
        if (!file) return false;
        const normalized = file.replace(/\\/g, '/');
        const parts = normalized.split('/').filter(Boolean);
        if (parts.length > 0) {
          const topFolder = parts[0];
          if ([
            'node_modules',
            '.git',
            '.venv',
            'src',
            'public',
            'dist-electron',
            'Portable-App-Build',
            'Portable-Beneficiary-App-Build'
          ].includes(topFolder)) {
            return true;
          }
        }
        return false;
      }
    });

    console.log('✅ تم إنشاء تطبيق بوابة المستفيد بنجاح في:');
    console.log(appPaths[0]);
  } catch (err) {
    console.error('❌ حدث خطأ أثناء تحزيم بوابة المستفيد:', err);
    process.exit(1);
  }
}

buildBeneficiaryApp();
