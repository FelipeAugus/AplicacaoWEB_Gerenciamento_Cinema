const sequelize = require("../DataBase/connection").sequelize;

const Caixa = sequelize.define('caixas', {
    id_caixa: { type: sequelize.Sequelize.INTEGER, primaryKey: true },
    nome_caixa: { type: sequelize.Sequelize.TEXT },
    dthr_criacao: { type: sequelize.Sequelize.DATE }
}, {
    tableName: 'caixas',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    freezeTableName: true,
    paranoid: true
});

const include = [];

const primary_key = "id_caixa";

module.exports = {
    Caixa,
    include,
    primary_key
};
