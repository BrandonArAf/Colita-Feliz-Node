import 'dotenv/config';
import pool from '../db/pool.js';
import fs from 'fs';

const items = JSON.parse(fs.readFileSync(new URL('../../sql/seed_servicios.json', import.meta.url)));
for(const it of items){
  await pool.execute(
    'INSERT INTO servicios (id, nombre, descripcion, precioDia, adicional) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), descripcion=VALUES(descripcion), precioDia=VALUES(precioDia), adicional=VALUES(adicional)',
    [it.id, it.nombre, it.descripcion || '', it.precioDia || 0, it.adicional || 0]
  );
}
console.log('Servicios seed OK');
process.exit(0);
