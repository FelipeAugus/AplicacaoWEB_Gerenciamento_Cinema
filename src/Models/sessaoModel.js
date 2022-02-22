const sequelize = require("../connect/connection").sequelize;

const Sessao = sequelize.define('sessao', {
    idSessao: { type: sequelize.Sequelize.INTEGER, primaryKey: true },
    idFilme: { type: sequelize.Sequelize.INTEGER },
    idSala: { type: sequelize.Sequelize.INTEGER },
    Hora_Inicio: { type: sequelize.Sequelize.DATE },
    Hora_FIm: { type: sequelize.Sequelize.DATE }
}, {
    tableName: 'sessao',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    freezeTableName: true,
    paranoid: true
});

const include = [];

const primary_key = "idSessao";

module.exports = {
    Sessao,
    include,
    primary_key
};
