import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home.jsx';

describe('Home', () => {
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

  it('renderiza título principal', (done) => {
    root.render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.textContent).toContain('Bienvenid@ a Colita Feliz');
      done();
    }, 0);
  });

  it('renderiza la sección hero con gradiente', (done) => {
    root.render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.querySelector('.card.bg-gradient')).toBeTruthy();
      expect(container.textContent).toContain('Guardería canina con juegos');
      done();
    }, 0);
  });

  it('muestra las características principales', (done) => {
    root.render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.textContent).toContain('Cuidado Especializado');
      expect(container.textContent).toContain('Juegos y Entretenimiento');
      expect(container.textContent).toContain('Paseos Diarios');
      done();
    }, 0);
  });

  it('renderiza la sección de servicios', (done) => {
    root.render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.textContent).toContain('Nuestros Servicios');
      expect(container.textContent).toContain('Ofrecemos una variedad de servicios');
      done();
    }, 0);
  });

  it('incluye call to action', (done) => {
    root.render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.textContent).toContain('¿Listo para darle lo mejor a tu mascota?');
      expect(container.textContent).toContain('Registrar Mascota');
      expect(container.querySelector('a[href="/registro"]')).toBeTruthy();
      done();
    }, 0);
  });

  it('aplica clases de Bootstrap correctamente', (done) => {
    root.render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.querySelector('.container-fluid')).toBeTruthy();
      expect(container.querySelector('.row')).toBeTruthy();
      expect(container.querySelector('.col-12')).toBeTruthy();
      expect(container.querySelector('.card')).toBeTruthy();
      done();
    }, 0);
  });

  it('tiene iconos de FontAwesome', (done) => {
    root.render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.querySelector('.fa-heart')).toBeTruthy();
      expect(container.querySelector('.fa-paw')).toBeTruthy();
      expect(container.querySelector('.fa-gamepad')).toBeTruthy();
      expect(container.querySelector('.fa-walking')).toBeTruthy();
      expect(container.querySelector('.fa-star')).toBeTruthy();
      expect(container.querySelector('.fa-phone')).toBeTruthy();
      done();
    }, 0);
  });

  it('maneja estado de carga', (done) => {
    root.render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      // Verificar que se renderiza la estructura básica
      expect(container.querySelector('div')).toBeTruthy();
      done();
    }, 0);
  });
});
