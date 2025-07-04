import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import Database from './database'

let mainWindow: BrowserWindow
let database: Database

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.samples.crud')

  // Inicializar base de datos
  const dbPath = join(app.getPath('userData'), 'samples.db')
  database = new Database(dbPath)

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// IPC handlers existentes
ipcMain.handle('get-samples', async () => {
  try {
    return await database.getAllSamples()
  } catch (error) {
    console.error('Error getting samples:', error)
    throw error
  }
})

ipcMain.handle('create-sample', async (_, sample) => {
  try {
    return await database.createSample(sample)
  } catch (error) {
    console.error('Error creating sample:', error)
    throw error
  }
})

ipcMain.handle('update-sample', async (_, sample) => {
  try {
    return await database.updateSample(sample)
  } catch (error) {
    console.error('Error updating sample:', error)
    throw error
  }
})

ipcMain.handle('delete-sample', async (_, id) => {
  try {
    return await database.deleteSample(id)
  } catch (error) {
    console.error('Error deleting sample:', error)
    throw error
  }
})

ipcMain.handle('check-codigo', async (_, codigo, excludeId) => {
  try {
    return await database.isCodigoAvailable(codigo, excludeId)
  } catch (error) {
    console.error('Error checking codigo:', error)
    throw error
  }
})

// Nuevos IPC handlers para movimientos
ipcMain.handle('process-movement', async (_, sampleId, tipo, cantidad, motivo, responsable) => {
  try {
    return await database.processSampleMovement(sampleId, tipo, cantidad, motivo, responsable)
  } catch (error) {
    console.error('Error processing movement:', error)
    throw error
  }
})

ipcMain.handle('get-movements', async () => {
  try {
    return await database.getAllMovements()
  } catch (error) {
    console.error('Error getting movements:', error)
    throw error
  }
})

ipcMain.handle('get-sample-movements', async (_, sampleId) => {
  try {
    return await database.getMovementsBySample(sampleId)
  } catch (error) {
    console.error('Error getting sample movements:', error)
    throw error
  }
})