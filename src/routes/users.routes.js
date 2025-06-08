const express = require('express'); // Fazendo o import do express
const router = express.Router(); // Gerando um Router para guardar o pacote de rotas que vai ser criado nesse arquivo
const validate = require('../middlewares/validate'); // Puxamos o middleweare padrão criado para válidar schemas
const userSchema = require('../schemas/userSchema'); // Puxamos o Schema de Users
const { hashPassword, comparePassword } = require('../utils/hash'); // Function para gerar hash de senha
const { generateToken } = require('../utils/jwt') // Function para gerar token de usuário 
// const users = require('../data/users') // Simulador de banco de dados
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criando rota para cadastro de usuários
// Primeiro executa o middleware "validate" para checar os dados com o schema. Só se a validação passar e o "next()" for chamado, a função abaixo será executada.
router.post('/cadastro', validate(userSchema), async (req, res) => { 
    // Guardando os dados do body em variáveis
    const { user, password } = req.body;
    // Gerando a hash da password para guardar no banco 
    const hashedPassword = await hashPassword(password);
    // Verificando se o usuário já existe no banco de dados
    const userExists = await prisma.user.findUnique({
        where: { username: user },
    });

    // Se o usuário não existe
    if (!userExists)
    {
        // Inserindo dados no banco de dados
        try {
            await prisma.user.create({
                data: {
                    username: user,
                    password: hashedPassword,
                }
            });
        } catch (error) {
            return res.status(500).json({ message: 'Error registering user.' });
        }
        // Respondendo com sucesso 
        return res.status(201).json({ message: 'User registered successfully!', user: user });
    } else {
        // Respondendo que o user já existe
        return res.status(409).json({ message: 'User already exists.' })
    }
})

// Criando rota para Login de usuários
// Primeiro executa o middleware "validate" para checar os dados com o schema. Só se a validação passar e o "next()" for chamado, a função abaixo será executada.
router.post('/login', validate(userSchema), async (req, res) => {
    // Guarda os dados do body em variáveis 
    const { user, password } = req.body;
    // Faz a consulta no banco verificando se o User tem cadastro
    const login = await prisma.user.findUnique({
        where: { username: user },
    })

    // Se encontrou o usuário
    if (login && await comparePassword(password, login.password)) {
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