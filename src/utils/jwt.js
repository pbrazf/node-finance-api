const jwt = require('jsonwebtoken');

const generateToken = (login) => {
    return jwt.sign(
        { user: login.user },              // Payload: dados codificados no token (poderia ser também um ID)
        process.env.JWT_SECRET,            // Chave secreta usada para criptografar o token (deve estar no .env)
        { expiresIn: '1h' }                // Tempo de validade do token (após isso expira)
)};

module.exports = { generateToken };