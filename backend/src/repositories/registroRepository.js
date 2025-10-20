import pool from '../db/pool.js';
import Registro from '../models/Registro.js';

export const registroRepository = {
  async findAll(){
    const [rows] = await pool.query('SELECT * FROM registros ORDER BY id DESC');
    return rows.map(r => new Registro(r));
  },
  async findById(id){
    const [rows] = await pool.query('SELECT * FROM registros WHERE id = ?', [id]);
    return rows.length > 0 ? new Registro(rows[0]) : null;
  },
  async create(dto){
    const r = new Registro(dto);
    const [res] = await pool.execute(`
      INSERT INTO registros
      (dueno,email,telefono,mascota,raza,peso,servicio_id,ingreso,salida,dias,subtotal,adicional,total,comentarios)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [r.dueno, r.email, r.telefono, r.mascota, r.raza, r.peso, r.servicio_id, r.ingreso, r.salida, r.dias, r.subtotal, r.adicional, r.total, r.comentarios]
    );
    r.id = res.insertId;
    return r;
  },
  async delete(id){
    const [res] = await pool.execute('DELETE FROM registros WHERE id = ?', [id]);
    return { deleted: res.affectedRows > 0 };
  }
};
