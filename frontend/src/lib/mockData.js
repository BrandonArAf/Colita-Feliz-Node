// Archivo de datos simulados con CRUD y persistencia local
class MockDataStore {
  constructor() {
    this.storageKey = 'colita_feliz_data';
    this.data = this.loadFromStorage();
  }

  // Cargar datos desde localStorage
  loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Error loading data from localStorage:', error);
    }
    
    // Datos iniciales si no hay nada almacenado
    return {
      servicios: [
        {
          id: 'cuidado',
          nombre: 'Cuidado diario',
          descripcion: 'Guardería con juegos, descanso y supervisión.',
          precioDia: 10000,
          adicional: 0
        },
        {
          id: 'paseo',
          nombre: 'Cuidado + Paseo',
          descripcion: 'Incluye 30–45 min de paseo guiado.',
          precioDia: 14000,
          adicional: 0
        },
        {
          id: 'bano',
          nombre: 'Cuidado + Baño',
          descripcion: 'Baño de salida + cuidado diario.',
          precioDia: 10000,
          adicional: 8000
        }
      ],
      registros: [
        {
          id: 1,
          dueno: 'María González',
          email: 'maria@email.com',
          telefono: '+56912345678',
          mascota: 'Max',
          raza: 'Golden Retriever',
          peso: 25.5,
          servicio_id: 'cuidado',
          ingreso: '2024-01-15',
          salida: '2024-01-17',
          dias: 2,
          subtotal: 20000,
          adicional: 0,
          total: 20000,
          comentarios: 'Mascota muy tranquila',
          created_at: '2024-01-10T10:00:00Z'
        },
        {
          id: 2,
          dueno: 'Carlos López',
          email: 'carlos@email.com',
          telefono: '+56987654321',
          mascota: 'Luna',
          raza: 'Border Collie',
          peso: 18.2,
          servicio_id: 'paseo',
          ingreso: '2024-01-20',
          salida: '2024-01-22',
          dias: 2,
          subtotal: 28000,
          adicional: 0,
          total: 28000,
          comentarios: 'Necesita ejercicio diario',
          created_at: '2024-01-18T14:30:00Z'
        }
      ]
    };
  }

  // Guardar datos en localStorage
  saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (error) {
      console.warn('Error saving data to localStorage:', error);
    }
  }

  // Simular delay de red
  async delay(ms = 100) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // CRUD para Servicios
  async getServicios() {
    await this.delay();
    return [...this.data.servicios];
  }

  async getServicioById(id) {
    await this.delay();
    return this.data.servicios.find(s => s.id === id) || null;
  }

  async createServicio(servicio) {
    await this.delay();
    const newServicio = {
      id: `servicio_${Date.now()}`,
      ...servicio,
      precioDia: servicio.precioDia || 0,
      adicional: servicio.adicional || 0
    };
    this.data.servicios.push(newServicio);
    this.saveToStorage();
    return newServicio;
  }

  async updateServicio(id, updates) {
    await this.delay();
    const index = this.data.servicios.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Servicio no encontrado');
    
    this.data.servicios[index] = { ...this.data.servicios[index], ...updates };
    this.saveToStorage();
    return this.data.servicios[index];
  }

  async deleteServicio(id) {
    await this.delay();
    const index = this.data.servicios.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Servicio no encontrado');
    
    const deleted = this.data.servicios.splice(index, 1)[0];
    this.saveToStorage();
    return deleted;
  }

  // CRUD para Registros
  async getRegistros() {
    await this.delay();
    return [...this.data.registros];
  }

  async getRegistroById(id) {
    await this.delay();
    return this.data.registros.find(r => r.id === id) || null;
  }

  async createRegistro(registro) {
    await this.delay();
    
    // Buscar el servicio para calcular precios
    const servicio = this.data.servicios.find(s => s.id === registro.servicio_id);
    if (!servicio) throw new Error('Servicio no encontrado');
    
    // Calcular fechas y precios
    const ingreso = new Date(registro.ingreso);
    const salida = new Date(registro.salida);
    const dias = Math.ceil((salida - ingreso) / (1000 * 60 * 60 * 24));
    
    const subtotal = servicio.precioDia * dias;
    const adicional = servicio.adicional || 0;
    const total = subtotal + adicional;
    
    const newRegistro = {
      id: this.data.registros.length > 0 ? Math.max(...this.data.registros.map(r => r.id)) + 1 : 1,
      ...registro,
      dias,
      subtotal,
      adicional,
      total,
      created_at: new Date().toISOString()
    };
    
    this.data.registros.push(newRegistro);
    this.saveToStorage();
    return newRegistro;
  }

  async updateRegistro(id, updates) {
    await this.delay();
    const index = this.data.registros.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Registro no encontrado');
    
    // Recalcular si cambió el servicio o las fechas
    if (updates.servicio_id || updates.ingreso || updates.salida) {
      const registro = { ...this.data.registros[index], ...updates };
      const servicio = this.data.servicios.find(s => s.id === registro.servicio_id);
      
      if (servicio) {
        const ingreso = new Date(registro.ingreso);
        const salida = new Date(registro.salida);
        const dias = Math.ceil((salida - ingreso) / (1000 * 60 * 60 * 24));
        
        registro.dias = dias;
        registro.subtotal = servicio.precioDia * dias;
        registro.adicional = servicio.adicional || 0;
        registro.total = registro.subtotal + registro.adicional;
      }
      
      this.data.registros[index] = registro;
    } else {
      this.data.registros[index] = { ...this.data.registros[index], ...updates };
    }
    
    this.saveToStorage();
    return this.data.registros[index];
  }

  async deleteRegistro(id) {
    await this.delay();
    const index = this.data.registros.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Registro no encontrado');
    
    const deleted = this.data.registros.splice(index, 1)[0];
    this.saveToStorage();
    return deleted;
  }

  // Métodos de utilidad
  async getRegistrosByServicio(servicioId) {
    await this.delay();
    return this.data.registros.filter(r => r.servicio_id === servicioId);
  }

  async getRegistrosByDateRange(fechaInicio, fechaFin) {
    await this.delay();
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    
    return this.data.registros.filter(r => {
      const fechaRegistro = new Date(r.ingreso);
      return fechaRegistro >= inicio && fechaRegistro <= fin;
    });
  }

}

// Crear instancia global del store
const mockStore = new MockDataStore();

export default mockStore;
