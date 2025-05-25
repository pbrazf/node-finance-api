const { z } = require('zod'); // Importando o zod e atribuindo a uma variável

// Fazendo um schema para os Users, isso vai garantir que a entrada seja "válida" de acordo com os parâmetros
const userSchema = z.object({
    user: z.string().min(3),
    password: z.string().min(6),
});

module.exports = userSchema;