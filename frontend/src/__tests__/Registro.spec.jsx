import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Registro from '../pages/Registro.jsx';

describe('Registro', () => {
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

  it('renderiza el formulario de registro', (done) => {
    root.render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.textContent).toContain('Registro de Mascota');
      expect(container.textContent).toContain('Información del Dueño');
      expect(container.textContent).toContain('Información de la Mascota');
      expect(container.textContent).toContain('Servicio y Fechas');
      done();
    }, 0);
  });

  it('tiene todos los campos de entrada requeridos', (done) => {
    root.render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.querySelector('input[name="dueno"]')).toBeTruthy();
      expect(container.querySelector('input[name="mascota"]')).toBeTruthy();
      expect(container.querySelector('input[name="telefono"]')).toBeTruthy();
      expect(container.querySelector('select[name="servicio_id"]')).toBeTruthy();
      expect(container.querySelector('input[name="ingreso"]')).toBeTruthy();
      expect(container.querySelector('input[name="salida"]')).toBeTruthy();
      done();
    }, 0);
  });

  it('aplica clases de Bootstrap correctamente', (done) => {
    root.render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.querySelector('.container-fluid')).toBeTruthy();
      expect(container.querySelector('.card')).toBeTruthy();
      expect(container.querySelector('.form-control')).toBeTruthy();
      expect(container.querySelector('.btn')).toBeTruthy();
      done();
    }, 0);
  });

  it('tiene campos con validación HTML', (done) => {
    root.render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      const duenoInput = container.querySelector('input[name="dueno"]');
      const telefonoInput = container.querySelector('input[name="telefono"]');
      const emailInput = container.querySelector('input[name="email"]');
      
      expect(duenoInput.getAttribute('required')).toBeTruthy();
      expect(telefonoInput.getAttribute('required')).toBeTruthy();
      expect(telefonoInput.getAttribute('maxLength')).toBe('9');
      expect(telefonoInput.getAttribute('pattern')).toBe('[0-9]{9}');
      expect(emailInput.getAttribute('type')).toBe('email');
      done();
    }, 0);
  });

  it('muestra secciones organizadas', (done) => {
    root.render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.textContent).toContain('Información del Dueño');
      expect(container.textContent).toContain('Información de la Mascota');
      expect(container.textContent).toContain('Servicio y Fechas');
      expect(container.textContent).toContain('Resumen de Costos');
      done();
    }, 0);
  });

  it('tiene botón de envío con estado de carga', (done) => {
    root.render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      const submitButton = container.querySelector('button[type="submit"]');
      expect(submitButton).toBeTruthy();
      expect(submitButton.textContent).toContain('Enviar Registro');
      done();
    }, 0);
  });

  it('incluye iconos de FontAwesome', (done) => {
    root.render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.querySelector('.fa-paw')).toBeTruthy();
      expect(container.querySelector('.fa-user')).toBeTruthy();
      expect(container.querySelector('.fa-dog')).toBeTruthy();
      expect(container.querySelector('.fa-calendar-alt')).toBeTruthy();
      expect(container.querySelector('.fa-calculator')).toBeTruthy();
      expect(container.querySelector('.fa-comment')).toBeTruthy();
      done();
    }, 0);
  });

  it('tiene estructura responsiva', (done) => {
    root.render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );
    
    setTimeout(() => {
      expect(container.querySelector('.col-12.col-lg-10.col-xl-8')).toBeTruthy();
      expect(container.querySelector('.row.g-4')).toBeTruthy();
      expect(container.querySelector('.col-md-6')).toBeTruthy();
      done();
    }, 0);
  });
});
