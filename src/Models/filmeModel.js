const sequelize = require("../connect/connection").sequelize;

const Filme = sequelize.define('filmes', {
    id_filme: { type: sequelize.Sequelize.INTEGER, primaryKey: true },
    nome: { type: sequelize.Sequelize.TEXT },
    tempo_minutos_filme: { type: sequelize.Sequelize.INTEGER },
    imagem_filme: { type: sequelize.Sequelize.TEXT },
}, {
    tableName: 'filmes',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    freezeTableName: true,
    paranoid: true
});

const include = [];

const primary_key = "id_filme";

module.exports = {
    Filme,
    include,
    primary_key
};
