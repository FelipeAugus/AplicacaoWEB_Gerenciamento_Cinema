const { Controller } = require("./genericController")
const express = require("express");
const router = express.Router();

sessao = require("../Models/sessaoModel")

class SessaoController extends Controller{
    constructor(){
        super(sessao.Sessao, sessao.include, sessao.primary_key)
    }
}

const sessaoController = new SessaoController();

// Gambiarra. Não recomendo.
router.post('/filmes', (req, res) => {
    const rota = req.body.rota;
    
    console.log(rota);
    switch (rota) {
        case 'INSERT':
        console.log("INSERINDO SESSAO");
        sessaoController.insert(req, res);
        break;

        case 'SELECT':
        console.log("SELECIONANDO SESSAO");
        sessaoController.select(req, res);
        break;

        case 'UPDATE':
        console.log("ATUALIZANDO SESSAO");
        sessaoController.updateById(req, res);
        break;

        case 'DELETE':
        console.log("DELETANDO SESSAO");
        sessaoController.deleteById(req, res);
        break;

        default:
        console.log("ERRO");
        res.sendStatus(400);
        return;
    }
});

module.exports = { sessaoController, router }
