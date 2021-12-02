const express = require('express')
const router = express.Router()
const db = require('../modules/db')
const Avaliacao = require('../models/Avaliacao')
const Usuario = require('../models/usuario')
const { Op } = require("sequelize");


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
    let mod = req.query.mod || 'view';
    let user_id = '';

    if (req.user){user_id = req.user.id;}
    
    if ((mod != 'exc') && (user_id != '')){
        res.statusCode = 401;
        req.flash('error_msg', 'Isso parece estranho, você não pode acessar aqui!');
        res.redirect('/avaliacoes'); 
    }else{
        let id_avaliacao = req.query.id || '';
        if ((id_avaliacao.length > 0) && (id_avaliacao != '') && (id_avaliacao != undefined)){
            let avaliacao = Avaliacao.findOne({where: {id: id_avaliacao}});
            Promise.all([avaliacao]).then(result => {
                let avaliacao = result[0];
                if (avaliacao.id_usuario_avaliador != user_id){
                    res.statusCode = 401;
                    req.flash('error_msg', 'Você não pode fazer isso!');
                    res.redirect('/avaliacoes'); 
                }else{
                    Avaliacao.destroy({where: {id: id_avaliacao}}).then(avaliacao => {
                        req.flash('success_msg', 'Avaliação excluída com sucesso!');
                        res.redirect('/avaliacoes');
                    }).catch((err) => {
                        req.flash('error_msg', 'Não foi possível excluir esta Avaliação!');
                        res.redirect('/avaliacoes'); 
                    });
                }
            });
        }else{
            res.redirect('/avaliacao');
        }
    }
});

router.get('/avaliacoes/add', (req, res) => { 
    let id_avaliacao = req.query.id || '';
    let mod = req.query.mod || 'view';
    let user_id = '';

    if (req.user){user_id = req.user.id;}

    if ((mod == 'insert' || mod == 'edit') && user_id == ''){
        res.statusCode = 401;
        req.flash('error_msg', 'Isso parece estranho, você não pode acessar aqui!');
        res.redirect('/avaliacoes'); 
    }else{
        if ((id_avaliacao.length > 0) && (id_avaliacao != '') && (id_avaliacao != undefined)){
            let usuarios = Usuario.findAll({order: [['nome', 'ASC'],],});
            let avaliacao = Avaliacao.findOne({where: {id: id_avaliacao}});
            Promise.all([avaliacao, usuarios]).then(result => { 
                let avaliacao = result[0];
                let usuarios = result[1];
                if ((avaliacao.id_usuario_avaliador != user_id) && mod != 'view'){
                    res.statusCode = 401;
                    req.flash('error_msg', 'Você não pode fazer isso!');
                    res.redirect('/avaliacoes'); 
                }else{
                    let status1 = '';
                    let status2 = '';
                    if (mod == 'view'){
                        status1 = 'readonly';
                        status2 = 'readonly';
                    }else if (mod == 'edit'){
                        status1 = '';
                        status2 = 'readonly';
                    }else{
                        status1 = '';
                        status2 = '';
                    }
                    res.render('avaliacoes/add_avaliacao', {
                        user: req.user, 
                        avaliacao: avaliacao, 
                        usuarios: usuarios, 
                        status: status1, 
                        status2: status2,
                    });
                }
            }).catch((err) => {
                req.flash('error_msg', 'Não foi possível visualizar esta Avaliação no momento!');
                res.redirect('/avaliacoes'); 
            });
        }else{
            let usuarios = Usuario.findAll({
                where: {id: {[Op.ne]: user_id}},
                order: [['nome', 'ASC'],],
            });
            Promise.all([usuarios]).then(result => {
                res.render('avaliacoes/add_avaliacao', {
                    user: req.user, 
                    usuarios: result[0]
                });
            }).catch((err) => {
                req.flash('error_msg', 'Não foi possível carregar a pagina!');
                res.redirect('/avaliacoes'); 
            });
                
        }
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
        let id_avaliacao = req.body.id;
        if ((id_avaliacao.length > 0) && (id_avaliacao != '') && (id_avaliacao != undefined)){
            // Edição de Avaliação.
            Avaliacao.update(
                {
                    melhorar: req.body.melhorar,
                    manter: req.body.manter,
                    sugestoes: req.body.sugestoes,
                    avaliaco_final: req.body.avaliaco_final, 
                },
                {
                    where: {id: id_avaliacao}
                }
            ).then(() => {
                req.flash('success_msg', 'Avaliação atualziada com sucesso!');
                res.redirect('/avaliacoes'); 
            }).catch((err) => {
                req.flash('error_msg', 'Não foi possível atualizar a Avaliação!');
                res.redirect('/avaliacoes');
            });          
        }else{            
            // Cadastro de Avaliação.
            const novaAvaliaco = {
                id_usuario_avaliador: req.user.id,
                id_usuario_avaliado: req.body.id_avaliado,
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