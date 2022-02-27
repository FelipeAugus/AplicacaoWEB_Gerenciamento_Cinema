const sequelize = require("../connect/connection").sequelize;

const SessaoSala = sequelize.define('sessoes_salas', {
    id_sessao: { type: sequelize.Sequelize.INTEGER },
    id_sala: { type: sequelize.Sequelize.INTEGER },
    numero_sala: { type: sequelize.Sequelize.INTEGER },
    id_filme: { type: sequelize.Sequelize.INTEGER },
    nome_filme: { type: sequelize.Sequelize.TEXT },
    tempo_minutos_filme: { type: sequelize.Sequelize.INTEGER },
    fim_da_sessao: { type: sequelize.Sequelize.DATE }
}, {
    tableName: 'sessoes_salas',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    freezeTableName: true,
    paranoid: true
});

const include = [];

SessaoSala.removeAttribute("id");
const primary_key = "";

module.exports = {
    SessaoSala,
    include,
    primary_key
};
