const express = require('express')
const router = express.Router()
const db = require('../modules/db')
const Avaliacao = require('../models/Avaliacao')


router.get('/admin', (req, res) =>{
    res.render('pages/index')
})

// Avaliações
    router.get('/avaliacoes', (req, res) =>{
        res.render('pages/avaliacoes')
    });

    router.get('/avaliacoes/add', (req, res) =>{
        res.render('pages/add_avaliacoes')
    });

    router.post('/avaliacoes/nova', (req, res) =>{
        const novaAvaliaco = {
            id_usuario_avaliador: 0,
            id_usuario_avaliado: 0,
            melhorar: req.body.melhorar,
            manter: req.body.manter,
            sugestoes: req.body.avaliacao_final
        }
        Avaliacao.create(novaAvaliaco).then(() => {
            console.log('Avaliação cadastrada com sucesso!');
        }).catch((err) => {
            console.log('Erro ao salvar a Avaliação!');
        });
    })

module.exports = router