import React from 'react';
import { createRoot } from 'react-dom/client';
import Footer from '../components/Footer.jsx';

describe('Footer', () => {
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

  it('renderiza el footer con el año actual', (done) => {
    root.render(<Footer />);
    
    setTimeout(() => {
      const currentYear = new Date().getFullYear();
      expect(container.textContent).toContain(currentYear.toString());
      expect(container.textContent).toContain('Colita Feliz');
      expect(container.textContent).toContain('Guardería Canina');
      done();
    }, 0);
  });

  it('aplica clases de Bootstrap correctamente', (done) => {
    root.render(<Footer />);
    
    setTimeout(() => {
      expect(container.querySelector('.bg-dark')).toBeTruthy();
      expect(container.querySelector('.text-white')).toBeTruthy();
      expect(container.querySelector('.py-4')).toBeTruthy();
      expect(container.querySelector('.mt-5')).toBeTruthy();
      expect(container.querySelector('.container')).toBeTruthy();
      expect(container.querySelector('.small')).toBeTruthy();
      done();
    }, 0);
  });

  it('tiene estructura HTML correcta', (done) => {
    root.render(<Footer />);
    
    setTimeout(() => {
      expect(container.querySelector('footer')).toBeTruthy();
      expect(container.querySelector('div')).toBeTruthy();
      done();
    }, 0);
  });
});
