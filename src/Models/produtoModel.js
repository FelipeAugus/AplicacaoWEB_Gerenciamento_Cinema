const sequelize = require("../connect/connection").sequelize;

const Produto = sequelize.define('produtos', {
    id_produto: { type: sequelize.Sequelize.INTEGER, primaryKey: true },
    nome_produto: { type: sequelize.Sequelize.TEXT },
    valor: { type: sequelize.Sequelize.FLOAT },
    dthr_criacao: { type: sequelize.Sequelize.DATE },
    dthr_atualizacao: { type: sequelize.Sequelize.DATE }
}, {
    tableName: 'produtos',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    freezeTableName: true,
    paranoid: true
});

const include = [];

const primary_key = "id_produto";

module.exports = {
    Produto,
    include,
    primary_key
};
