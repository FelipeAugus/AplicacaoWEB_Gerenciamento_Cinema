const pool = require("./connection");

const select = (req, res, entity, includeQuery) => {
    entity.findAll({ where: req.query, include: includeQuery})
    .then(pool.defaultQueryHandler(res))
    .catch(pool.exceptionQueryHandler(res));
};

const updateById = (req, res, entity, includeQuery, primary_key) => {
    var where = {};
    where [primary_key] = req.params.id
    entity.update(req.body, { where: { id_arquivo: where }, returning: true, include: includeQuery })
    .then(pool.defaultQueryHandler(res))
    .catch(pool.exceptionQueryHandler(res));
};

const deleteById = (req, res, entity, includeQuery, primary_key) => {
    var where = {};
    where [primary_key] = req.params.id;
    entity.destroy({ where: where})
    .then(pool.defaultQueryHandler(res))
    .catch(pool.exceptionQueryHandler(res));
};

const insert = (req, res, entity, includeQuery) => {
    entity.upsert(req.body, { returning: true, include: includeQuery })
    .then(pool.defaultQueryHandler(res))
    .catch(pool.exceptionQueryHandler(res));
};

module.exports = {
    select,
    updateById,
    insert,
    deleteById
};
