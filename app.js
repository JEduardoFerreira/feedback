// Módulos
    // Verifica estrutura das tabelas
        // Remova o comentario apenas se precisar recriar o arquivo db.sqlite
        //const migrations = require('./modules/migrations');
    const express = require('express');
    const {engine} = require ('express-handlebars');
    const bodyParser = require('body-parser');
    const app = express();
    const urls_index = require('./routes/urls_index');
    const urls_avaliacoes = require('./routes/urls_avaliacoes');
    const urls_usuarios = require('./routes/urls_usuarios');
    const path = require('path');
    const session = require('express-session');
    const flash = require('connect-flash');
    const passport = require('passport')
    require('./config/auth')(passport)

// Configurações
    // Sessão
        app.use(session({
            secret: 'AppFeedBack',
            resave: true,
            saveUninitialized: true,
        }));

        app.use(passport.initialize());
        app.use(passport.session());
        app.use(flash());

    // Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg');
            res.locals.error_msg = req.flash('error_msg');
            res.locals.error = req.flash('error');
            res.locals.user = req.user || null;
            next();
        });

    // Body Parser
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

    // Handlerbars
        app.engine('handlebars', engine({ 
            extname: 'handlebars', 
            defaultLayout: 'main', 
            layoutsDir: __dirname + '/views/layouts/', 
            helpers: require("./helpers/helpers"),
        }));
        app.set('view engine', 'handlebars');

    // Public
        app.use(express.static(path.join(__dirname, 'public')));

// Rotas
    app.use('/', urls_index);
    app.use('/', urls_avaliacoes);
    app.use('/', urls_usuarios);

// Outros

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!`)
});