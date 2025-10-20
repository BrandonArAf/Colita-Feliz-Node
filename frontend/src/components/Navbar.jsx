import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';

export default function Navbar(){
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-3">
          <div className="bg-primary text-white rounded-circle p-2">
            <i className="fas fa-paw"></i>
          </div>
          <div>
            <span className="fw-bold fs-4 text-primary">Colita Feliz</span>
            <div className="small text-muted">Guardería Canina</div>
          </div>
        </Link>
        
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#nav" 
          aria-controls="nav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink 
                className="nav-link fw-semibold px-3" 
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? '#0d6efd' : '#6c757d',
                  backgroundColor: isActive ? '#e7f1ff' : 'transparent',
                  borderRadius: '8px'
                })}
              >
                <i className="fas fa-home me-2"></i>Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link fw-semibold px-3" 
                to="/servicios"
                style={({ isActive }) => ({
                  color: isActive ? '#0d6efd' : '#6c757d',
                  backgroundColor: isActive ? '#e7f1ff' : 'transparent',
                  borderRadius: '8px'
                })}
              >
                <i className="fas fa-star me-2"></i>Servicios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link fw-semibold px-3" 
                to="/registro"
                style={({ isActive }) => ({
                  color: isActive ? '#0d6efd' : '#6c757d',
                  backgroundColor: isActive ? '#e7f1ff' : 'transparent',
                  borderRadius: '8px'
                })}
              >
                <i className="fas fa-paw me-2"></i>Registro
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link fw-semibold px-3" 
                to="/nosotros"
                style={({ isActive }) => ({
                  color: isActive ? '#0d6efd' : '#6c757d',
                  backgroundColor: isActive ? '#e7f1ff' : 'transparent',
                  borderRadius: '8px'
                })}
              >
                <i className="fas fa-users me-2"></i>Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link fw-semibold px-3" 
                to="/contacto"
                style={({ isActive }) => ({
                  color: isActive ? '#0d6efd' : '#6c757d',
                  backgroundColor: isActive ? '#e7f1ff' : 'transparent',
                  borderRadius: '8px'
                })}
              >
                <i className="fas fa-phone me-2"></i>Contacto
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link fw-semibold px-3" 
                to="/admin"
                style={({ isActive }) => ({
                  color: isActive ? '#dc3545' : '#6c757d',
                  backgroundColor: isActive ? '#f8d7da' : 'transparent',
                  borderRadius: '8px'
                })}
              >
                <i className="fas fa-cog me-2"></i>Admin
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
