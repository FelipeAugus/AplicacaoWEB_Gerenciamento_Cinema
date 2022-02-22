const sequelize = require("../connect/connection").sequelize;

const Ingresso = sequelize.define('ingressos', {
    id_ingresso: { type: sequelize.Sequelize.INTEGER, primaryKey: true },
    id_sessao: { type: sequelize.Sequelize.INTEGER },
    id_produto: { type: sequelize.Sequelize.INTEGER }
}, {
    tableName: 'ingresso',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    freezeTableName: true,
    paranoid: true
});

const include = [];

const primary_key = "id_ingresso";

module.exports = {
    Ingresso,
    include,
    primary_key
};
