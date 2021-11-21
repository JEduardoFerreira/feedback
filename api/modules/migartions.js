migrations = (async () => {
    const database = require('./db');
    const Usuario = require('../models/usuario');
    const Avaliacoes = require('../models/avaliacoes');
 
    try {
        const resultado = await database.sync();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
})();

module.exports = migrations