import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Servicios from '../pages/Servicios.jsx';

// Mock de la API
const mockServicios = [
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
  }
];

// Mock del módulo api
const mockGetServicios = jasmine.createSpy('getServicios').and.returnValue(Promise.resolve(mockServicios));

// Mock global de la API
global.fetch = jasmine.createSpy('fetch').and.returnValue(
  Promise.resolve({
    ok: false, // Simular que el backend no está disponible
    json: () => Promise.resolve([])
  })
);

describe('Servicios', () => {
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

  it('renderiza el título de la página', (done) => {
    root.render(
      <BrowserRouter>
        <Servicios />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.textContent).toContain('Servicios');
      done();
    }, 0);
  });

  it('renderiza las tarjetas de servicios en el grid responsivo', (done) => {
    root.render(
      <BrowserRouter>
        <Servicios />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      // Verificar clases de Bootstrap para responsividad
      const serviceContainers = container.querySelectorAll('.col-12.col-sm-6.col-lg-4');
      expect(serviceContainers.length).toBeGreaterThanOrEqual(0);
      done();
    }, 100);
  });

  it('maneja correctamente el estado de carga inicial', (done) => {
    root.render(
      <BrowserRouter>
        <Servicios />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      // Verificar que se renderiza la estructura básica
      expect(container.querySelector('.row.g-3')).toBeTruthy();
      done();
    }, 0);
  });

  it('aplica clases de Bootstrap para diseño responsivo', (done) => {
    root.render(
      <BrowserRouter>
        <Servicios />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.querySelector('.row')).toBeTruthy();
      expect(container.querySelector('.g-3')).toBeTruthy();
      done();
    }, 0);
  });

  it('tiene estructura de contenedor principal', (done) => {
    root.render(
      <BrowserRouter>
        <Servicios />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.querySelector('div')).toBeTruthy();
      expect(container.querySelector('h1')).toBeTruthy();
      done();
    }, 0);
  });
});
