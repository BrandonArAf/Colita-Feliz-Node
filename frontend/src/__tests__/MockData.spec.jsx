import mockStore from '../lib/mockData.js';

describe('MockData Store', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada prueba
    localStorage.clear();
  });

  it('inicializa con datos por defecto', async () => {
    const servicios = await mockStore.getServicios();
    expect(servicios).toBeDefined();
    expect(servicios.length).toBeGreaterThan(0);
    expect(servicios[0]).toHaveProperty('id');
    expect(servicios[0]).toHaveProperty('nombre');
    expect(servicios[0]).toHaveProperty('precioDia');
  });

  it('crea un nuevo servicio', async () => {
    const nuevoServicio = {
      nombre: 'Servicio de Prueba',
      descripcion: 'Descripción de prueba',
      precioDia: 15000,
      adicional: 5000
    };

    const servicioCreado = await mockStore.createServicio(nuevoServicio);
    expect(servicioCreado.id).toBeDefined();
    expect(servicioCreado.nombre).toBe(nuevoServicio.nombre);
    expect(servicioCreado.precioDia).toBe(nuevoServicio.precioDia);
  });

  it('actualiza un servicio existente', async () => {
    const servicios = await mockStore.getServicios();
    const primerServicio = servicios[0];
    
    const actualizacion = { nombre: 'Nombre Actualizado' };
    const servicioActualizado = await mockStore.updateServicio(primerServicio.id, actualizacion);
    
    expect(servicioActualizado.nombre).toBe('Nombre Actualizado');
  });

  it('elimina un servicio', async () => {
    const servicios = await mockStore.getServicios();
    const cantidadInicial = servicios.length;
    
    const servicioEliminado = await mockStore.deleteServicio(servicios[0].id);
    expect(servicioEliminado).toBeDefined();
    
    const serviciosDespues = await mockStore.getServicios();
    expect(serviciosDespues.length).toBe(cantidadInicial - 1);
  });

  it('crea un registro con cálculos automáticos', async () => {
    const nuevoRegistro = {
      dueno: 'Juan Pérez',
      email: 'juan@email.com',
      telefono: '912345678',
      mascota: 'Max',
      raza: 'Golden Retriever',
      peso: 25.5,
      servicio_id: 'cuidado',
      ingreso: '2024-01-15',
      salida: '2024-01-17',
      comentarios: 'Mascota tranquila'
    };

    const registroCreado = await mockStore.createRegistro(nuevoRegistro);
    expect(registroCreado.id).toBeDefined();
    expect(registroCreado.dias).toBe(2);
    expect(registroCreado.subtotal).toBe(20000); // 2 días * 10000
    expect(registroCreado.total).toBe(20000);
  });

  it('persiste datos en localStorage', async () => {
    const servicios = await mockStore.getServicios();
    expect(localStorage.getItem('colita_feliz_data')).toBeTruthy();
    
    const datosGuardados = JSON.parse(localStorage.getItem('colita_feliz_data'));
    expect(datosGuardados.servicios).toBeDefined();
    expect(datosGuardados.registros).toBeDefined();
  });

  it('resetea datos a estado inicial', async () => {
    // Crear un servicio personalizado
    await mockStore.createServicio({
      nombre: 'Servicio Temporal',
      descripcion: 'Temporal',
      precioDia: 1000,
      adicional: 0
    });

    // Resetear datos
    await mockStore.resetData();

    // Verificar que se volvió al estado inicial
    const servicios = await mockStore.getServicios();
    expect(servicios.length).toBe(3); // Los 3 servicios iniciales
    expect(servicios.find(s => s.nombre === 'Servicio Temporal')).toBeUndefined();
  });

  it('maneja errores correctamente', async () => {
    try {
      await mockStore.updateServicio('id-inexistente', { nombre: 'Test' });
      fail('Debería haber lanzado un error');
    } catch (error) {
      expect(error.message).toContain('Servicio no encontrado');
    }
  });

  it('filtra registros por servicio', async () => {
    const registros = await mockStore.getRegistrosByServicio('cuidado');
    expect(Array.isArray(registros)).toBe(true);
  });

  it('filtra registros por rango de fechas', async () => {
    const registros = await mockStore.getRegistrosByDateRange('2024-01-01', '2024-12-31');
    expect(Array.isArray(registros)).toBe(true);
  });
});
