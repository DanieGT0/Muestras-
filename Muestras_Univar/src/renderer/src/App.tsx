import React, { useState, useEffect } from 'react'

// Iconos SVG profesionales expandidos
const Icons = {
  Plus: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Edit: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Trash2: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Package: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Weight: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l-3-9m3 9l3-9" />
    </svg>
  ),
  Hash: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
    </svg>
  ),
  Database: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
    </svg>
  ),
  Chart: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  AlertTriangle: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ),
  CheckCircle: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  ChevronUp: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  ),
  ChevronDown: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  ),
  ChevronRight: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  X: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Refresh: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  // Nuevos iconos para movimientos
  TrendingDown: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
    </svg>
  ),
  TrendingUp: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  ArrowDownCircle: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
    </svg>
  ),
  ArrowUpCircle: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
    </svg>
  ),
  History: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Activity: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  User: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Filter: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
    </svg>
  )
}

interface Sample {
  id?: number
  codigo: string
  producto: string
  cantidad: number
  cantidadDisponible?: number
  pesoUnitario: number
  pesoTotal: number
  fechaVencimiento: string
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
  codigo?: string
  producto?: string
}

type SortOrder = 'asc' | 'desc'
type ActiveTab = 'crud' | 'dashboard' | 'movements'

const SamplesCRUDApp: React.FC = () => {
  const [samples, setSamples] = useState<Sample[]>([])
  const [movements, setMovements] = useState<Movement[]>([])
  const [activeTab, setActiveTab] = useState<ActiveTab>('crud')
  const [showForm, setShowForm] = useState(false)
  const [showMovementForm, setShowMovementForm] = useState(false)
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null)
  const [editingSample, setEditingSample] = useState<Sample | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [movementFilter, setMovementFilter] = useState<'all' | 'entrada' | 'salida'>('all')
  const [loading, setLoading] = useState(false)
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [formData, setFormData] = useState({
    codigo: '',
    producto: '',
    cantidad: '',
    pesoUnitario: '',
    pesoTotal: '',
    fechaVencimiento: ''
  })
  const [movementData, setMovementData] = useState({
    tipo: 'salida' as 'entrada' | 'salida',
    cantidad: '',
    motivo: '',
    responsable: ''
  })

  // Cargar datos al iniciar la aplicación
  useEffect(() => {
    loadSamples()
    if (activeTab === 'movements') {
      loadMovements()
    }
  }, [activeTab])

  const loadSamples = async () => {
    try {
      setLoading(true)
      const data = await window.api.getSamples()
      setSamples(data)
    } catch (error) {
      console.error('Error loading samples:', error)
      alert('Error al cargar las muestras')
    } finally {
      setLoading(false)
    }
  }

  const loadMovements = async () => {
    try {
      const data = await window.api.getMovements()
      setMovements(data)
    } catch (error) {
      console.error('Error loading movements:', error)
      alert('Error al cargar los movimientos')
    }
  }

  const resetForm = () => {
    setFormData({
      codigo: '',
      producto: '',
      cantidad: '',
      pesoUnitario: '',
      pesoTotal: '',
      fechaVencimiento: ''
    })
    setEditingSample(null)
    setShowForm(false)
  }

  const resetMovementForm = () => {
    setMovementData({
      tipo: 'salida',
      cantidad: '',
      motivo: '',
      responsable: ''
    })
    setSelectedSample(null)
    setShowMovementForm(false)
  }

  const handleSubmit = async () => {
    if (!formData.codigo || !formData.producto || !formData.cantidad || !formData.pesoUnitario) {
      alert('Por favor complete todos los campos requeridos')
      return
    }
    
    try {
      const isAvailable = await window.api.checkCodigo(formData.codigo, editingSample?.id)
      if (!isAvailable) {
        alert('El código ya está en uso. Elija otro código.')
        return
      }

      const sampleData = {
        codigo: formData.codigo,
        producto: formData.producto,
        cantidad: parseInt(formData.cantidad),
        pesoUnitario: parseFloat(formData.pesoUnitario),
        pesoTotal: parseFloat(formData.pesoTotal),
        fechaVencimiento: formData.fechaVencimiento
      }

      if (editingSample) {
        // Solo actualizar la muestra existente
        await window.api.updateSample({ ...sampleData, id: editingSample.id })
        alert('Muestra actualizada exitosamente')
      } else {
        // Crear nueva muestra (esto automáticamente registra la entrada inicial)
        const newSample = await window.api.createSample(sampleData)
        alert(`Muestra creada exitosamente. Se registró entrada inicial de ${sampleData.cantidad} unidades.`)
      }

      resetForm()
      loadSamples()
      // Si estamos en la pestaña de movimientos, actualizar también
      if (activeTab === 'movements') {
        loadMovements()
      }
    } catch (error) {
      console.error('Error saving sample:', error)
      alert('Error al guardar la muestra')
    }
  }

  const handleMovementSubmit = async () => {
    if (!selectedSample || !movementData.cantidad || !movementData.motivo || !movementData.responsable) {
      alert('Por favor complete todos los campos requeridos')
      return
    }

    const cantidad = parseInt(movementData.cantidad)
    const disponible = selectedSample.cantidadDisponible || selectedSample.cantidad

    if (movementData.tipo === 'salida' && cantidad > disponible) {
      alert(`No hay suficiente stock disponible. Disponible: ${disponible}`)
      return
    }

    try {
      await window.api.processMovement(
        selectedSample.id!,
        movementData.tipo,
        cantidad,
        movementData.motivo,
        movementData.responsable
      )

      resetMovementForm()
      loadSamples()
      if (activeTab === 'movements') {
        loadMovements()
      }
      alert('Movimiento registrado exitosamente')
    } catch (error) {
      console.error('Error processing movement:', error)
      alert('Error al procesar el movimiento: ' + (error as Error).message)
    }
  }

  const handleEdit = (sample: Sample) => {
    setFormData({
      codigo: sample.codigo,
      producto: sample.producto,
      cantidad: sample.cantidad.toString(),
      pesoUnitario: sample.pesoUnitario.toString(),
      pesoTotal: sample.pesoTotal.toString(),
      fechaVencimiento: sample.fechaVencimiento
    })
    setEditingSample(sample)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar esta muestra?')) {
      try {
        await window.api.deleteSample(id)
        loadSamples()
      } catch (error) {
        console.error('Error deleting sample:', error)
        alert('Error al eliminar la muestra')
      }
    }
  }

  const handleQuickMovement = (sample: Sample, tipo: 'entrada' | 'salida') => {
    setSelectedSample(sample)
    setMovementData({
      tipo,
      cantidad: '',
      motivo: tipo === 'salida' ? 'Consumo en laboratorio' : 'Reposición de stock',
      responsable: ''
    })
    setShowMovementForm(true)
  }

  const handleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
  }

  const filteredAndSortedSamples = samples
    .filter(sample =>
      sample.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.producto.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return (a.id || 0) - (b.id || 0)
      } else {
        return (b.id || 0) - (a.id || 0)
      }
    })

  const filteredMovements = movements.filter(movement => {
    if (movementFilter === 'all') return true
    return movement.tipo === movementFilter
  })

  // Paginación
  const totalPages = Math.ceil(filteredAndSortedSamples.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentSamples = filteredAndSortedSamples.slice(startIndex, endIndex)

  const totalMovementPages = Math.ceil(filteredMovements.length / itemsPerPage)
  const movementStartIndex = (currentPage - 1) * itemsPerPage
  const movementEndIndex = movementStartIndex + itemsPerPage
  const currentMovements = filteredMovements.slice(movementStartIndex, movementEndIndex)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (name === 'cantidad' || name === 'pesoUnitario') {
      const cantidad = name === 'cantidad' ? parseInt(value) || 0 : parseInt(formData.cantidad) || 0
      const pesoUnitario = name === 'pesoUnitario' ? parseFloat(value) || 0 : parseFloat(formData.pesoUnitario) || 0
      
      setFormData(prev => ({
        ...prev,
        pesoTotal: (cantidad * pesoUnitario).toFixed(2)
      }))
    }
  }

  // Funciones auxiliares para fechas
  const formatDateForInput = (dateString: string) => {
    if (!dateString) return ''
    const [day, month, year] = dateString.split('/')
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }

  const formatDateFromInput = (inputDate: string) => {
    if (!inputDate) return ''
    const [year, month, day] = inputDate.split('-')
    return `${day}/${month}/${year}`
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Funciones para el dashboard
  const getDashboardStats = () => {
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    
    const samplesWithDate = samples.filter(sample => sample.fechaVencimiento)
    const samplesWithoutDate = samples.filter(sample => !sample.fechaVencimiento)
    
    const expiringSoon = samplesWithDate.filter(sample => {
      if (!sample.fechaVencimiento) return false
      const [day, month, year] = sample.fechaVencimiento.split('/')
      const sampleDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      return sampleDate <= nextWeek && sampleDate >= today
    })

    const expired = samplesWithDate.filter(sample => {
      if (!sample.fechaVencimiento) return false
      const [day, month, year] = sample.fechaVencimiento.split('/')
      const sampleDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      return sampleDate < today
    })

    const lowStock = samples.filter(sample => {
      const disponible = sample.cantidadDisponible || sample.cantidad
      return disponible <= 2 && disponible > 0
    })

    const outOfStock = samples.filter(sample => {
      const disponible = sample.cantidadDisponible || sample.cantidad
      return disponible === 0
    })

    // Estadísticas de movimientos
    const lastWeekMovements = movements.filter(movement => {
      const movementDate = new Date(movement.fecha)
      const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
      return movementDate >= oneWeekAgo
    })

    return {
      total: samples.length,
      withDate: samplesWithDate.length,
      withoutDate: samplesWithoutDate.length,
      expiringSoon: expiringSoon.length,
      expired: expired.length,
      lowStock: lowStock.length,
      outOfStock: outOfStock.length,
      totalQuantity: samples.reduce((acc, sample) => acc + sample.cantidad, 0),
      totalWeight: samples.reduce((acc, sample) => acc + sample.pesoTotal, 0),
      totalAvailable: samples.reduce((acc, sample) => acc + (sample.cantidadDisponible || sample.cantidad), 0),
      weeklyMovements: lastWeekMovements.length,
      weeklyEntries: lastWeekMovements.filter(m => m.tipo === 'entrada').length,
      weeklyExits: lastWeekMovements.filter(m => m.tipo === 'salida').length
    }
  }

  const stats = getDashboardStats()

  const Pagination = ({ total, current }: { total: number, current: number }) => (
    <div className="flex items-center justify-between mt-6 px-4">
      <div className="text-sm text-gray-600">
        Mostrando {((current - 1) * itemsPerPage) + 1} a {Math.min(current * itemsPerPage, total)} de {total} elementos
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={current === 1}
          className="p-2 rounded-lg bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Icons.ChevronLeft />
        </button>
        
        {Array.from({ length: Math.ceil(total / itemsPerPage) }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              page === current
                ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white'
                : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(total / itemsPerPage)))}
          disabled={current === Math.ceil(total / itemsPerPage)}
          className="p-2 rounded-lg bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Icons.ChevronRight />
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header profesional */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg">
                <Icons.Package className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Sistema de Inventario Profesional
                </h1>
                <p className="text-gray-500 text-sm font-medium">
                  Control de existencias y movimientos avanzado
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  loadSamples()
                  if (activeTab === 'movements') loadMovements()
                }}
                disabled={loading}
                className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-colors duration-300 disabled:opacity-50"
                title="Actualizar datos"
              >
                <Icons.Refresh />
              </button>
              
              {activeTab === 'crud' && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white px-4 py-2.5 rounded-xl flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Icons.Plus />
                  <span className="font-semibold text-sm">Nueva Muestra</span>
                </button>
              )}
            </div>
          </div>

          {/* Navegación por pestañas profesional */}
          <div className="flex space-x-1 bg-gray-100/80 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveTab('crud')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === 'crud'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icons.Database />
              <span>Inventario</span>
            </button>
            <button
              onClick={() => setActiveTab('movements')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === 'movements'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icons.Activity />
              <span>Movimientos</span>
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === 'dashboard'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icons.Chart />
              <span>Dashboard</span>
            </button>
          </div>
        </div>

        {/* Alertas de stock bajo */}
        {(stats.lowStock > 0 || stats.outOfStock > 0) && (
          <div className="bg-gradient-to-r from-amber-50 to-red-50 border-l-4 border-amber-400 rounded-xl p-4">
            <div className="flex items-center">
              <Icons.AlertTriangle className="w-5 h-5 text-amber-600 mr-3" />
              <div>
                <h3 className="text-sm font-semibold text-amber-800">Alertas de Inventario</h3>
                <div className="text-sm text-amber-700 mt-1">
                  {stats.outOfStock > 0 && (
                    <span className="mr-4">🔴 {stats.outOfStock} muestras sin stock</span>
                  )}
                  {stats.lowStock > 0 && (
                    <span>🟡 {stats.lowStock} muestras con stock bajo</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contenido según la pestaña activa */}
        {activeTab === 'crud' ? (
          <>
            {/* Stats cards mejoradas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-gray-200/50 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{samples.length}</p>
                    <p className="text-sm font-medium text-gray-500">Total Muestras</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <Icons.Package className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-gray-200/50 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalAvailable}</p>
                    <p className="text-sm font-medium text-gray-500">Disponible</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-xl">
                    <Icons.CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-gray-200/50 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-orange-600">{stats.lowStock}</p>
                    <p className="text-sm font-medium text-gray-500">Stock Bajo</p>
                  </div>
                  <div className="p-2 bg-orange-100 rounded-xl">
                    <Icons.AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-gray-200/50 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
                    <p className="text-sm font-medium text-gray-500">Sin Stock</p>
                  </div>
                  <div className="p-2 bg-red-100 rounded-xl">
                    <Icons.TrendingDown className="w-5 h-5 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Search mejorado */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Icons.Search />
                </div>
                <input
                  type="text"
                  placeholder="Buscar por código o producto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/50 backdrop-blur-sm text-sm"
                />
              </div>
            </div>

            {/* Tabla con acciones profesionales */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
              {loading ? (
                <div className="text-center py-16">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
                  <p className="text-gray-600 mt-4 font-medium">Cargando muestras...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left">
                          <button 
                            onClick={handleSort}
                            className="flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            <Icons.Hash />
                            <span>ID</span>
                            {sortOrder === 'asc' ? <Icons.ChevronUp /> : <Icons.ChevronDown />}
                          </button>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Código</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Producto</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Stock Total</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Disponible</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Estado</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Vencimiento</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {currentSamples.map((sample, index) => {
                        const disponible = sample.cantidadDisponible || sample.cantidad
                        const stockStatus = disponible === 0 ? 'sin-stock' : disponible <= 2 ? 'stock-bajo' : 'stock-ok'
                        
                        return (
                          <tr key={sample.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                            <td className="px-4 py-3 text-sm font-bold text-gray-900">{sample.id}</td>
                            <td className="px-4 py-3">
                              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-lg text-xs font-bold">
                                {sample.codigo}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm font-semibold text-gray-900">{sample.producto}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-gray-900">{sample.cantidad}</td>
                            <td className="px-4 py-3 text-sm font-semibold">
                              <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                                stockStatus === 'sin-stock' ? 'bg-red-100 text-red-800' :
                                stockStatus === 'stock-bajo' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {disponible}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                stockStatus === 'sin-stock' ? 'bg-red-100 text-red-800' :
                                stockStatus === 'stock-bajo' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {stockStatus === 'sin-stock' ? 'Sin Stock' :
                                 stockStatus === 'stock-bajo' ? 'Stock Bajo' : 'Stock OK'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                              {sample.fechaVencimiento || (
                                <span className="text-gray-400 italic text-xs">Sin fecha</span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex space-x-1">
                                <button
                                  onClick={() => handleQuickMovement(sample, 'salida')}
                                  disabled={disponible === 0}
                                  className="p-1.5 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                  title="Dar de baja"
                                >
                                  <Icons.ArrowDownCircle />
                                </button>
                                <button
                                  onClick={() => handleQuickMovement(sample, 'entrada')}
                                  className="p-1.5 text-green-600 hover:text-green-900 hover:bg-green-100 rounded-lg transition-all duration-200"
                                  title="Agregar stock"
                                >
                                  <Icons.ArrowUpCircle />
                                </button>
                                <button
                                  onClick={() => handleEdit(sample)}
                                  className="p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-all duration-200"
                                  title="Editar"
                                >
                                  <Icons.Edit />
                                </button>
                                <button
                                  onClick={() => handleDelete(sample.id!)}
                                  className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                                  title="Eliminar"
                                >
                                  <Icons.Trash2 />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              
              {currentSamples.length === 0 && !loading && (
                <div className="text-center py-12">
                  <Icons.Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-medium">No hay muestras registradas</p>
                  <p className="text-gray-400 text-sm mt-1">Comienza agregando tu primera muestra</p>
                </div>
              )}

              {filteredAndSortedSamples.length > 0 && (
                <Pagination total={filteredAndSortedSamples.length} current={currentPage} />
              )}
            </div>
          </>
        ) : activeTab === 'movements' ? (
          <>
            {/* Filtros de movimientos */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Icons.Filter className="w-5 h-5 text-gray-600" />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setMovementFilter('all')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        movementFilter === 'all'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Todos
                    </button>
                    <button
                      onClick={() => setMovementFilter('entrada')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        movementFilter === 'entrada'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Entradas
                    </button>
                    <button
                      onClick={() => setMovementFilter('salida')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        movementFilter === 'salida'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Salidas
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {filteredMovements.length} movimientos
                </div>
              </div>
            </div>

            {/* Tabla de movimientos */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Fecha</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Tipo</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Código</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Producto</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Cantidad</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Stock Anterior</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Stock Nuevo</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Motivo</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Responsable</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentMovements.map((movement, index) => (
                      <tr key={movement.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {formatDateTime(movement.fecha)}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                            movement.tipo === 'entrada'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {movement.tipo === 'entrada' ? (
                              <><Icons.ArrowUpCircle className="w-3 h-3 mr-1" /> Entrada</>
                            ) : (
                              <><Icons.ArrowDownCircle className="w-3 h-3 mr-1" /> Salida</>
                            )}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-bold">
                            {movement.codigo}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {movement.producto}
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-gray-900">
                          {movement.tipo === 'entrada' ? '+' : '-'}{movement.cantidad}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {movement.cantidadAnterior}
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-gray-900">
                          {movement.cantidadNueva}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {movement.motivo}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {movement.responsable}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {currentMovements.length === 0 && (
                <div className="text-center py-12">
                  <Icons.Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-medium">No hay movimientos registrados</p>
                  <p className="text-gray-400 text-sm mt-1">Los movimientos aparecerán aquí cuando realices entradas o salidas</p>
                </div>
              )}

              {filteredMovements.length > 0 && (
                <Pagination total={filteredMovements.length} current={currentPage} />
              )}
            </div>
          </>
        ) : (
          /* Dashboard profesional */
          <div className="space-y-6">
            {/* Estadísticas principales del dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-semibold uppercase tracking-wide">Total Muestras</p>
                    <p className="text-3xl font-bold mt-2">{stats.total}</p>
                  </div>
                  <Icons.Package className="w-10 h-10 text-blue-200" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-semibold uppercase tracking-wide">Stock Disponible</p>
                    <p className="text-3xl font-bold mt-2">{stats.totalAvailable}</p>
                  </div>
                  <Icons.CheckCircle className="w-10 h-10 text-green-200" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-100 text-sm font-semibold uppercase tracking-wide">Movimientos Semanales</p>
                    <p className="text-3xl font-bold mt-2">{stats.weeklyMovements}</p>
                  </div>
                  <Icons.Activity className="w-10 h-10 text-amber-200" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm font-semibold uppercase tracking-wide">Alertas</p>
                    <p className="text-3xl font-bold mt-2">{stats.lowStock + stats.outOfStock}</p>
                  </div>
                  <Icons.AlertTriangle className="w-10 h-10 text-red-200" />
                </div>
              </div>
            </div>

            {/* Análisis detallado */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Resumen de inventario */}
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <Icons.Package className="w-6 h-6 text-indigo-600 mr-3" />
                  Estado del Inventario
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                    <span className="font-semibold text-gray-700">Total de Muestras:</span>
                    <span className="font-bold text-blue-600 text-lg">{stats.total}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                    <span className="font-semibold text-gray-700">Stock Disponible:</span>
                    <span className="font-bold text-green-600 text-lg">{stats.totalAvailable} unidades</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-amber-50 rounded-xl">
                    <span className="font-semibold text-gray-700">Stock Bajo:</span>
                    <span className="font-bold text-amber-600 text-lg">{stats.lowStock} muestras</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                    <span className="font-semibold text-gray-700">Sin Stock:</span>
                    <span className="font-bold text-red-600 text-lg">{stats.outOfStock} muestras</span>
                  </div>
                </div>
              </div>

              {/* Actividad reciente */}
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <Icons.Activity className="w-6 h-6 text-indigo-600 mr-3" />
                  Actividad de la Semana
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                    <div className="flex items-center">
                      <Icons.ArrowUpCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="font-semibold text-gray-700">Entradas</span>
                    </div>
                    <span className="font-bold text-green-600 text-lg">{stats.weeklyEntries}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                    <div className="flex items-center">
                      <Icons.ArrowDownCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span className="font-semibold text-gray-700">Salidas</span>
                    </div>
                    <span className="font-bold text-red-600 text-lg">{stats.weeklyExits}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center">
                      <Icons.Activity className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="font-semibold text-gray-700">Total Movimientos</span>
                    </div>
                    <span className="font-bold text-blue-600 text-lg">{stats.weeklyMovements}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de formulario de muestra */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-2xl border border-gray-200 transform transition-all duration-300">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">
                  {editingSample ? 'Editar Muestra' : 'Nueva Muestra'}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Icons.X />
                </button>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Código *
                    </label>
                    <input
                      type="text"
                      name="codigo"
                      value={formData.codigo}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                      placeholder="M001"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Cantidad *
                    </label>
                    <input
                      type="number"
                      name="cantidad"
                      value={formData.cantidad}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                      placeholder="10"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Producto *
                  </label>
                  <input
                    type="text"
                    name="producto"
                    value={formData.producto}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                    placeholder="Nombre del producto"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Peso Unit. (kg) *
                    </label>
                    <input
                      type="number"
                      name="pesoUnitario"
                      value={formData.pesoUnitario}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                      step="0.01"
                      min="0"
                      placeholder="2.5"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Peso Total (kg)
                    </label>
                    <input
                      type="number"
                      name="pesoTotal"
                      value={formData.pesoTotal}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 text-sm"
                      readOnly
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Fecha de Vencimiento
                  </label>
                  <input
                    type="date"
                    name="fechaVencimiento"
                    value={formatDateForInput(formData.fechaVencimiento)}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      fechaVencimiento: formatDateFromInput(e.target.value)
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                  />
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white py-2.5 px-4 rounded-lg transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-xl"
                  >
                    {editingSample ? 'Actualizar' : 'Crear'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2.5 px-4 rounded-lg transition-all duration-300 font-semibold text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de movimiento profesional */}
        {showMovementForm && selectedSample && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg mx-4 shadow-2xl border border-gray-200 transform transition-all duration-300">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    movementData.tipo === 'entrada' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {movementData.tipo === 'entrada' ? (
                      <Icons.ArrowUpCircle className={`w-5 h-5 ${
                        movementData.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    ) : (
                      <Icons.ArrowDownCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {movementData.tipo === 'entrada' ? 'Agregar Stock' : 'Dar de Baja'}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {selectedSample.codigo} - {selectedSample.producto}
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetMovementForm}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Icons.X />
                </button>
              </div>
              
              <div className="p-4 space-y-4">
                {/* Información actual */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Stock Total:</span>
                      <span className="font-bold text-gray-900 ml-2">{selectedSample.cantidad}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Disponible:</span>
                      <span className="font-bold text-green-600 ml-2">
                        {selectedSample.cantidadDisponible || selectedSample.cantidad}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tipo de movimiento */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Tipo de Movimiento
                  </label>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setMovementData(prev => ({ 
                        ...prev, 
                        tipo: 'entrada',
                        motivo: 'Reposición de stock'
                      }))}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                        movementData.tipo === 'entrada'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-green-300'
                      }`}
                    >
                      <Icons.ArrowUpCircle className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-sm font-semibold">Entrada</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMovementData(prev => ({ 
                        ...prev, 
                        tipo: 'salida',
                        motivo: 'Consumo en laboratorio'
                      }))}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                        movementData.tipo === 'salida'
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-red-300'
                      }`}
                    >
                      <Icons.ArrowDownCircle className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-sm font-semibold">Salida</span>
                    </button>
                  </div>
                </div>

                {/* Cantidad */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Cantidad *
                  </label>
                  <input
                    type="number"
                    value={movementData.cantidad}
                    onChange={(e) => setMovementData(prev => ({ ...prev, cantidad: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                    placeholder="Cantidad a mover"
                    min="1"
                    max={movementData.tipo === 'salida' ? (selectedSample.cantidadDisponible || selectedSample.cantidad) : undefined}
                    required
                  />
                  {movementData.tipo === 'salida' && (
                    <p className="text-xs text-gray-500 mt-1">
                      Máximo disponible: {selectedSample.cantidadDisponible || selectedSample.cantidad}
                    </p>
                  )}
                </div>

                {/* Motivo */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Motivo *
                  </label>
                  <input
                    type="text"
                    value={movementData.motivo}
                    onChange={(e) => setMovementData(prev => ({ ...prev, motivo: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                    placeholder={movementData.tipo === 'entrada' ? 'Ej: Reposición de stock' : 'Ej: Consumo en laboratorio'}
                    required
                  />
                </div>

                {/* Responsable */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Responsable *
                  </label>
                  <input
                    type="text"
                    value={movementData.responsable}
                    onChange={(e) => setMovementData(prev => ({ ...prev, responsable: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                    placeholder="Nombre del responsable"
                    required
                  />
                </div>

                {/* Vista previa del resultado */}
                {movementData.cantidad && (
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Stock resultante:</span>
                      <span className="font-bold text-blue-600">
                        {movementData.tipo === 'entrada' 
                          ? (selectedSample.cantidadDisponible || selectedSample.cantidad) + parseInt(movementData.cantidad || '0')
                          : (selectedSample.cantidadDisponible || selectedSample.cantidad) - parseInt(movementData.cantidad || '0')
                        } unidades
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={handleMovementSubmit}
                    className={`flex-1 text-white py-2.5 px-4 rounded-lg transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-xl ${
                      movementData.tipo === 'entrada'
                        ? 'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800'
                        : 'bg-gradient-to-r from-red-600 to-pink-700 hover:from-red-700 hover:to-pink-800'
                    }`}
                  >
                    {movementData.tipo === 'entrada' ? 'Agregar Stock' : 'Dar de Baja'}
                  </button>
                  <button
                    type="button"
                    onClick={resetMovementForm}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2.5 px-4 rounded-lg transition-all duration-300 font-semibold text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SamplesCRUDApp