export default function ServicioCard({ s }){
  const fmt = new Intl.NumberFormat('es-CL');
  
  const getServiceIcon = (nombre) => {
    const name = nombre.toLowerCase();
    if (name.includes('guardería') || name.includes('guarderia')) return 'fas fa-home';
    if (name.includes('paseo') || name.includes('walking')) return 'fas fa-walking';
    if (name.includes('juego') || name.includes('play')) return 'fas fa-gamepad';
    if (name.includes('baño') || name.includes('bano')) return 'fas fa-shower';
    if (name.includes('veterinario') || name.includes('vet')) return 'fas fa-stethoscope';
    return 'fas fa-paw';
  };

  const getServiceColor = (nombre) => {
    const name = nombre.toLowerCase();
    if (name.includes('guardería') || name.includes('guarderia')) return 'primary';
    if (name.includes('paseo') || name.includes('walking')) return 'success';
    if (name.includes('juego') || name.includes('play')) return 'warning';
    if (name.includes('baño') || name.includes('bano')) return 'info';
    if (name.includes('veterinario') || name.includes('vet')) return 'danger';
    return 'secondary';
  };

  const icon = getServiceIcon(s.nombre);
  const color = getServiceColor(s.nombre);

  return (
    <div className="card h-100 shadow-sm border-0" style={{transition: 'transform 0.3s ease'}}>
      <div className="card-header bg-light border-0">
        <div className="d-flex align-items-center">
          <div className={`bg-${color} text-white rounded-circle p-3 me-3`}>
            <i className={`${icon} fa-lg`}></i>
          </div>
          <div>
            <h5 className="card-title mb-0 text-primary fw-bold">{s.nombre}</h5>
            <small className="text-muted">Servicio especializado</small>
          </div>
        </div>
      </div>
      
      <div className="card-body d-flex flex-column">
        <p className="card-text text-muted mb-4">{s.descripcion}</p>
        
        <div className="mt-auto">
          <div className="row text-center mb-3">
            <div className="col-6">
              <div className="border-end">
                <div className="fw-bold text-success fs-4">${fmt.format(s.precioDia)}</div>
                <small className="text-muted">por día</small>
              </div>
            </div>
            <div className="col-6">
              {s.adicional ? (
                <>
                  <div className="fw-bold text-info fs-5">+${fmt.format(s.adicional)}</div>
                  <small className="text-muted">adicional</small>
                </>
              ) : (
                <>
                  <div className="fw-bold text-muted fs-5">-</div>
                  <small className="text-muted">sin adicional</small>
                </>
              )}
            </div>
          </div>
          
          <div className="d-grid">
            <button className={`btn btn-${color} btn-lg`}>
              <i className="fas fa-calendar-plus me-2"></i>
              Reservar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
