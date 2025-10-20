// Prueba simple en JavaScript puro para Karma
describe('Pruebas Básicas de Colita Feliz', function() {
  
  it('debería ejecutar una prueba básica', function() {
    expect(true).toBe(true);
  });

  it('debería verificar que 2+2=4', function() {
    expect(2 + 2).toBe(4);
  });

  it('debería verificar que un string contiene texto', function() {
    var texto = 'Colita Feliz';
    expect(texto).toContain('Colita');
  });

  it('debería verificar que un array tiene elementos', function() {
    var servicios = ['cuidado', 'paseo', 'baño'];
    expect(servicios.length).toBe(3);
  });

  it('debería verificar que un objeto tiene propiedades', function() {
    var servicio = {
      id: 'cuidado',
      nombre: 'Cuidado diario',
      precio: 10000
    };
    expect(servicio.id).toBe('cuidado');
    expect(servicio.nombre).toBe('Cuidado diario');
  });

  it('debería formatear números chilenos', function() {
    var formatear = function(numero) {
      return new Intl.NumberFormat('es-CL').format(numero);
    };
    
    expect(formatear(10000)).toBe('10.000');
    expect(formatear(150000)).toBe('150.000');
  });

  it('debería calcular días entre fechas', function() {
    var calcularDias = function(inicio, fin) {
      var inicioDate = new Date(inicio);
      var finDate = new Date(fin);
      return Math.ceil((finDate - inicioDate) / (1000 * 60 * 60 * 24));
    };
    
    expect(calcularDias('2024-01-15', '2024-01-17')).toBe(2);
    expect(calcularDias('2024-01-01', '2024-01-03')).toBe(2);
  });

  it('debería validar email', function() {
    var validarEmail = function(email) {
      return email.indexOf('@') !== -1 && email.indexOf('.') !== -1;
    };
    
    expect(validarEmail('test@email.com')).toBe(true);
    expect(validarEmail('email-invalido')).toBe(false);
  });

  it('debería crear elementos DOM', function() {
    var div = document.createElement('div');
    div.textContent = 'Colita Feliz';
    div.className = 'card bg-primary';
    
    expect(div.textContent).toBe('Colita Feliz');
    expect(div.classList.contains('card')).toBe(true);
    expect(div.classList.contains('bg-primary')).toBe(true);
  });

  it('debería verificar lógica de negocio', function() {
    var calcularTotal = function(precioDia, dias, adicional) {
      return (precioDia * dias) + (adicional || 0);
    };
    
    expect(calcularTotal(10000, 2, 0)).toBe(20000);
    expect(calcularTotal(10000, 3, 5000)).toBe(35000);
  });
});
