const express = require('express')
const router = express.Router()
const db = require('../modules/db')


router.get('/', (req, res) => {
    db.query(`
        SELECT
            a.id, a.id_usuario_avaliador, (u1.nome)AS nome_avaliador, 
            a.id_usuario_avaliado, (u2.nome)AS nome_avaliado, 
            a.melhorar, a.manter, a.sugestoes, a.avaliaco_final, 
            datetime(a.createdAt)AS createdAt, 
            datetime(a.updatedAt)AS updatedAt
        FROM avaliacoes a
        LEFT JOIN usuarios u1
            ON u1.id = a.id_usuario_avaliador
        LEFT JOIN usuarios u2
            ON u2.id = a.id_usuario_avaliado
        ORDER BY a.updatedAt DESC
        LIMIT 0,4
    `).then((avaliacoes) => {
        res.render('index', {avaliacoes: avaliacoes[0]})
    }).catch((err) => {
        req.flash('error_msg', 'Não foi possível atualizar os dados!');
        res.render('index');
    });

});

module.exports = router;