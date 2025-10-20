# Colita Feliz – Migración a Node.js + React

Proyecto listo para **descargar, instalar y correr**.

## Requisitos
- XAMPP (MySQL) en `localhost:3306` con usuario `root` sin contraseña (ajusta en `backend/.env` si usas otra)
- Node.js 18+

## Pasos
1. **Base de datos** (XAMPP → phpMyAdmin):\
   Importa `backend/sql/init.sql` (crea BD y tablas).\
   Luego, ejecuta el seeder para servicios:
   ```bash
   cd backend
   npm i
   node src/seed/seedServicios.js
   ```

2. **Backend**
   ```bash
   cd backend
   npm run dev
   # http://localhost:4001
   # Endpoints: /api/servicios, /api/registros
   ```

3. **Frontend**
   ```bash
   cd ../frontend
   npm i
   npm run dev
   # Abre la URL que muestra Vite
   ```

4. **Tests**
   ```bash
   # Backend
   cd backend && npm test
   # Frontend
   cd ../frontend && npm run test
   ```

## Notas
- Copiamos **logo** y **styles.css** del proyecto original.
- Páginas migradas a React: Inicio, Servicios, Nosotros, Contacto, Registro, Admin.
- Cálculo de costos en Registro (días, subtotal, adicional, total) según servicio.
- Admin lista registros guardados en la BD.
