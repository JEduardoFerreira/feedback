migrations = (async () => {
    const database = require('./db');
    const Usuario = require('../models/Usuario');
    const Avaliacoes = require('../models/Avaliacao');
 
    try {
        const resultado = await database.sync();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
})();

module.exports = migrations