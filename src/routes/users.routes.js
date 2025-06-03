const express = require('express'); // Fazendo o import do express
const router = express.Router(); // Gerando um Router para guardar o pacote de rotas que vai ser criado nesse arquivo
const validate = require('../middlewares/validate'); // Puxamos o middleweare padrão criado para válidar schemas
const userSchema = require('../schemas/userSchema'); // Puxamos o Schema de Users
const { hashPassword } = require('../utils/hash'); // Function para gerar hash de senha
const users = require('../data/users') // Simulador de banco de dados
const { generateToken } = require('../utils/jwt') // Function para gerar token de usuário 

// Criando rota para cadastro de usuários
// Primeiro executa o middleware "validate" para checar os dados com o schema. Só se a validação passar e o "next()" for chamado, a função abaixo será executada.
router.post('/cadastro', validate(userSchema), (req, res) => { 
    // Guardando os dados do body em variáveis
    const { user, password } = req.body;
    
    // Gerando a hash da password para guardar no banco 
    const hashedPassword = hashPassword(password);

    // Criando novo usuário 
    const newUser = { user, password: hashedPassword};

    // Inserindo dados no "banco de dados" (array em memória POR ENQUANTO)
    users.push(newUser);

    // Respondendo com sucesso 
    res.status(201).json({ message: 'User registered successfully!', user: newUser.user });
})

// Criando rota para Login de usuários
// Primeiro executa o middleware "validate" para checar os dados com o schema. Só se a validação passar e o "next()" for chamado, a função abaixo será executada.
router.post('/login', validate(userSchema), (req, res) => {
    // Guarda os dados do body em variáveis 
    const { user, password } = req.body;

    // Gerando hash de password
    const hashedPassword = hashPassword(password);

    // Faz a consulta no banco verificando se o User tem cadastro
    const login = users.find(u => u.user === user && u.password === hashedPassword); // Retorna o user, caso tenhamos

    if (login) {
        // Gera o Token do usuário
        const userToken = generateToken(login);
        // Retorna o Token
        return res.status(200).json({ 
            message: 'You\'re logged in!',
            user: login.user,
            userToken: userToken});
    } else {
        // Caso não tenha cadastro, retorna 401
        return res.status(401).json({ message: 'Invalid user or password.' });
    }
})

module.exports = router; // Exportando o pacote de rotas que criamos nesse arquivo para usar no server.js