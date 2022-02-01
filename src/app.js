const { sessaoController } = require("./Controllers/sessaoController");
const { usuarioController } = require("./Controllers/usuarioController");

const express = require('express');
const app = express()

const path = __dirname + '/views'
app.use(express.static(path));
app.set('view engine', 'html');


const pathHtml = __dirname + '/views'
app.get('/', async (req, res) => {
    res.sendFile(pathHtml+'/index.html');
})

app.get('/abc', async (req, res) => {
  usuarioController.select(req, res);
})

module.exports = { app }
