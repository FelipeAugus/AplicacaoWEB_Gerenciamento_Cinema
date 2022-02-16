const express = require('express');
const app = express()

// Usar HTML
const path = __dirname + '/views'
app.use(express.static(path));
app.set('view engine', 'html');
const pathHtml = path + '/htmls'

// usar JSON nas req
app.use(express.json());

app.get('/', async (req, res) => {
    res.sendFile(pathHtml+'/cadastrarFilme.html');
})


const sessaoRoute = require('./Controllers/sessaoController').router
const filmeRoute = require('./Controllers/filmeController').router

app.use("/", filmeRoute);
app.use("/", sessaoRoute);

module.exports = { app }
