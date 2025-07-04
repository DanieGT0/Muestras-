import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      // APIs existentes
      getSamples: () => Promise<any[]>
      createSample: (sample: any) => Promise<any>
      updateSample: (sample: any) => Promise<any>
      deleteSample: (id: number) => Promise<boolean>
      checkCodigo: (codigo: string, excludeId?: number) => Promise<boolean>
      
      // Nuevas APIs para movimientos
      processMovement: (sampleId: number, tipo: 'entrada' | 'salida', cantidad: number, motivo: string, responsable: string) => Promise<boolean>
      getMovements: () => Promise<any[]>
      getSampleMovements: (sampleId: number) => Promise<any[]>
    }
  }
}