import { useEffect, useState } from 'react';
import { getServicios, createServicio, updateServicio, deleteServicio } from '../lib/api.js';

export default function ServicioManager() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingServicio, setEditingServicio] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precioDia: 0,
    adicional: 0
  });

  useEffect(() => {
    loadServicios();
  }, []);

  const loadServicios = async () => {
    setLoading(true);
    try {
      const data = await getServicios();
      setServicios(data);
    } catch (error) {
      console.error('Error cargando servicios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingServicio) {
        await updateServicio(editingServicio.id, formData);
      } else {
        await createServicio(formData);
      }
      await loadServicios();
      setShowModal(false);
      setEditingServicio(null);
      setFormData({ nombre: '', descripcion: '', precioDia: 0, adicional: 0 });
    } catch (error) {
      console.error('Error guardando servicio:', error);
      alert('Error al guardar el servicio');
    }
  };

  const handleEdit = (servicio) => {
    setEditingServicio(servicio);
    setFormData({
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      precioDia: servicio.precioDia,
      adicional: servicio.adicional
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('¿Está seguro de eliminar este servicio?')) {
      try {
        await deleteServicio(id);
        await loadServicios();
      } catch (error) {
        console.error('Error eliminando servicio:', error);
        alert('Error al eliminar el servicio');
      }
    }
  };

  const resetForm = () => {
    setFormData({ nombre: '', descripcion: '', precioDia: 0, adicional: 0 });
    setEditingServicio(null);
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height: '50vh'}}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando servicios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-success text-white">
              <div className="row align-items-center">
                <div className="col">
                  <h1 className="mb-0">
                    <i className="fas fa-cogs me-2"></i>
                    Gestión de Servicios
                  </h1>
                  <p className="mb-0 opacity-75">Administrar servicios disponibles</p>
                </div>
                <div className="col-auto">
                  <button 
                    className="btn btn-light" 
                    onClick={() => setShowModal(true)}
                  >
                    <i className="fas fa-plus me-2"></i>
                    Nuevo Servicio
                  </button>
                </div>
              </div>
            </div>
            
            <div className="card-body p-4">
              <div className="row">
                {servicios.map(servicio => (
                  <div key={servicio.id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-header bg-light">
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="mb-0 text-primary">{servicio.nombre}</h5>
                          <div className="btn-group btn-group-sm">
                            <button 
                              className="btn btn-outline-primary"
                              onClick={() => handleEdit(servicio)}
                              title="Editar"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="btn btn-outline-danger"
                              onClick={() => handleDelete(servicio.id)}
                              title="Eliminar"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <p className="card-text text-muted">{servicio.descripcion}</p>
                        <div className="row text-center">
                          <div className="col-6">
                            <div className="fw-bold text-success fs-5">
                              ${new Intl.NumberFormat('es-CL').format(servicio.precioDia)}
                            </div>
                            <small className="text-muted">por día</small>
                          </div>
                          <div className="col-6">
                            {servicio.adicional > 0 ? (
                              <>
                                <div className="fw-bold text-info fs-6">
                                  +${new Intl.NumberFormat('es-CL').format(servicio.adicional)}
                                </div>
                                <small className="text-muted">adicional</small>
                              </>
                            ) : (
                              <>
                                <div className="fw-bold text-muted fs-6">-</div>
                                <small className="text-muted">sin adicional</small>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para crear/editar servicio */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{display: showModal ? 'block' : 'none'}} tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                <i className="fas fa-cog me-2"></i>
                {editingServicio ? 'Editar Servicio' : 'Nuevo Servicio'}
              </h5>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nombre del Servicio</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={formData.nombre}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Precio por Día</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={formData.precioDia}
                      onChange={(e) => setFormData({...formData, precioDia: parseInt(e.target.value) || 0})}
                      min="0"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Precio Adicional</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={formData.adicional}
                      onChange={(e) => setFormData({...formData, adicional: parseInt(e.target.value) || 0})}
                      min="0"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea 
                    className="form-control" 
                    rows="3"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={resetForm}
                >
                  <i className="fas fa-times me-2"></i>
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  <i className="fas fa-save me-2"></i>
                  {editingServicio ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Backdrop para modal */}
      {showModal && (
        <div className="modal-backdrop fade show"></div>
      )}
    </div>
  );
}
