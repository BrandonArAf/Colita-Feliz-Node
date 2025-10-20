// Prueba simple para verificar que Karma funciona
describe('Pruebas Básicas', () => {
  it('debería ejecutar una prueba básica', () => {
    expect(true).toBe(true);
  });

  it('debería verificar que 2+2=4', () => {
    expect(2 + 2).toBe(4);
  });

  it('debería verificar que un string contiene texto', () => {
    const texto = 'Colita Feliz';
    expect(texto).toContain('Colita');
  });

  it('debería verificar que un array tiene elementos', () => {
    const servicios = ['cuidado', 'paseo', 'baño'];
    expect(servicios.length).toBe(3);
  });

  it('debería verificar que un objeto tiene propiedades', () => {
    const servicio = {
      id: 'cuidado',
      nombre: 'Cuidado diario',
      precio: 10000
    };
    expect(servicio.id).toBe('cuidado');
    expect(servicio.nombre).toBe('Cuidado diario');
  });
});

describe('Pruebas de DOM', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="test-container"></div>';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('debería crear un elemento en el DOM', () => {
    const div = document.createElement('div');
    div.textContent = 'Colita Feliz';
    document.getElementById('test-container').appendChild(div);
    
    expect(document.querySelector('div').textContent).toBe('Colita Feliz');
  });

  it('debería verificar clases CSS', () => {
    const div = document.createElement('div');
    div.className = 'card bg-primary';
    document.getElementById('test-container').appendChild(div);
    
    expect(div.classList.contains('card')).toBe(true);
    expect(div.classList.contains('bg-primary')).toBe(true);
  });
});

describe('Pruebas de Funciones', () => {
  it('debería formatear números chilenos', () => {
    const formatear = (numero) => {
      return new Intl.NumberFormat('es-CL').format(numero);
    };
    
    expect(formatear(10000)).toBe('10.000');
    expect(formatear(150000)).toBe('150.000');
  });

  it('debería calcular días entre fechas', () => {
    const calcularDias = (inicio, fin) => {
      const inicioDate = new Date(inicio);
      const finDate = new Date(fin);
      return Math.ceil((finDate - inicioDate) / (1000 * 60 * 60 * 24));
    };
    
    expect(calcularDias('2024-01-15', '2024-01-17')).toBe(2);
    expect(calcularDias('2024-01-01', '2024-01-03')).toBe(2);
  });

  it('debería validar email', () => {
    const validarEmail = (email) => {
      return email.includes('@') && email.includes('.');
    };
    
    expect(validarEmail('test@email.com')).toBe(true);
    expect(validarEmail('email-invalido')).toBe(false);
  });
});
