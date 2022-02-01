const sequelize = require("../DataBase/connection").sequelize;

const Usuario = sequelize.define('usuario', {
    idUsuario: { type: sequelize.Sequelize.INTEGER, primaryKey: true },
    Nome: { type: sequelize.Sequelize.TEXT },
    Endereco: { type: sequelize.Sequelize.TEXT },
}, {
    tableName: 'usuarios',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    freezeTableName: true,
    paranoid: true
});

const include = [];

const primary_key = "idUsuario";

module.exports = {
    Usuario,
    include,
    primary_key
};
