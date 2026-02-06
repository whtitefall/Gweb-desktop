const { app, BrowserWindow, shell } = require('electron')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'
const devUrl = process.env.GRAPHNOTE_DEV_URL || 'http://localhost:5173'
const prodUrl = process.env.GRAPHNOTE_DESKTOP_URL || 'https://www.lettermessage.com'

function resolveStartUrl() {
  return isDev ? devUrl : prodUrl
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1480,
    height: 920,
    minWidth: 1200,
    minHeight: 760,
    title: 'GraphNote Desktop',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  })

  const startUrl = resolveStartUrl()
  win.loadURL(startUrl)

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  win.webContents.on('will-navigate', (event, url) => {
    const sameOrigin = url.startsWith('https://www.lettermessage.com') || url.startsWith('http://localhost:5173')
    if (!sameOrigin) {
      event.preventDefault()
      shell.openExternal(url)
    }
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
