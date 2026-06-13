const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// =============================================
// MIDDLEWARES GLOBALES
// =============================================
app.use(cors());                    // Permitir peticiones de diferentes dominios
app.use(express.json());            // Parsear JSON
app.use(express.urlencoded({ extended: true })); // Parsear datos de formularios

// Middleware para logging de peticiones
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// =============================================
// RUTAS
// =============================================

// Ruta principal de bienvenida
app.get("/", (req, res) => {
    res.json({
        name: "API Node.js + PostgreSQL - Proyecto Base",
        version: "1.0.0",
        description: "API REST para gestión de usuarios",
        instructor: "Jesús Ropero",
        database: "PostgreSQL",
        endpoints: {
            "Registrar usuario": {
                method: "POST",
                url: "/api/users/register",
                body: {
                    nombre: "string (requerido)",
                    correo: "string (requerido, email válido)",
                    password: "string (requerido, mínimo 6 caracteres)"
                }
            },
            "Iniciar sesión": {
                method: "POST",
                url: "/api/users/login",
                body: {
                    correo: "string (requerido)",
                    password: "string (requerido)"
                }
            },
            "Listar usuarios": {
                method: "GET",
                url: "/api/users"
            },
            "Obtener usuario por ID": {
                method: "GET",
                url: "/api/users/:id"
            },
            "Actualizar usuario": {
                method: "PUT",
                url: "/api/users/:id",
                body: {
                    nombre: "string (opcional)",
                    correo: "string (opcional)",
                    password: "string (opcional)"
                }
            },
            "Eliminar usuario": {
                method: "DELETE",
                url: "/api/users/:id"
            }
        }
    });
});

// Rutas de la API
app.use("/api/users", userRoutes);

// =============================================
// MANEJO DE ERRORES
// =============================================

// Ruta no encontrada (404)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Ruta no encontrada",
        error: "NOT_FOUND",
        timestamp: new Date().toISOString()
    });
});

// Manejo global de errores
app.use((err, req, res, next) => {
    console.error("Error global:", err);
    res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        error: process.env.NODE_ENV === "development" ? err.message : "INTERNAL_ERROR",
        timestamp: new Date().toISOString()
    });
});

// =============================================
// INICIAR SERVIDOR
// =============================================
app.listen(PORT, () => {
    console.log(`
    ╔══════════════════════════════════════════════════════╗
    ║     🚀 API Node.js + PostgreSQL - Proyecto Base      ║
    ╠══════════════════════════════════════════════════════╣
    ║  Servidor: http://localhost:${PORT}                    ║
    ║  Base de datos: PostgreSQL                           ║
    ║  Estado: ✅ Corriendo                                 ║
    ╚══════════════════════════════════════════════════════╝
    `);
});