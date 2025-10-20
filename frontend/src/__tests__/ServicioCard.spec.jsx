import React from 'react';
import { createRoot } from 'react-dom/client';
import ServicioCard from '../components/ServicioCard.jsx';

describe('ServicioCard', () => {
  let container;
  let root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    if (root) {
      root.unmount();
    }
    document.body.removeChild(container);
  });

  it('renderiza correctamente con datos básicos', (done) => {
    const servicio = {
      id: 'test-1',
      nombre: 'Cuidado diario',
      descripcion: 'Servicio de cuidado básico',
      precioDia: 10000,
      adicional: 0
    };

    root.render(<ServicioCard s={servicio} />);
    
    setTimeout(() => {
      expect(container.textContent).toContain('Cuidado diario');
      expect(container.textContent).toContain('Servicio de cuidado básico');
      expect(container.textContent).toContain('$10.000');
      expect(container.textContent).toContain('Reservar Ahora');
      done();
    }, 0);
  });

  it('muestra precio adicional cuando existe', (done) => {
    const servicio = {
      id: 'test-2',
      nombre: 'Cuidado + Baño',
      descripcion: 'Incluye baño de salida',
      precioDia: 10000,
      adicional: 8000
    };

    root.render(<ServicioCard s={servicio} />);
    
    setTimeout(() => {
      expect(container.textContent).toContain('+$8.000');
      expect(container.textContent).toContain('adicional');
      done();
    }, 0);
  });

  it('muestra "-" cuando no hay precio adicional', (done) => {
    const servicio = {
      id: 'test-3',
      nombre: 'Cuidado básico',
      descripcion: 'Sin servicios adicionales',
      precioDia: 10000,
      adicional: 0
    };

    root.render(<ServicioCard s={servicio} />);
    
    setTimeout(() => {
      expect(container.textContent).toContain('-');
      expect(container.textContent).toContain('sin adicional');
      done();
    }, 0);
  });

  it('aplica icono correcto según el nombre del servicio', (done) => {
    const servicio = {
      id: 'test-4',
      nombre: 'Paseo canino',
      descripcion: 'Paseo de 30 minutos',
      precioDia: 5000,
      adicional: 0
    };

    root.render(<ServicioCard s={servicio} />);
    
    setTimeout(() => {
      // Verificar que se renderiza el componente (el icono específico se verifica por la clase CSS)
      expect(container.querySelector('.fa-walking')).toBeTruthy();
      done();
    }, 0);
  });

  it('maneja correctamente el formato de números chilenos', (done) => {
    const servicio = {
      id: 'test-5',
      nombre: 'Servicio premium',
      descripcion: 'Servicio de lujo',
      precioDia: 150000,
      adicional: 25000
    };

    root.render(<ServicioCard s={servicio} />);
    
    setTimeout(() => {
      expect(container.textContent).toContain('$150.000');
      expect(container.textContent).toContain('+$25.000');
      done();
    }, 0);
  });

  it('aplica clases de Bootstrap correctamente', (done) => {
    const servicio = {
      id: 'test-6',
      nombre: 'Servicio de prueba',
      descripcion: 'Descripción de prueba',
      precioDia: 10000,
      adicional: 0
    };

    root.render(<ServicioCard s={servicio} />);
    
    setTimeout(() => {
      expect(container.querySelector('.card')).toBeTruthy();
      expect(container.querySelector('.card-header')).toBeTruthy();
      expect(container.querySelector('.card-body')).toBeTruthy();
      expect(container.querySelector('.btn')).toBeTruthy();
      done();
    }, 0);
  });

  it('maneja diferentes tipos de servicios con iconos apropiados', (done) => {
    const servicios = [
      { nombre: 'Guardería', icono: 'fa-home' },
      { nombre: 'Paseo', icono: 'fa-walking' },
      { nombre: 'Baño', icono: 'fa-shower' },
      { nombre: 'Veterinario', icono: 'fa-stethoscope' }
    ];

    let completed = 0;
    servicios.forEach((servicio, index) => {
      const servicioData = {
        id: `test-${index}`,
        nombre: servicio.nombre,
        descripcion: 'Descripción',
        precioDia: 10000,
        adicional: 0
      };

      const testContainer = document.createElement('div');
      document.body.appendChild(testContainer);
      const testRoot = createRoot(testContainer);
      
      testRoot.render(<ServicioCard s={servicioData} />);
      
      setTimeout(() => {
        expect(testContainer.querySelector(`.${servicio.icono}`)).toBeTruthy();
        testRoot.unmount();
        document.body.removeChild(testContainer);
        completed++;
        if (completed === servicios.length) {
          done();
        }
      }, 0);
    });
  });
});
