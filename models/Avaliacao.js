const Sequelize = require('sequelize');
const database = require('../modules/db');
 
const Avaliacao = database.define('avaliacoes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_usuario_avaliador: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_usuario_avaliado: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    melhorar: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    manter: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    sugestoes: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    avaliaco_final: {
        type: Sequelize.TEXT,
        allowNull: true
    }
})
 
module.exports = Avaliacao;