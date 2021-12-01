const localStrategy = require('passport-local').Strategy;
const db = require('../modules/db');
const bcrypt = require('bcryptjs');

require('../models/usuario')
const Usuario = require('../models/usuario')

module.exports = (passport) => {
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) => {
        Usuario.findOne({where: {email: email}}).then(usuario => {
            if (!usuario){
                return done(null, false, {message: 'Esta conta não existe!'});
            }
            bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                if (batem){
                    return done(null, usuario);
                }else{
                    return done(null, false, {message: 'Senha incorreta'});
                }

            });
        });
    }));

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id);
    });

    passport.deserializeUser((id, done) => {
        Usuario.findOne({where: {id: id}}).then((usuario, err) =>{
            done(err, usuario);
        });
    });
}