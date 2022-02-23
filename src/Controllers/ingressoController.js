const { Controller } = require("../connect/genericController")
const express = require("express");
const router = express.Router();

const ingressos = require("../Models/ingressoModel")

class IngressosController extends Controller{
    constructor(){
        super(ingressos.Ingressos, ingressos.include, ingressos.primary_key)
    }
}

const ingressosController = new IngressosController();

router.post('/ingressos', (req, res) => {
    const rota = req.body.rota;

    console.log(rota);
    switch (rota) {
        case 'INSERT':
            console.log("INSERINDO INGRESSO");
            ingressosController.insert(req, res);
            break;

        case 'SELECT':
            console.log("SELECIONANDO INGRESSO");
            ingressosController.select(req, res);
            break;

        case 'UPDATE':
            console.log("ATUALIZANDO INGRESSO");
            ingressosController.updateById(req, res);
            break;

        case 'DELETE':
            console.log("DELETANDO INGRESSO");
            ingressosController.deleteById(req, res);
            break;

        default:
            console.log("ERRO");
            res.sendStatus(400);
            return;
    }
});

module.exports = { ingressosController, router }
