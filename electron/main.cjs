const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1100,
    minHeight: 720,
    title: 'نظام حجز وإدارة مقاعد المسرح والفعاليات',
    backgroundColor: '#080E1A',
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true
    }
  });

  // Remove default top menu for cleaner UI
  Menu.setApplicationMenu(null);

  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
  const isBeneficiary = process.argv.includes('--beneficiary') || 
                        app.name.includes('المستفيد') || 
                        process.execPath.includes('BeneficiaryPortalApp') ||
                        path.basename(process.execPath).includes('Beneficiary');

  const queryParams = isBeneficiary ? '?mode=beneficiary' : '';

  if (isDev && process.env.ELECTRON_START_URL) {
    mainWindow.loadURL(isBeneficiary ? `${process.env.ELECTRON_START_URL}/beneficiary.html` : process.env.ELECTRON_START_URL);
  } else if (isDev) {
    mainWindow.loadURL(isBeneficiary ? 'http://localhost:3000/beneficiary.html' : 'http://localhost:3000');
  } else {
    const targetFile = isBeneficiary ? 'beneficiary.html' : 'index.html';
    mainWindow.loadFile(path.join(__dirname, `../dist/${targetFile}`));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show();
  });

  // Open external links in default system browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
