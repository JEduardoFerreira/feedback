const express = require('express')
const router = express.Router()
const db = require('../modules/db')
const Avaliacao = require('../models/Avaliacao')
const Usuario = require('../models/usuario')


// Avaliações
router.get('/avaliacoes', (req, res) => {
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
    `).then((avaliacoes) => {
        res.render('avaliacoes/avaliacoes', {
            user: req.user, 
            avaliacoes: avaliacoes[0],
        });
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao listar Avaliações!');
        res.redirect('/avaliacoes');
    });
});

router.get('/avaliacoes/exc', (req, res) => {
    let id_avaliacao = req.query.id || '';
    if ((id_avaliacao.length > 0) && (id_avaliacao != '') && (id_avaliacao != undefined)){
        Avaliacao.destroy({where: {id: id_avaliacao}}).then(avaliacao => {
            req.flash('success_msg', 'Avaliação excluída com sucesso!');
            res.redirect('/avaliacoes');
        }).catch((err) => {
            req.flash('error_msg', 'Não foi possível excluir esta Avaliação!');
            res.redirect('/avaliacoes'); 
        });            
    }else{
        res.redirect('/avaliacao');
    }
});

router.get('/avaliacoes/add', (req, res) => { 
    let id_avaliacao = req.query.id || '';
    if ((id_avaliacao.length > 0) && (id_avaliacao != '') && (id_avaliacao != undefined)){
        let usuarios = Usuario.findAll();
        let avaliacao = Avaliacao.findOne({where: {id: id_avaliacao}});
        let status = 'readonly';

        Promise.all([avaliacao, usuarios, status]).then(result => {    
            res.render('avaliacoes/add_avaliacao', {
                user: req.user, 
                avaliacao: result[0], 
                usuarios: result[1], 
                status: result[2], 
            });
        }).catch((err) => {
            req.flash('error_msg', 'Não foi possível visualizar esta Avaliação no momento!');
            res.redirect('/avaliacoes'); 
        });
    }else{
        res.render('avaliacoes/add_avaliacao');
    }
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
        res.render('avaliacoes/add_avaliacao', {erros: erros});
    }else{
        let id_avaliacao = req.query.id || '';
        if ((id_avaliacao.length > 0) && (id_avaliacao != '') && (id_avaliacao != undefined)){
            // Cadastro de Avaliação.
            Avaliacao.findOne({where: {id: id_avaliacao}}).then(avaliacao => {
                avaliacao.melhorar = req.body.melhorar;
                avaliacao.manter = req.body.manter;
                avaliacao.sugestoes = req.body.sugestoes;
                avaliacao.avaliaco_final = req.body.avaliaco_final;
                avaliacao.save().then(() => {
                    res.flash('success_msg', 'Avaliação atualziada com sucesso!');
                    res.redirect('/avaliacoes'); 
                }).catch((err) => {
                    res.flash('error_msg', 'Não foi possível atualizar a Avaliação!');
                    res.redirect('/avaliacoes');
                });
            }).catch((err) => {
                req.flash('error_msg', 'Não foi possível visualizar esta Avaliação no momento!');
                res.redirect('/avaliacoes'); 
            });            
        }else{            
            // Atualização de Avaliação.
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
    }
});

module.exports = router;