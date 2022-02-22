const sequelize = require("../connect/connection").sequelize;

const CaixaSaldo = sequelize.define('caixas_saldo', {
    id_caixa_saldo: { type: sequelize.Sequelize.INTEGER, primaryKey: true },
    id_caixa: { type: sequelize.Sequelize.INTEGER },
    saldo: { type: sequelize.Sequelize.FLOAT },
    dthr_atualizacao: { type: sequelize.Sequelize.DATE }
}, {
    tableName: 'caixas_saldo',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    freezeTableName: true,
    paranoid: true
});

const include = [];

const primary_key = "id_caixa_saldo";

module.exports = {
    CaixaSaldo,
    include,
    primary_key
};
