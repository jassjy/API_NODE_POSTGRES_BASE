const express = require("express");
const router = express.Router();
const {
    register,
    login,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/userController");

// =============================================
// RUTAS PÚBLICAS
// =============================================
router.post("/register", register);  // Registrar usuario
router.post("/login", login);        // Iniciar sesión

// =============================================
// RUTAS DE USUARIOS
// =============================================
router.get("/", getUsers);           // Listar todos los usuarios
router.get("/:id", getUserById);     // Obtener usuario por ID
router.put("/:id", updateUser);      // Actualizar usuario
router.delete("/:id", deleteUser);   // Eliminar usuario

module.exports = router;