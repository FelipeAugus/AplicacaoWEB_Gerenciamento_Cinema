const pool= require("../connect/connection");
const { Controller } = require("../connect/genericController")
const express = require("express");
const router = express.Router();

const caixas_saldo = require("../Models/caixaSaldoModel")

class CaixaSaldoController extends Controller{
    constructor(){
        super(caixas_saldo.CaixaSaldo, caixas_saldo.include, caixas_saldo.primary_key)
    }
}

const caixasSaldoController = new CaixaSaldoController();

router.post("/realizaVenda", (req, res) => {
    const params = req.body;
    pool.sequelize.query('call trabalho_optativa2.realizaVenda(:idProduto, :quantidade, :idCaixa);', 
        {replacements: {idProduto: params.idProduto, quantidade: params.quantidade,idCaixa: params.idCaixa}})
    .then(pool.defaultQueryHandler(res))
    .catch(pool.exceptionQueryHandler(res));
});

router.post('/caixas_saldo', (req, res) => {
    const rota = req.body.rota;

    console.log(rota);
    switch (rota) {
        case 'INSERT':
            console.log("INSERINDO CAIXAS_SALDO");
            caixasSaldoController.insert(req, res);
            break;

        case 'SELECT':
            console.log("SELECIONANDO CAIXAS_SALDO");
            caixasSaldoController.select(req, res);
            break;

        case 'UPDATE':
            console.log("ATUALIZANDO CAIXAS_SALDO");
            caixasSaldoController.updateById(req, res);
            break;

        case 'DELETE':
            console.log("DELETANDO CAIXAS_SALDO");
            caixasSaldoController.deleteById(req, res);
            break;

        default:
            console.log("ERRO");
            res.sendStatus(400);
            return;
    }
});

module.exports = { caixasSaldoController, router }
