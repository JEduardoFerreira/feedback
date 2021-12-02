const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const db = require('../modules/db')
const Usuario = require('../models/usuario')
const passport = require('passport')


router.get('/cadastre-se', (req, res) => { 
    let id_usuario = req.query.id || '';
    if ((id_usuario.length > 0) && (id_usuario != '') && (id_usuario != undefined)){
        let usuario = Usuario.findOne({where: {id: id_usuario}});
        Promise.all([usuario]).then(result => {    
            res.render('usuarios/add_usuario', {
                user: req.user, 
                usuarios: result[0], 
            });
        }).catch((err) => {
            req.flash('error_msg', 'Não foi possível visualizar esta Avaliação no momento!');
            res.redirect('/login'); 
        });
    }else{
        res.render('usuarios/add_usuario');
    }
});

router.post('/usuarios/novo', (req, res) =>{
    var erros = [];
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: 'Valor informado em "Nome" é inválido'});
    }

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: 'Valor informado em "E-mail" é inválido'});
    }
    
    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: 'Valor informado em "Senha" é inválido'});
    }

    if (req.body.senha.length < 4){
        erros.push({texto: 'Senha informada é muito curta!'});
    }

    if (req.body.senha != req.body.senha2){
        erros.push({texto: 'Senha e a Confirmação da Senha são diferentes!'});
    }

    if (erros.length > 0){
        res.render('usuarios/add_usuario', {erros: erros});
    }else{
        let id_usuario = req.query.id || '';
        if ((id_usuario.length > 0) && (id_usuario != '') && (id_usuario != undefined)){
            // Atualização de Usuário.
            Usuario.findOne({where: {id: id_usuario}}).then(usuario => {
                usuario.nome = req.body.nome;
                usuario.email = req.body.manter;
                usuario.senha = req.body.senha;
                avaliacao.save().then(() => {
                    res.flash('success_msg', 'Usuário atualziado com sucesso!');
                    res.redirect('/'); 
                }).catch((err) => {
                    res.flash('error_msg', 'Não foi possível atualizar o Usuário!');
                    res.redirect('/');
                });
            }).catch((err) => {
                req.flash('error_msg', 'Não foi possível visualizar este Usuário no momento!');
                res.redirect('/'); 
            });            
        }else{    
            // Cadastro de Usuário.
            Usuario.findOne({where: {email: req.body.email}}).then(usuario => {        
                if (usuario){
                    req.flash('error_msg', 'Já existe um usuário cadastrado com este e-mail!');
                    res.redirect('/cadastre-se');
                }else{
                    let hash_senha = req.body.senha;
                    bcrypt.genSalt(10, (erro, salt) => {
                        bcrypt.hash(hash_senha, salt, (erro, hash) => {
                            if (erro){
                                req.flash('error_msg', 'Houve um problema ao salvar a senha!');
                                res.redirect('/cadastre-se');
                            }else{
                                const novoUsuario = {
                                    nome: req.body.nome,
                                    email: req.body.email,
                                    senha: hash,
                                }
                                Usuario.create(novoUsuario).then(() => {
                                    req.flash('success_msg', 'Usuário cadastrado com sucesso!');
                                    res.redirect('/login')
                                }).catch((err) => {
                                    req.flash('error_msg', 'Erro ao cadastrar o Usuário!');
                                    res.redirect('/login');
                                });
                            }
                        });
                    });
                }
            }).catch((err) => {
                req.flash('error_msg', 'Houve um erro interno');
                res.redirect('/cadastre-se');
            });
        }
    }
});

router.get('/login', (req, res) => { 
    res.render('usuarios/login');
});

router.post('/login', (req, res, next) => { 
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;