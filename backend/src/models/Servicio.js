export default class Servicio {
  constructor({ id, nombre, descripcion='', precioDia=0, adicional=0 }){
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioDia = Number(precioDia);
    this.adicional = Number(adicional);
  }
}
