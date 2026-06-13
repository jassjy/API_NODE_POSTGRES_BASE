const pool = require("../config/database");
const bcrypt = require("bcrypt");
const apiResponse = require("../utils/response");

// =============================================
// REGISTRAR USUARIO
// =============================================
const register = async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;

        // Validar campos obligatorios
        if (!nombre || !correo || !password) {
            return res.status(400).json(
                apiResponse(false, "Todos los campos son obligatorios", null, "MISSING_FIELDS")
            );
        }

        // Validar formato de correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            return res.status(400).json(
                apiResponse(false, "Correo electrónico no válido", null, "INVALID_EMAIL")
            );
        }

        // Validar longitud de contraseña
        if (password.length < 6) {
            return res.status(400).json(
                apiResponse(false, "La contraseña debe tener al menos 6 caracteres", null, "WEAK_PASSWORD")
            );
        }

        // Verificar si el correo ya existe (PostgreSQL usa $1 en lugar de ?)
        const usuarioExiste = await pool.query(
            "SELECT * FROM usuarios WHERE correo = $1",
            [correo]
        );

        if (usuarioExiste.rows.length > 0) {
            return res.status(400).json(
                apiResponse(false, "Correo ya registrado", null, "DUPLICATE_EMAIL")
            );
        }

        // Encriptar contraseña con bcrypt
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Insertar nuevo usuario (PostgreSQL usa RETURNING para obtener el ID)
        const resultado = await pool.query(
            `INSERT INTO usuarios (nombre, correo, password) 
             VALUES ($1, $2, $3) 
             RETURNING id, nombre, correo, created_at`,
            [nombre, correo, passwordHash]
        );

        const nuevoUsuario = resultado.rows[0];

        return res.status(201).json(
            apiResponse(true, "Usuario registrado correctamente", {
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                correo: nuevoUsuario.correo,
                created_at: nuevoUsuario.created_at
            })
        );

    } catch (error) {
        console.error("Error en register:", error);
        return res.status(500).json(
            apiResponse(false, "Error en el servidor", null, error.message)
        );
    }
};

// =============================================
// LOGIN
// =============================================
const login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        // Validar campos
        if (!correo || !password) {
            return res.status(400).json(
                apiResponse(false, "Correo y contraseña son obligatorios", null, "MISSING_FIELDS")
            );
        }

        // Buscar usuario por correo
        const usuarios = await pool.query(
            "SELECT * FROM usuarios WHERE correo = $1",
            [correo]
        );

        if (usuarios.rows.length === 0) {
            return res.status(401).json(
                apiResponse(false, "Credenciales inválidas")
            );
        }

        const usuario = usuarios.rows[0];

        // Verificar contraseña
        const passwordValido = await bcrypt.compare(password, usuario.password);

        if (!passwordValido) {
            return res.status(401).json(
                apiResponse(false, "Credenciales inválidas")
            );
        }

        // Login exitoso
        return res.status(200).json(
            apiResponse(true, "Login exitoso", {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo
            })
        );

    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json(
            apiResponse(false, "Error en el servidor", null, error.message)
        );
    }
};

// =============================================
// LISTAR TODOS LOS USUARIOS
// =============================================
const getUsers = async (req, res) => {
    try {
        // Obtener todos los usuarios (excepto la contraseña)
        const usuarios = await pool.query(
            `SELECT id, nombre, correo, created_at 
             FROM usuarios 
             ORDER BY id DESC`
        );

        return res.status(200).json(
            apiResponse(true, "Usuarios obtenidos correctamente", usuarios.rows)
        );

    } catch (error) {
        console.error("Error en getUsers:", error);
        return res.status(500).json(
            apiResponse(false, "Error en el servidor", null, error.message)
        );
    }
};

// =============================================
// OBTENER USUARIO POR ID
// =============================================
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validar que el ID sea número
        if (isNaN(id)) {
            return res.status(400).json(
                apiResponse(false, "ID inválido", null, "INVALID_ID")
            );
        }

        const usuario = await pool.query(
            `SELECT id, nombre, correo, created_at 
             FROM usuarios 
             WHERE id = $1`,
            [id]
        );

        if (usuario.rows.length === 0) {
            return res.status(404).json(
                apiResponse(false, "Usuario no encontrado", null, "USER_NOT_FOUND")
            );
        }

        return res.status(200).json(
            apiResponse(true, "Usuario encontrado", usuario.rows[0])
        );

    } catch (error) {
        console.error("Error en getUserById:", error);
        return res.status(500).json(
            apiResponse(false, "Error en el servidor", null, error.message)
        );
    }
};

// =============================================
// ACTUALIZAR USUARIO
// =============================================
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, correo, password } = req.body;

        // Validar que el ID sea número
        if (isNaN(id)) {
            return res.status(400).json(
                apiResponse(false, "ID inválido", null, "INVALID_ID")
            );
        }

        // Verificar si el usuario existe
        const existeUsuario = await pool.query(
            "SELECT * FROM usuarios WHERE id = $1",
            [id]
        );

        if (existeUsuario.rows.length === 0) {
            return res.status(404).json(
                apiResponse(false, "Usuario no encontrado", null, "USER_NOT_FOUND")
            );
        }

        // Construir consulta dinámica
        let updateFields = [];
        let values = [];
        let counter = 1;

        if (nombre) {
            updateFields.push(`nombre = $${counter}`);
            values.push(nombre);
            counter++;
        }

        if (correo) {
            updateFields.push(`correo = $${counter}`);
            values.push(correo);
            counter++;
        }

        if (password) {
            const passwordHash = await bcrypt.hash(password, 10);
            updateFields.push(`password = $${counter}`);
            values.push(passwordHash);
            counter++;
        }

        if (updateFields.length === 0) {
            return res.status(400).json(
                apiResponse(false, "No hay campos para actualizar", null, "NO_FIELDS")
            );
        }

        values.push(id);
        const query = `UPDATE usuarios SET ${updateFields.join(", ")} WHERE id = $${counter}`;
        
        await pool.query(query, values);

        return res.status(200).json(
            apiResponse(true, "Usuario actualizado correctamente")
        );

    } catch (error) {
        console.error("Error en updateUser:", error);
        return res.status(500).json(
            apiResponse(false, "Error en el servidor", null, error.message)
        );
    }
};

// =============================================
// ELIMINAR USUARIO
// =============================================
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Validar que el ID sea número
        if (isNaN(id)) {
            return res.status(400).json(
                apiResponse(false, "ID inválido", null, "INVALID_ID")
            );
        }

        // Verificar si el usuario existe
        const existeUsuario = await pool.query(
            "SELECT * FROM usuarios WHERE id = $1",
            [id]
        );

        if (existeUsuario.rows.length === 0) {
            return res.status(404).json(
                apiResponse(false, "Usuario no encontrado", null, "USER_NOT_FOUND")
            );
        }

        // Eliminar usuario
        await pool.query("DELETE FROM usuarios WHERE id = $1", [id]);

        return res.status(200).json(
            apiResponse(true, "Usuario eliminado correctamente")
        );

    } catch (error) {
        console.error("Error en deleteUser:", error);
        return res.status(500).json(
            apiResponse(false, "Error en el servidor", null, error.message)
        );
    }
};

module.exports = {
    register,
    login,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};