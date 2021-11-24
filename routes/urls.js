const express = require('express')
const router = express.Router()
const db = require('../modules/db')
const Avaliacao = require('../models/Avaliacao')
const Usuario = require('../models/usuario')


router.get('/admin', (req, res) =>{
    res.render('pages/index')
})

// Avaliações
    router.get('/avaliacoes', (req, res) =>{
        db.query(`
            SELECT
                a.id_usuario_avaliador, (u1.nome)AS nome_avaliador, 
                a.id_usuario_avaliado, (u2.nome)AS nome_avaliado, 
                a.melhorar, a.manter, a.sugestoes, a.avaliaco_final, 
                a.createdAt, STRFTIME("%d/%m/%Y %H:%M", a.updatedAt)AS updatedAt
            FROM avaliacoes a
            LEFT JOIN usuarios u1
                ON u1.id = a.id_usuario_avaliador
            LEFT JOIN usuarios u2
                ON u2.id = a.id_usuario_avaliado
            ORDER BY a.updatedAt DESC
        `).then((avaliacoes) => {
            res.render('pages/avaliacoes', {avaliacoes: avaliacoes[0]})
        }).catch((err) => {
            req.flash('error_msg', 'Erro ao listar Avaliações!');
            res.redirect('/avaliacoes');
        });
    });

    router.get('/avaliacoes/add', (req, res) =>{
        res.render('pages/add_avaliacoes')
    });

    router.post('/avaliacoes/nova', (req, res) =>{
        var erros = [];
        if (!req.body.melhorar || typeof req.body.melhorar == undefined || req.body.melhorar == null){
            erros.push({texto: 'Valor informado em "Melhorar" é inválido'});
        }

        if (!req.body.manter || typeof req.body.manter == undefined || req.body.manter == null){
            erros.push({texto: 'Valor informado em "Manter" é inválido'});
        }
        
        if (!req.body.sugestoes || typeof req.body.sugestoes == undefined || req.body.sugestoes == null){
            erros.push({texto: 'Valor informado em "Sugestões" é inválido'});
        }

        if (!req.body.avaliaco_final || typeof req.body.avaliaco_final == undefined || req.body.avaliaco_final == null){
            erros.push({texto: 'Valor informado em "Avaliação Final" é inválido'});
        }

        if (erros.length > 0){
            res.render('pages/add_avaliacoes', {erros: erros});
        }else{
            const novaAvaliaco = {
                id_usuario_avaliador: 0,
                id_usuario_avaliado: 0,
                melhorar: req.body.melhorar,
                manter: req.body.manter,
                sugestoes: req.body.sugestoes,
                avaliaco_final: req.body.avaliaco_final
            }
            Avaliacao.create(novaAvaliaco).then(() => {
                req.flash('success_msg', 'Avaliação registrada com sucesso!');
                res.redirect('/avaliacoes')
            }).catch((err) => {
                req.flash('error_msg', 'Erro ao registrar a Avaliação!');
                res.redirect('/avaliacoes');
            });
        }
    });

module.exports = router