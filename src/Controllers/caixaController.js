const { Controller } = require("../connect/connection")
const express = require("express");
const router = express.Router();

sessao = require("../Models/caixaModel")

class CaixaController extends Controller{
    constructor(){
        super(caixas.Caixa, caixas.include, caixas.primary_key)
    }
}

const caixaController = new CaixaController();

// Gambiarra. Não recomendo.
router.post('/caixas', (req, res) => {
    const rota = req.body.rota;

    console.log(rota);
    switch (rota) {
        case 'INSERT':
            console.log("INSERINDO CAIXA");
            caixaController.insert(req, res);
            break;

        case 'SELECT':
            console.log("SELECIONANDO CAIXA");
            caixaController.select(req, res);
            break;

        case 'UPDATE':
            console.log("ATUALIZANDO CAIXA");
            caixaController.updateById(req, res);
            break;

        case 'DELETE':
            console.log("DELETANDO CAIXA");
            caixaController.deleteById(req, res);
            break;

        default:
            console.log("ERRO");
            res.sendStatus(400);
            return;
    }
});

module.exports = { caixaController, router }
