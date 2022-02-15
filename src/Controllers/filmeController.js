const { Controller } = require("./genericController")

filme = require("../Models/filmeModel")

class FilmeController extends Controller{
    constructor(){
        super(filme.Filme, filme.include, filme.primary_key)
    }
}

const filmeController = new FilmeController();

module.exports = { filmeController }
