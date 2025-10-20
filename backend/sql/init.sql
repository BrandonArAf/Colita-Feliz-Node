CREATE DATABASE IF NOT EXISTS colita_feliz CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE colita_feliz;

CREATE TABLE IF NOT EXISTS servicios (
  id VARCHAR(40) PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  descripcion TEXT,
  precioDia INT NOT NULL DEFAULT 0,
  adicional INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS registros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dueno VARCHAR(120) NOT NULL,
  email VARCHAR(160),
  telefono VARCHAR(40),
  mascota VARCHAR(120) NOT NULL,
  raza VARCHAR(120),
  peso DECIMAL(5,2),
  servicio_id VARCHAR(40) NOT NULL,
  ingreso DATE NOT NULL,
  salida DATE NOT NULL,
  dias INT NOT NULL,
  subtotal INT NOT NULL,
  adicional INT NOT NULL,
  total INT NOT NULL,
  comentarios TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_servicio FOREIGN KEY (servicio_id) REFERENCES servicios(id)
);
