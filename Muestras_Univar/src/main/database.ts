const sqlite3 = require('sqlite3').verbose()
import { dirname } from 'path'
import { mkdirSync, existsSync } from 'fs'

interface Sample {
  id?: number
  codigo: string
  producto: string
  cantidad: number
  pesoUnitario: number
  pesoTotal: number
  fechaVencimiento: string
  cantidadDisponible: number
}

interface Movement {
  id?: number
  sampleId: number
  tipo: 'entrada' | 'salida'
  cantidad: number
  motivo: string
  responsable: string
  fecha: string
  cantidadAnterior: number
  cantidadNueva: number
}

class Database {
  private db: any

  constructor(dbPath: string) {
    // Crear directorio si no existe
    const dir = dirname(dbPath)
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }
    
    this.db = new sqlite3.Database(dbPath)
    this.init()
  }

  private init(): void {
    // Tabla de muestras (actualizada)
    const samplesSql = `
      CREATE TABLE IF NOT EXISTS samples (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo TEXT UNIQUE NOT NULL,
        producto TEXT NOT NULL,
        cantidad INTEGER NOT NULL,
        cantidad_disponible INTEGER NOT NULL,
        peso_unitario REAL NOT NULL,
        peso_total REAL NOT NULL,
        fecha_vencimiento TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `
    
    // Nueva tabla de movimientos
    const movementsSql = `
      CREATE TABLE IF NOT EXISTS movements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sample_id INTEGER NOT NULL,
        tipo TEXT NOT NULL CHECK (tipo IN ('entrada', 'salida')),
        cantidad INTEGER NOT NULL,
        motivo TEXT NOT NULL,
        responsable TEXT NOT NULL,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        cantidad_anterior INTEGER NOT NULL,
        cantidad_nueva INTEGER NOT NULL,
        FOREIGN KEY (sample_id) REFERENCES samples (id) ON DELETE CASCADE
      )
    `
    
    this.db.run(samplesSql, (err: any) => {
      if (err) {
        console.error('Error creating samples table:', err)
      } else {
        console.log('Samples table initialized successfully')
      }
    })

    this.db.run(movementsSql, (err: any) => {
      if (err) {
        console.error('Error creating movements table:', err)
      } else {
        console.log('Movements table initialized successfully')
      }
    })

    // Migrar datos existentes si es necesario
    this.migrateExistingData()
  }

  private migrateExistingData(): void {
    // Verificar si necesitamos agregar la columna cantidad_disponible
    this.db.all("PRAGMA table_info(samples)", (err: any, columns: any[]) => {
      if (err) return

      const hasDisponibleColumn = columns.some(col => col.name === 'cantidad_disponible')
      
      if (!hasDisponibleColumn) {
        this.db.run("ALTER TABLE samples ADD COLUMN cantidad_disponible INTEGER DEFAULT 0", (err: any) => {
          if (!err) {
            // Actualizar cantidad_disponible = cantidad para registros existentes
            this.db.run("UPDATE samples SET cantidad_disponible = cantidad WHERE cantidad_disponible = 0")
          }
        })
      }
    })
  }

  getAllSamples(): Promise<Sample[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM samples ORDER BY id DESC', (err: any, rows: any[]) => {
        if (err) {
          reject(err)
        } else {
          const samples = rows.map(row => ({
            id: row.id,
            codigo: row.codigo,
            producto: row.producto,
            cantidad: row.cantidad,
            cantidadDisponible: row.cantidad_disponible || row.cantidad,
            pesoUnitario: row.peso_unitario,
            pesoTotal: row.peso_total,
            fechaVencimiento: row.fecha_vencimiento || ''
          }))
          resolve(samples)
        }
      })
    })
  }

  createSample(sample: Omit<Sample, 'id'>): Promise<Sample> {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO samples (codigo, producto, cantidad, cantidad_disponible, peso_unitario, peso_total, fecha_vencimiento)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `
      
      this.db.run(sql, [
        sample.codigo,
        sample.producto,
        sample.cantidad,
        sample.cantidad, // cantidad_disponible inicial = cantidad
        sample.pesoUnitario,
        sample.pesoTotal,
        sample.fechaVencimiento || null
      ], function(err: any) {
        if (err) {
          reject(err)
        } else {
          // Registrar movimiento de entrada inicial
          const movement = {
            sampleId: this.lastID,
            tipo: 'entrada' as const,
            cantidad: sample.cantidad,
            motivo: 'Registro inicial',
            responsable: 'Sistema',
            cantidadAnterior: 0,
            cantidadNueva: sample.cantidad
          }
          
          resolve({ id: this.lastID, ...sample, cantidadDisponible: sample.cantidad })
        }
      })
    })
  }

  updateSample(sample: Sample): Promise<Sample> {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE samples 
        SET codigo = ?, producto = ?, cantidad = ?, peso_unitario = ?, peso_total = ?, fecha_vencimiento = ?
        WHERE id = ?
      `
      
      this.db.run(sql, [
        sample.codigo,
        sample.producto,
        sample.cantidad,
        sample.pesoUnitario,
        sample.pesoTotal,
        sample.fechaVencimiento || null,
        sample.id
      ], (err: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(sample)
        }
      })
    })
  }

  deleteSample(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM samples WHERE id = ?', [id], (err: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    })
  }

  isCodigoAvailable(codigo: string, excludeId?: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT COUNT(*) as count FROM samples WHERE codigo = ?'
      let params: any[] = [codigo]
      
      if (excludeId) {
        sql += ' AND id != ?'
        params.push(excludeId)
      }
      
      this.db.get(sql, params, (err: any, row: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(row.count === 0)
        }
      })
    })
  }

  // Nuevos métodos para movimientos
  createMovement(movement: Omit<Movement, 'id' | 'fecha'>): Promise<Movement> {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO movements (sample_id, tipo, cantidad, motivo, responsable, cantidad_anterior, cantidad_nueva)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `
      
      this.db.run(sql, [
        movement.sampleId,
        movement.tipo,
        movement.cantidad,
        movement.motivo,
        movement.responsable,
        movement.cantidadAnterior,
        movement.cantidadNueva
      ], function(err: any) {
        if (err) {
          reject(err)
        } else {
          // Actualizar cantidad disponible en la muestra
          const updateSql = 'UPDATE samples SET cantidad_disponible = ? WHERE id = ?'
          this.db.run(updateSql, [movement.cantidadNueva, movement.sampleId], (updateErr: any) => {
            if (updateErr) {
              reject(updateErr)
            } else {
              resolve({
                id: this.lastID,
                ...movement,
                fecha: new Date().toISOString()
              })
            }
          })
        }
      })
    })
  }

  processSampleMovement(sampleId: number, tipo: 'entrada' | 'salida', cantidad: number, motivo: string, responsable: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Primero obtener la cantidad actual
      this.db.get('SELECT cantidad_disponible FROM samples WHERE id = ?', [sampleId], (err: any, row: any) => {
        if (err) {
          reject(err)
          return
        }

        if (!row) {
          reject(new Error('Muestra no encontrada'))
          return
        }

        const cantidadAnterior = row.cantidad_disponible
        let cantidadNueva: number

        if (tipo === 'entrada') {
          cantidadNueva = cantidadAnterior + cantidad
        } else {
          if (cantidadAnterior < cantidad) {
            reject(new Error(`No hay suficiente cantidad disponible. Disponible: ${cantidadAnterior}, Solicitado: ${cantidad}`))
            return
          }
          cantidadNueva = cantidadAnterior - cantidad
        }

        // Crear el movimiento
        this.createMovement({
          sampleId,
          tipo,
          cantidad,
          motivo,
          responsable,
          cantidadAnterior,
          cantidadNueva
        }).then(() => {
          resolve(true)
        }).catch(reject)
      })
    })
  }

  getAllMovements(): Promise<(Movement & { codigo: string, producto: string })[]> {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT 
          m.*,
          s.codigo,
          s.producto
        FROM movements m
        JOIN samples s ON m.sample_id = s.id
        ORDER BY m.fecha DESC
      `
      
      this.db.all(sql, (err: any, rows: any[]) => {
        if (err) {
          reject(err)
        } else {
          const movements = rows.map(row => ({
            id: row.id,
            sampleId: row.sample_id,
            tipo: row.tipo,
            cantidad: row.cantidad,
            motivo: row.motivo,
            responsable: row.responsable,
            fecha: row.fecha,
            cantidadAnterior: row.cantidad_anterior,
            cantidadNueva: row.cantidad_nueva,
            codigo: row.codigo,
            producto: row.producto
          }))
          resolve(movements)
        }
      })
    })
  }

  getMovementsBySample(sampleId: number): Promise<Movement[]> {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM movements WHERE sample_id = ? ORDER BY fecha DESC'
      
      this.db.all(sql, [sampleId], (err: any, rows: any[]) => {
        if (err) {
          reject(err)
        } else {
          const movements = rows.map(row => ({
            id: row.id,
            sampleId: row.sample_id,
            tipo: row.tipo,
            cantidad: row.cantidad,
            motivo: row.motivo,
            responsable: row.responsable,
            fecha: row.fecha,
            cantidadAnterior: row.cantidad_anterior,
            cantidadNueva: row.cantidad_nueva
          }))
          resolve(movements)
        }
      })
    })
  }
}

export default Database