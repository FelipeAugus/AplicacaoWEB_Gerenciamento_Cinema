const { Controller } = require("../connect/connection")
const express = require("express");
const router = express.Router();

filme = require("../Models/filmeModel")

class FilmeController extends Controller{
    constructor(){
        super(filme.Filme, filme.include, filme.primary_key)
    }
}

const filmeController = new FilmeController();

router.post('/filmes', (req, res) => {
    const rota = req.body.rota;
    
    console.log(rota);
    switch (rota) {
        case 'INSERT':
        console.log("INSERINDO FILME");
        filmeController.insert(req, res);
        break;

        case 'SELECT':
        console.log("SELECIONANDO FILME");
        filmeController.select(req, res);
        break;

        case 'UPDATE':
        console.log("ATUALIZANDO FILME");
        filmeController.updateById(req, res);
        break;

        case 'DELETE':
        console.log("DELETANDO FILME");
        filmeController.deleteById(req, res);
        break;

        default:
        console.log("ERRO");
        res.sendStatus(400);
        return;
    }
});

module.exports = { filmeController, router }
