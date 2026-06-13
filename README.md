# Proyecto Base API Node.js + PostgreSQL


# 🚀 API Node.js + PostgreSQL - Proyecto Base

## 📋 Información del Estudiante

| Campo | Información |
|-------|-------------|
| **Nombre** |Sara Jasmin Cruz Calderon|
| **Curso** | Análisis y Desarrollo de Software |
| **Institución** | Centro de Gestión de Mercados, Logística y Tecnologías de la Información - SENA |
| **Instructor** | Jesús Ropero Barbosa |
| **Email Instructor** | jropero@sena.edu.co |
| **Tecnología Principal** | Node.js + PostgreSQL |
| **Fecha** |   13/06/2026 |

---

## 🎯 Objetivo del Proyecto

Desarrollar una API REST funcional para gestión de usuarios, aplicando los conceptos fundamentales de:

- ✅ Conexión a base de datos PostgreSQL
- ✅ Creación de rutas y endpoints
- ✅ Implementación de controladores con lógica de negocio
- ✅ Consultas SQL directas y parametrizadas
- ✅ Arquitectura en capas (separación de responsabilidades)
- ✅ Respuestas JSON estandarizadas
- ✅ Manejo de variables de entorno
- ✅ Encriptación de contraseñas con bcrypt

---

## 📚 ¿Qué aprendí con este proyecto?

### 1. **Arquitectura en Capas**
Aprendí a organizar el código en diferentes capas para mantenerlo limpio y mantenible:

| Capa | Carpeta | Función |
|------|---------|---------|
| **Configuración** | `src/config/` | Conexión a PostgreSQL |
| **Controladores** | `src/controllers/` | Lógica de negocio |
| **Rutas** | `src/routes/` | Definición de endpoints |
| **Utilidades** | `src/utils/` | Funciones reutilizables |
| **Principal** | `src/app.js` | Configuración del servidor |

### 2. **Conexión a PostgreSQL**
Aprendí a:
- Usar el paquete `pg` (node-postgres) para conectar Node.js con PostgreSQL
- Crear un pool de conexiones para eficiencia
- Manejar errores de conexión
- Usar variables de entorno para datos sensibles

```javascript
// Ejemplo de conexión que aprendí
const { Pool } = require("pg");
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
```

### 3. **SQL Directo y Parametrizado**
Aprendí a:
- Escribir consultas SQL directamente en el código
- Usar placeholders `$1, $2, $3` para PostgreSQL
- Prevenir inyección SQL mediante consultas parametrizadas
- Usar `RETURNING` para obtener datos después de INSERT

```javascript
// Diferencia clave que aprendí
// MySQL usa: "SELECT * FROM usuarios WHERE id = ?"
// PostgreSQL usa: "SELECT * FROM usuarios WHERE id = $1"
```

### 4. **Encriptación de Contraseñas**
Aprendí a usar `bcrypt` para:
- Generar hash de contraseñas con `bcrypt.hash()`
- Verificar contraseñas con `bcrypt.compare()`
- Nunca guardar contraseñas en texto plano

### 5. **Respuestas API Unificadas**
Aprendí a crear un formato estándar para todas las respuestas:

```javascript
{
  "success": true,      // Indica si la operación fue exitosa
  "message": "Mensaje", // Descripción de lo que pasó
  "data": {},           // Datos de respuesta (si hay)
  "error": null,        // Error (si ocurrió)
  "timestamp": "2024-..." // Cuándo ocurrió
}
```

### 6. **Manejo de Errores**
Aprendí a:
- Usar try-catch para capturar errores
- Devolver códigos HTTP apropiados (200, 201, 400, 401, 404, 500)
- Mostrar mensajes de error amigables

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | ¿Para qué sirve? |
|------------|---------|------------------|
| **Node.js** | v18+ | Entorno de ejecución JavaScript |
| **Express** | 4.18.2 | Framework para crear API REST |
| **PostgreSQL** | 15+ | Base de datos relacional |
| **pg** | 8.11.3 | Cliente para conectar Node con PostgreSQL |
| **bcrypt** | 5.1.0 | Encriptación de contraseñas |
| **dotenv** | 16.3.1 | Manejo de variables de entorno |
| **cors** | 2.8.5 | Permitir peticiones desde frontend |
| **nodemon** | 3.0.1 | Reinicio automático en desarrollo |

---

## 📁 Estructura del Proyecto (Explicada)

```
api-node-postgres-base/
│
├── 📁 src/                          # Código fuente
│   │
│   ├── 📁 config/                   # Configuraciones
│   │   └── database.js              # Conexión a PostgreSQL
│   │
│   ├── 📁 controllers/              # Controladores (lógica de negocio)
│   │   └── userController.js        # CRUD de usuarios
│   │
│   ├── 📁 routes/                   # Rutas (endpoints)
│   │   └── userRoutes.js            # Definición de URLs
│   │
│   ├── 📁 utils/                    # Utilidades
│   │   └── response.js              # Formato unificado de respuestas
│   │
│   └── 📄 app.js                    # Punto de entrada principal
│
├── 📄 .env                          # Variables de entorno (NO se sube a GitHub)
├── 📄 .gitignore                    # Archivos que NO se suben
├── 📄 database.sql                  # Script para crear BD y tablas
├── 📄 package.json                  # Dependencias y scripts
├── 📄 package-lock.json             # Versiones exactas de dependencias
└── 📄 README.md                     # Documentación (este archivo)
```

---

## 🔧 Proceso de Desarrollo (Paso a Paso)

### **Paso 1: Creación del proyecto**
```bash
mkdir api-node-postgres-base
cd api-node-postgres-base
npm init -y
```

**¿Qué aprendí?** A inicializar un proyecto Node.js y generar el archivo package.json.

---

### **Paso 2: Instalación de dependencias**
```bash
npm install express pg dotenv bcrypt cors
npm install -D nodemon
```

**¿Qué aprendí?** 
- Diferencia entre dependencias (producción) y devDependencies (desarrollo)
- Para qué sirve cada paquete

---

### **Paso 3: Configuración de variables de entorno**
Creé el archivo `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=mi_contraseña
DB_NAME=api_usuarios
PORT=3000
```

**¿Qué aprendí?** 
- Nunca subir credenciales a GitHub
- Usar `.gitignore` para excluir `.env`
- Leer variables con `process.env`

---

### **Paso 4: Creación de la base de datos**
Ejecuté el script `database.sql`:

```sql
CREATE DATABASE api_usuarios;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**¿Qué aprendí?** 
- Diferencia entre `SERIAL` (PostgreSQL) y `AUTO_INCREMENT` (MySQL)
- Crear tablas con restricciones (NOT NULL, UNIQUE)
- Tipos de datos en PostgreSQL

---

### **Paso 5: Conexión a PostgreSQL** (`src/config/database.js`)
```javascript
const { Pool } = require("pg");
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
```

**¿Qué aprendí?** 
- El Pool administra múltiples conexiones
- La diferencia entre `mysql2` y `pg`
- Probar la conexión al iniciar

---

### **Paso 6: Respuesta unificada** (`src/utils/response.js`)
```javascript
const apiResponse = (success, message, data = null, error = null) => {
    return { success, message, data, error, timestamp: new Date().toISOString() };
};
```

**¿Qué aprendí?** 
- Estandarizar respuestas para que el frontend siempre reciba el mismo formato
- Usar parámetros por defecto (`data = null`)

---

### **Paso 7: Controlador de usuarios** (`src/controllers/userController.js`)

#### **Registro de usuario:**
```javascript
const register = async (req, res) => {
    // 1. Validar campos
    // 2. Verificar si el correo existe
    // 3. Encriptar contraseña
    // 4. Guardar en BD
    // 5. Devolver respuesta
};
```

**¿Qué aprendí?** 
- Validaciones básicas
- Consultas SQL con `$1, $2, $3`
- Uso de `RETURNING` para obtener el ID del nuevo registro
- Códigos HTTP: 201 (creado), 400 (error validación), 500 (error servidor)

#### **Login:**
```javascript
const login = async (req, res) => {
    // 1. Buscar usuario por correo
    // 2. Comparar contraseña con bcrypt.compare()
    // 3. Devolver datos del usuario
};
```

**¿Qué aprendí?** 
- Buscar en BD con WHERE
- Verificar contraseñas encriptadas
- Códigos HTTP: 401 (no autorizado)

---

### **Paso 8: Rutas** (`src/routes/userRoutes.js`)
```javascript
router.post("/register", register);
router.post("/login", login);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
```

**¿Qué aprendí?** 
- Verbos HTTP: POST, GET, PUT, DELETE
- Parámetros de URL (`:id`)
- Organización de endpoints RESTful

---

### **Paso 9: Servidor principal** (`src/app.js`)
```javascript
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
```

**¿Qué aprendí?** 
- Middlewares (funciones que se ejecutan antes de las rutas)
- Montar rutas con prefijo
- Manejo de errores 404 y 500

---

## 📡 Endpoints de la API

| Método | Endpoint | ¿Qué hace? | Códigos de respuesta |
|--------|----------|------------|---------------------|
| **POST** | `/api/users/register` | Registra un nuevo usuario | 201 (creado), 400 (error) |
| **POST** | `/api/users/login` | Inicia sesión | 200 (ok), 401 (credenciales inválidas) |
| **GET** | `/api/users` | Lista todos los usuarios | 200 (ok) |
| **GET** | `/api/users/:id` | Obtiene un usuario por ID | 200 (ok), 404 (no encontrado) |
| **PUT** | `/api/users/:id` | Actualiza un usuario | 200 (ok), 404 (no encontrado) |
| **DELETE** | `/api/users/:id` | Elimina un usuario | 200 (ok), 404 (no encontrado) |

---

## 🧪 Pruebas Realizadas

### **Prueba 1: Registro de usuario**
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Carlos Perez","correo":"carlos@test.com","password":"123456"}'
```
✅ **Resultado esperado:** Usuario creado con ID 1

### **Prueba 2: Login**
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"correo":"carlos@test.com","password":"123456"}'
```
✅ **Resultado esperado:** Datos del usuario

### **Prueba 3: Listar usuarios**
```bash
curl -X GET http://localhost:3000/api/users
```
✅ **Resultado esperado:** Array con los usuarios

### **Prueba 4: Correo duplicado**
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Otro","correo":"carlos@test.com","password":"123456"}'
```
✅ **Resultado esperado:** Error "Correo ya registrado"

---

## 📊 Diferencias que Aprendí entre MySQL y PostgreSQL

| Concepto | MySQL | PostgreSQL | ¿Qué aprendí? |
|----------|-------|------------|----------------|
| **Auto-incremento** | `AUTO_INCREMENT` | `SERIAL` | PostgreSQL usa SERIAL |
| **Placeholders** | `?` | `$1, $2, $3` | PostgreSQL usa $1, $2... |
| **Retornar ID** | `result.insertId` | `RETURNING id` | PostgreSQL tiene RETURNING |
| **Puerto por defecto** | 3306 | 5432 | Cada BD tiene su puerto |
| **Cliente Node** | `mysql2` | `pg` | Paquetes diferentes |

---

## 🐛 Errores que Encontré y Cómo los Solucioné

| Error | Causa | Solución |
|-------|-------|----------|
| `password authentication failed` | Contraseña incorrecta en .env | Verificar credenciales |
| `database "api_usuarios" does not exist` | BD no creada | Ejecutar `CREATE DATABASE` |
| `Connection refused` | PostgreSQL no está corriendo | Iniciar servicio de PostgreSQL |
| `syntax error at or near "$1"` | Usé `?` en lugar de `$1` | Cambiar a placeholders de PostgreSQL |
| `column "id" does not exist` | Usé `insertId` de MySQL | Usar `RETURNING id` |

---

## ✅ Competencias Desarrolladas

### **Técnicas:**
- ✅ Creación de API REST con Express
- ✅ Conexión y consultas a PostgreSQL
- ✅ Encriptación de datos sensibles
- ✅ Manejo de errores y excepciones
- ✅ Uso de variables de entorno
- ✅ Control de versiones con Git

### **Blandas:**
- ✅ Organización y planificación
- ✅ Resolución de problemas
- ✅ Documentación técnica
- ✅ Seguimiento de instrucciones

---

## 🚀 Cómo Ejecutar este Proyecto

### **Requisitos previos:**
- Node.js instalado (v18+)
- PostgreSQL instalado (v15+)
- Git instalado

### **Pasos:**

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd api-node-postgres-base

# 2. Instalar dependencias
npm install

# 3. Configurar .env con tus datos de PostgreSQL
# (Editar archivo .env)

# 4. Crear base de datos
psql -U postgres -c "CREATE DATABASE api_usuarios;"

# 5. Crear tabla
psql -U postgres -d api_usuarios -f database.sql

# 6. Iniciar servidor
npm run dev

# 7. Probar (en otra terminal)
curl http://localhost:3000
```

---

## 📝 Reflexión Final (Qué Aprendí)

Este proyecto me permitió comprender los fundamentos de una API REST desde cero. Aprendí que:

1. **La arquitectura por capas** es esencial para proyectos escalables
2. **Las variables de entorno** protegen información sensible
3. **SQL parametrizado** previene inyección SQL
4. **bcrypt** es fundamental para seguridad de contraseñas
5. **PostgreSQL** es una excelente alternativa a MySQL
6. **La estandarización de respuestas** facilita el consumo de la API

La diferencia más importante que aprendí fue entre MySQL y PostgreSQL: los placeholders (`?` vs `$1`) y el auto-incremento (`AUTO_INCREMENT` vs `SERIAL`).

---

## 🔗 Recursos que Utilicé

- [Documentación oficial de Node.js](https://nodejs.org/)
- [Documentación de Express](https://expressjs.com/)
- [Documentación de PostgreSQL](https://www.postgresql.org/docs/)
- [Documentación de bcrypt](https://www.npmjs.com/package/bcrypt)
- [Guía de buenas prácticas REST API](https://restfulapi.net/)

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos como parte del programa de formación del SENA.

---

## 👤 Datos del Aprendiz


Ficha: 3407180
Instructor: Jesús Ropero Barbosa
Email: s4nsy150@gmail.com


---

> **"Aprender haciendo" - Filosofía SENA**

```

---

## 📝 **¿Cómo usar este README?**

1. Copia TODO el contenido del código de arriba
2. Pega en tu archivo `README.md`
3. Reemplaza los datos entre corchetes `[ ]` con tus datos personales
4. Guarda el archivo

¡Este README muestra todo el proceso de aprendizaje y justifica cada decisión técnica que tomaste!