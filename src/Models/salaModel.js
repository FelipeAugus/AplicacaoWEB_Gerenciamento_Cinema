const sequelize = require("../DataBase/connection").sequelize;

const Sala = sequelize.define('salas', {
    id_sala: { type: sequelize.Sequelize.INTEGER, primaryKey: true },
    capacidade: { type: sequelize.Sequelize.INTEGER },
    numero_sala: { type: sequelize.Sequelize.INTEGER }
}, {
    tableName: 'salas',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    freezeTableName: true,
    paranoid: true
});

const include = [];

const primary_key = "id_sala";

module.exports = {
    Sala,
    include,
    primary_key
};
