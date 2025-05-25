const bycript = require('bcrypt') // Importando a bib que vai fazer o hash das senhas 

async function hashPassword(password) {
    const saltRounds = 10; // Quantidade de Rounds que o algoritmo deve fazer, quanto mais, mais seguro e mais lento.
    const hashed = await bcrypt.hash(password, saltRounds); // Faz o hash da senha 
    return hashed; // Retorna o hash da senha 
}

module.exports = { hashPassword };