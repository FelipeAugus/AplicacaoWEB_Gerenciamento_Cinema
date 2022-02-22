const { Controller } = require("../connect/connection")
const express = require("express");
const router = express.Router();

sessao = require("../Models/produtoQuantidadeModel")

class ProdutoQuantidadeController extends Controller{
    constructor(){
        super(produtos_quantidade.ProdutoQuantidade, produtos_quantidade.include, produtos_quantidade.primary_key)
    }
}

const produtoQuantidadeController = new ProdutoQuantidadeController();

router.post('/produtos_quantidade', (req, res) => {
    const rota = req.body.rota;

    console.log(rota);
    switch (rota) {
        case 'INSERT':
            console.log("INSERINDO PRODUTO_QUANTIDADE");
            produtoQuantidadeController.insert(req, res);
            break;

        case 'SELECT':
            console.log("SELECIONANDO PRODUTO_QUANTIDADE");
            produtoQuantidadeController.select(req, res);
            break;

        case 'UPDATE':
            console.log("ATUALIZANDO PRODUTO_QUANTIDADE");
            produtoQuantidadeController.updateById(req, res);
            break;

        case 'DELETE':
            console.log("DELETANDO PRODUTO_QUANTIDADE");
            produtoQuantidadeController.deleteById(req, res);
            break;

        default:
            console.log("ERRO");
            res.sendStatus(400);
            return;
    }
});

module.exports = { produtoQuantidadeController, router }
