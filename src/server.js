require('dotenv').config(); // Buscando as variáveis no .env e guardando-as em process.env
const express = require("express"); // Importando a bib express
const app = express() // Criando uma instância "app" com express

// Middleware padrão do express que trata as entradas como JSON
app.use(express.json())

// Criando a rota base da API 
app.get('/', (req, res) => {
    res.send('API is working.');
})

// Faz a API "ouvir" a porta específicada no .env, esperando por requisições HTTP
app.listen(process.env.PORT, () => {
    console.log(`App listening to port ${process.env.PORT}`);
})