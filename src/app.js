const { filmeController } = require("./Controllers/filmeController");
const { usuarioController } = require("./Controllers/usuarioController");

const express = require('express');
const app = express()

const path = __dirname + '/views'
app.use(express.static(path));
app.set('view engine', 'html');


const pathHtml = path + '/htmls'
app.get('/', async (req, res) => {
    res.sendFile(pathHtml+'/cadastrarFilme.html');
})

app.get('/filmes', async (req, res) => {
  filmeController.select(req, res);
})

module.exports = { app }
