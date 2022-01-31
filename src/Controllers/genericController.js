genericRoutes = require("../DataBase/genericRoutes")

class Controller {
    constructor(entity, includeQuery, primary_key) {
        this.entity = entity
        this.includeQuery = includeQuery
        this.primary_key = primary_key
    }

    insert(req, res) {
        genericRoutes.insert(req, res, this.entity, this.includeQuery)
    }

    select(req, res) {
        genericRoutes.select(req, res, this.entity, this.includeQuery)
    }

    updateById(req, res) {
        genericRoutes.updateById(req, res, this.entity, this.includeQuery, this.primary_key)
    }

    deleteById(req, res) {
        genericRoutes.deleteById(req, res, this.entity, this.includeQuery, this.primary_key)
    }
}

module.exports = { Controller }
