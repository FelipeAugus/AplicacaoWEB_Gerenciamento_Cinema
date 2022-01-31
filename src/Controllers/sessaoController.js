const { Controller } = require("./genericController")

sessao = require("../Models/sessaoModel")

class SessaoController extends Controller{
    constructor(){
        super(sessao.Sessao, sessao.include, sessao.primary_key)
    }
}

const sessaoController = new SessaoController();

module.exports = { sessaoController }
