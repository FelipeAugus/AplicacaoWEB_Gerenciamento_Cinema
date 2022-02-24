const sequelize = require("../connect/connection").sequelize;

const Sessao = sequelize.define('sessao', {
    id_sessao: { type: sequelize.Sequelize.INTEGER, primaryKey: true },
    id_filme: { type: sequelize.Sequelize.INTEGER },
    dthr_inicio_sessao: { type: sequelize.Sequelize.DATE },
    dthr_fim_sessao: { type: sequelize.Sequelize.DATE },
    id_sala: { type: sequelize.Sequelize.INTEGER },
    dthr_criacao: { type: sequelize.Sequelize.DATE }
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

const primary_key = "id_sessao";

module.exports = {
    Sessao,
    include,
    primary_key
};
