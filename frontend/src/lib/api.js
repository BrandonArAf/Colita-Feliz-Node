import mockStore from './mockData.js';

const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4001';

// Función para verificar si el backend está disponible
async function isBackendAvailable() {
  try {
    const response = await fetch(`${BASE}/api/servicios`, { 
      method: 'HEAD',
      signal: AbortSignal.timeout(2000) // Timeout de 2 segundos
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// API híbrida: intenta backend primero, fallback a datos simulados
export async function getServicios(){
  try {
    if (await isBackendAvailable()) {
      const res = await fetch(`${BASE}/api/servicios`);
      if (res.ok) {
        return await res.json();
      }
    }
  } catch (error) {
    console.warn('Backend no disponible, usando datos simulados:', error.message);
  }
  
  // Fallback a datos simulados
  return await mockStore.getServicios();
}

export async function getRegistros(){
  try {
    if (await isBackendAvailable()) {
      const res = await fetch(`${BASE}/api/registros`);
      if (res.ok) {
        return await res.json();
      }
    }
  } catch (error) {
    console.warn('Backend no disponible, usando datos simulados:', error.message);
  }
  
  // Fallback a datos simulados
  return await mockStore.getRegistros();
}

export async function crearRegistro(payload){
  try {
    if (await isBackendAvailable()) {
      const res = await fetch(`${BASE}/api/registros`, { 
        method:'POST', 
        headers:{'Content-Type':'application/json'}, 
        body: JSON.stringify(payload) 
      });
      if (res.ok) {
        return await res.json();
      }
    }
  } catch (error) {
    console.warn('Backend no disponible, usando datos simulados:', error.message);
  }
  
  // Fallback a datos simulados
  return await mockStore.createRegistro(payload);
}

export async function eliminarRegistro(id){
  try {
    if (await isBackendAvailable()) {
      const res = await fetch(`${BASE}/api/registros/${id}`, { method:'DELETE' });
      if (res.ok) {
        return await res.json();
      }
    }
  } catch (error) {
    console.warn('Backend no disponible, usando datos simulados:', error.message);
  }
  
  // Fallback a datos simulados
  return await mockStore.deleteRegistro(id);
}

// Funciones adicionales para datos simulados
export async function getServicioById(id) {
  return await mockStore.getServicioById(id);
}

export async function createServicio(servicio) {
  return await mockStore.createServicio(servicio);
}

export async function updateServicio(id, updates) {
  return await mockStore.updateServicio(id, updates);
}

export async function deleteServicio(id) {
  return await mockStore.deleteServicio(id);
}

export async function getRegistroById(id) {
  return await mockStore.getRegistroById(id);
}

export async function updateRegistro(id, updates) {
  return await mockStore.updateRegistro(id, updates);
}

export async function getRegistrosByServicio(servicioId) {
  return await mockStore.getRegistrosByServicio(servicioId);
}

export async function getRegistrosByDateRange(fechaInicio, fechaFin) {
  return await mockStore.getRegistrosByDateRange(fechaInicio, fechaFin);
}

export async function resetMockData() {
  return await mockStore.resetData();
}
