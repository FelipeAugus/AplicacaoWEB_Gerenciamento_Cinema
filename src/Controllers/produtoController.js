const { Controller } = require("../connect/genericController")
const express = require("express");
const router = express.Router();

const produtos = require("../Models/produtoModel")

class ProdutoController extends Controller{
    constructor(){
        super(produtos.Produto, produtos.include, produtos.primary_key)
    }
}

const produtoController = new ProdutoController();

router.post('/produtos', (req, res) => {
    const rota = req.body.rota;

    console.log(rota);
    switch (rota) {
        case 'INSERT':
            console.log("INSERINDO PRODUTOS");
            produtoController.insert(req, res);
            break;

        case 'SELECT':
            console.log("SELECIONANDO PRODUTOS");
            produtoController.select(req, res);
            break;

        case 'UPDATE':
            console.log("ATUALIZANDO PRODUTOS");
            produtoController.updateById(req, res);
            break;

        case 'DELETE':
            console.log("DELETANDO PRODUTOS");
            produtoController.deleteById(req, res);
            break;

        default:
            console.log("ERRO");
            res.sendStatus(400);
            return;
    }
});

module.exports = { produtoController, router }
