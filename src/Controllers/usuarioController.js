const { Controller } = require("./genericController")

usuario = require("../Models/usuarioModel")

class UsuarioController extends Controller{
    constructor(){
        super(usuario.Usuario, usuario.include, usuario.primary_key)
    }
}

const usuarioController = new UsuarioController();

module.exports = { usuarioController }
