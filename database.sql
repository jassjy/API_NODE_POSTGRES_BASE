-- Crear base de datos PostgreSQL
CREATE DATABASE api_usuarios;

-- Conectar a la base de datos (ejecutar por separado)
-- \c api_usuarios;

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índice para búsquedas rápidas por correo
CREATE INDEX IF NOT EXISTS idx_usuarios_correo ON usuarios(correo);

-- Verificar la tabla
\d usuarios;

-- Insertar usuario de prueba (contraseña: 123456)
-- La contraseña encriptada es: $2b$10$ejemploHashParaPrueba
-- INSERT INTO usuarios (nombre, correo, password) VALUES 
-- ('Usuario Test', 'test@test.com', '$2b$10$N9qo8uLOickgx2ZMRZoMy.Mr7JYKKq6uE8F7Wq.sM5LJqZqZqZqZq');