const { Controller } = require("../connect/genericController")
const express = require("express");
const router = express.Router();

const salas = require("../Models/salaModel")

class SalaController extends Controller{
    constructor(){
        super(salas.Sala, salas.include, salas.primary_key)
    }
}

const salaController = new SalaController();

router.post('/salas', (req, res) => {
    const rota = req.body.rota;

    console.log(rota);
    switch (rota) {
        case 'INSERT':
            console.log("INSERINDO SALA");
            salaController.insert(req, res);
            break;

        case 'SELECT':
            console.log("SELECIONANDO SALA");
            salaController.select(req, res);
            break;

        case 'UPDATE':
            console.log("ATUALIZANDO SALA");
            salaController.updateById(req, res);
            break;

        case 'DELETE':
            console.log("DELETANDO SALA");
            salaController.deleteById(req, res);
            break;

        default:
            console.log("ERRO");
            res.sendStatus(400);
            return;
    }
});

module.exports = { salaController, router }
