const { Controller } = require("../connect/connection")
const express = require("express");
const router = express.Router();

usuario = require("../Models/usuarioModel")

class UsuarioController extends Controller{
    constructor(){
        super(usuario.Usuario, usuario.include, usuario.primary_key)
    }
}

const usuarioController = new UsuarioController();

router.post('/usuario', (req, res) => {
    const rota = req.body.rota;

    console.log(rota);
    switch (rota) {
        case 'INSERT':
            console.log("INSERINDO USUARIO");
            usuarioController.insert(req, res);
            break;

        case 'SELECT':
            console.log("SELECIONANDO USUARIO");
            usuarioController.select(req, res);
            break;

        case 'UPDATE':
            console.log("ATUALIZANDO USUARIO");
            usuarioController.updateById(req, res);
            break;

        case 'DELETE':
            console.log("DELETANDO USUARIO");
            usuarioController.deleteById(req, res);
            break;

        default:
            console.log("ERRO");
            res.sendStatus(400);
            return;
    }
});

module.exports = { usuarioController, router }
