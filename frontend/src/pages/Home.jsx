import { useEffect, useState } from 'react';
import { getServicios } from '../lib/api.js';
import ServicioCard from '../components/ServicioCard.jsx';

export default function Home(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{ 
    (async()=> {
      try {
        const servicios = await getServicios();
        setItems(servicios);
      } catch (error) {
        console.error('Error cargando servicios:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="container-fluid">
      {/* Hero Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card bg-gradient text-white" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px'
          }}>
            <div className="card-body text-center py-5">
              <h1 className="display-4 fw-bold mb-3">
                <i className="fas fa-heart text-warning me-3"></i>
                Bienvenid@ a Colita Feliz
              </h1>
              <p className="lead fs-4 mb-4">
                🐕 Guardería canina con juegos, paseos y cuidado amoroso para tu mejor amigo
              </p>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="row text-center">
                    <div className="col-md-4 mb-3">
                      <i className="fas fa-paw fa-3x text-warning mb-2"></i>
                      <h5>Cuidado Especializado</h5>
                      <p className="small">Profesionales dedicados al bienestar de tu mascota</p>
                    </div>
                    <div className="col-md-4 mb-3">
                      <i className="fas fa-gamepad fa-3x text-warning mb-2"></i>
                      <h5>Juegos y Entretenimiento</h5>
                      <p className="small">Actividades divertidas para mantener a tu mascota activa</p>
                    </div>
                    <div className="col-md-4 mb-3">
                      <i className="fas fa-walking fa-3x text-warning mb-2"></i>
                      <h5>Paseos Diarios</h5>
                      <p className="small">Ejercicio regular para la salud física y mental</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Servicios Section */}
      <div className="row">
        <div className="col-12">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary mb-3">
              <i className="fas fa-star me-3"></i>
              Nuestros Servicios
            </h2>
            <p className="lead text-muted">
              Ofrecemos una variedad de servicios para el cuidado y bienestar de tu mascota
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{height: '50vh'}}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3 fs-5">Cargando servicios...</p>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {items.map(s => (
            <div key={s.id} className="col-12 col-sm-6 col-lg-4">
              <ServicioCard s={s} />
            </div>
          ))}
        </div>
      )}

      {/* Call to Action */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card bg-success text-white">
            <div className="card-body text-center py-4">
              <h3 className="mb-3">
                <i className="fas fa-phone me-2"></i>
                ¿Listo para darle lo mejor a tu mascota?
              </h3>
              <p className="lead mb-4">
                Regístrate ahora y dale a tu mejor amigo el cuidado que se merece
              </p>
              <a href="/registro" className="btn btn-warning btn-lg px-5">
                <i className="fas fa-paw me-2"></i>
                Registrar Mascota
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
