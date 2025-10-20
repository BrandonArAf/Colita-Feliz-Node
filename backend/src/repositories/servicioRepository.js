import pool from '../db/pool.js';
import Servicio from '../models/Servicio.js';

export const servicioRepository = {
  async findAll(){
    const [rows] = await pool.query('SELECT * FROM servicios ORDER BY nombre ASC');
    return rows.map(r => new Servicio(r));
  },
  async findById(id){
    const [rows] = await pool.query('SELECT * FROM servicios WHERE id=?', [id]);
    return rows[0] ? new Servicio(rows[0]) : null;
  },
  async upsertMany(items){
    for(const it of items){
      await pool.execute(
        'INSERT INTO servicios (id, nombre, descripcion, precioDia, adicional) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), descripcion=VALUES(descripcion), precioDia=VALUES(precioDia), adicional=VALUES(adicional)',
        [it.id, it.nombre, it.descripcion || '', it.precioDia || 0, it.adicional || 0]
      );
    }
    return true;
  }
};
