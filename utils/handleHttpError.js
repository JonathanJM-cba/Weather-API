/**
 * Función para manejar los erros HTTP
 * @param {Response} res - Respuesta
 * @param {String} message - Pasar el mensaje de error http
 * @param {Number} code - Pasar el código de error http
 * @returns - Retorna la respuesta al cliente
 */
const handleHttpError = (res, message = "ERROR_HTTP", code = 400) => {
  return res.send(message).status(code);
};

module.exports = handleHttpError;
