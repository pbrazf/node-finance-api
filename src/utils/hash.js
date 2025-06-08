const bcrypt = require('bcrypt')

// Para fazer o hash das senhas
async function hashPassword(password) {
    const saltRounds = 10; // Quantidade de Rounds que o algoritmo deve fazer, quanto mais, mais seguro e mais lento.
    const hashed = await bcrypt.hash(password, saltRounds); 
    return hashed;
}

// Para comparar senhas
async function comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = { hashPassword, comparePassword };