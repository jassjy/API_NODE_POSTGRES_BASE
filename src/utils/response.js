/**
 * Respuesta unificada para la API
 * @param {boolean} success - Indica si la operación fue exitosa
 * @param {string} message - Mensaje descriptivo
 * @param {any} data - Datos de respuesta (opcional)
 * @param {any} error - Error (opcional)
 * @returns {object} - Objeto de respuesta estandarizado
 */
const apiResponse = (success, message, data = null, error = null) => {
    return {
        success,
        message,
        data,
        error,
        timestamp: new Date().toISOString()
    };
};

module.exports = apiResponse;