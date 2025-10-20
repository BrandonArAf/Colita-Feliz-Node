import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '../App.jsx';

describe('App', () => {
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

  it('renderiza la estructura principal de la aplicación', (done) => {
    root.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.querySelector('.d-flex.flex-column.min-vh-100')).toBeTruthy();
      expect(container.querySelector('.container.py-4.flex-grow-1')).toBeTruthy();
      done();
    }, 0);
  });

  it('incluye el componente Navbar', (done) => {
    root.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.querySelector('nav')).toBeTruthy();
      expect(container.textContent).toContain('Colita Feliz');
      done();
    }, 0);
  });

  it('incluye el componente Footer', (done) => {
    root.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      // El footer debería estar presente (aunque no vemos su contenido específico)
      expect(container.querySelector('footer')).toBeTruthy();
      done();
    }, 0);
  });

  it('aplica clases de Bootstrap para layout responsivo', (done) => {
    root.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.querySelector('.d-flex')).toBeTruthy();
      expect(container.querySelector('.flex-column')).toBeTruthy();
      expect(container.querySelector('.min-vh-100')).toBeTruthy();
      expect(container.querySelector('.container')).toBeTruthy();
      expect(container.querySelector('.py-4')).toBeTruthy();
      expect(container.querySelector('.flex-grow-1')).toBeTruthy();
      done();
    }, 0);
  });

  it('tiene estructura de rutas configurada', (done) => {
    root.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      // Verificar que se renderiza el contenido principal
      expect(container.querySelector('main')).toBeTruthy();
      done();
    }, 0);
  });
});
