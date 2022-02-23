const express = require('express');
const app = express()

// Usar HTML
const path = __dirname + '/views'
app.use(express.static(path));
app.set('view engine', 'html');

// usar JSON nas req
app.use(express.json());

app.get('/', async (req, res) => {
    res.sendFile('/index.html');
});


const caixaRoute = require('./Controllers/caixaController').router;
const caixaSaldoRoute = require('./Controllers/caixaSaldoController').router;
const filmeRoute = require('./Controllers/filmeController').router;
const ingressoRoute = require('./Controllers/ingressoController').router;
const produtoRoute = require('./Controllers/produtoQuantidadeController').router;
const produtoQuantidadeRoute = require('./Controllers/produtoQuantidadeController').router;
const salaRoute = require('./Controllers/salaController').router;
const sessaoRoute = require('./Controllers/sessaoController').router;

app.use("/", caixaRoute);
app.use("/", caixaSaldoRoute);
app.use("/", filmeRoute);
app.use("/", ingressoRoute);
app.use("/", produtoRoute);
app.use("/", produtoQuantidadeRoute);
app.use("/", salaRoute);
app.use("/", sessaoRoute);

module.exports = { app }
