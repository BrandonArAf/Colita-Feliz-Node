import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

describe('Navbar', () => {
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

  it('renderiza el logo y nombre de la empresa', (done) => {
    root.render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.textContent).toContain('Colita Feliz');
      expect(container.textContent).toContain('Guardería Canina');
      done();
    }, 0);
  });

  it('renderiza todos los enlaces de navegación', (done) => {
    root.render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.textContent).toContain('Inicio');
      expect(container.textContent).toContain('Servicios');
      expect(container.textContent).toContain('Registro');
      expect(container.textContent).toContain('Nosotros');
      expect(container.textContent).toContain('Contacto');
      expect(container.textContent).toContain('Admin');
      done();
    }, 0);
  });

  it('aplica clases de Bootstrap correctamente', (done) => {
    root.render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.querySelector('.navbar')).toBeTruthy();
      expect(container.querySelector('.navbar-expand-lg')).toBeTruthy();
      expect(container.querySelector('.navbar-light')).toBeTruthy();
      expect(container.querySelector('.bg-white')).toBeTruthy();
      expect(container.querySelector('.shadow-sm')).toBeTruthy();
      expect(container.querySelector('.sticky-top')).toBeTruthy();
      done();
    }, 0);
  });

  it('incluye el botón toggler para dispositivos móviles', (done) => {
    root.render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      const toggler = container.querySelector('.navbar-toggler');
      expect(toggler).toBeTruthy();
      expect(toggler.getAttribute('data-bs-toggle')).toBe('collapse');
      expect(toggler.getAttribute('data-bs-target')).toBe('#nav');
      done();
    }, 0);
  });

  it('tiene iconos en cada enlace de navegación', (done) => {
    root.render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      const icons = container.querySelectorAll('.fas');
      expect(icons.length).toBeGreaterThan(0);
      
      // Verificar iconos específicos
      expect(container.querySelector('.fa-home')).toBeTruthy();
      expect(container.querySelector('.fa-star')).toBeTruthy();
      expect(container.querySelector('.fa-paw')).toBeTruthy();
      expect(container.querySelector('.fa-users')).toBeTruthy();
      expect(container.querySelector('.fa-phone')).toBeTruthy();
      expect(container.querySelector('.fa-cog')).toBeTruthy();
      done();
    }, 0);
  });

  it('tiene estructura responsiva con clases de Bootstrap', (done) => {
    root.render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.querySelector('.navbar-expand-lg')).toBeTruthy();
      expect(container.querySelector('.navbar-collapse')).toBeTruthy();
      expect(container.querySelector('.navbar-nav')).toBeTruthy();
      expect(container.querySelector('.ms-auto')).toBeTruthy();
      done();
    }, 0);
  });

  it('tiene enlaces con rutas correctas', (done) => {
    root.render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      const links = container.querySelectorAll('a[href]');
      const hrefs = Array.from(links).map(link => link.getAttribute('href'));
      
      expect(hrefs).toContain('/');
      expect(hrefs).toContain('/servicios');
      expect(hrefs).toContain('/registro');
      expect(hrefs).toContain('/nosotros');
      expect(hrefs).toContain('/contacto');
      expect(hrefs).toContain('/admin');
      done();
    }, 0);
  });
});
