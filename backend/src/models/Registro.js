export default class Registro {
  constructor(obj={}){
    this.id = obj.id ?? null;
    this.dueno = obj.dueno;
    this.email = obj.email || '';
    this.telefono = obj.telefono || '';
    this.mascota = obj.mascota;
    this.raza = obj.raza || '';
    this.peso = obj.peso ? Number(obj.peso) : null;
    this.servicio_id = obj.servicio_id;
    this.ingreso = obj.ingreso;
    this.salida = obj.salida;
    this.dias = Number(obj.dias || 1);
    this.subtotal = Number(obj.subtotal || 0);
    this.adicional = Number(obj.adicional || 0);
    this.total = Number(obj.total || 0);
    this.comentarios = obj.comentarios || '';
    this.created_at = obj.created_at || null;
  }
}
