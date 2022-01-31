const port = 3000

const { sessaoController } = require("./Controllers/sessaoController");
const { usuarioController } = require("./Controllers/usuarioController");


const { sequelize } = require("./DataBase/connection");
const express = require('express');
const app = express()

app.get('/', async (req, res) => {
  usuarioController.select(req, res);
    // res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App rodando na porta: ${port}`)
})
