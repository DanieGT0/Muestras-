import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  // APIs existentes
  getSamples: () => ipcRenderer.invoke('get-samples'),
  createSample: (sample: any) => ipcRenderer.invoke('create-sample', sample),
  updateSample: (sample: any) => ipcRenderer.invoke('update-sample', sample),
  deleteSample: (id: number) => ipcRenderer.invoke('delete-sample', id),
  checkCodigo: (codigo: string, excludeId?: number) => ipcRenderer.invoke('check-codigo', codigo, excludeId),
  
  // Nuevas APIs para movimientos
  processMovement: (sampleId: number, tipo: 'entrada' | 'salida', cantidad: number, motivo: string, responsable: string) => 
    ipcRenderer.invoke('process-movement', sampleId, tipo, cantidad, motivo, responsable),
  getMovements: () => ipcRenderer.invoke('get-movements'),
  getSampleMovements: (sampleId: number) => ipcRenderer.invoke('get-sample-movements', sampleId)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}