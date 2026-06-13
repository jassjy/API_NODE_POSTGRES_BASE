const { Pool } = require("pg");
require("dotenv").config();

// Crear pool de conexiones para PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 20, // Máximo de conexiones en el pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Probar la conexión a PostgreSQL
const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log("✅ Conectado a PostgreSQL exitosamente");
        console.log(`   Base de datos: ${process.env.DB_NAME}`);
        console.log(`   Usuario: ${process.env.DB_USER}`);
        client.release();
    } catch (error) {
        console.error("❌ Error conectando a PostgreSQL:", error.message);
        console.error("   Verifica que PostgreSQL esté corriendo y las credenciales sean correctas");
        process.exit(1);
    }
};

testConnection();

module.exports = pool;