// Módulos
    // Verifica estrutura das tabelas
    // Remova o comentario apenas se precisar recriar o arquivo db.sqlite
    const migrations = require('./modules/migrations')    
    const express = require('express');
    const { engine } = require ('express-handlebars');
    const bodyParser = require('body-parser');
    const urls = require('./routes/urls')
    const path = require('path');
    const app = express()

// Configurações
    // Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())

    // Handlerbars
        app.engine('handlebars', engine({ 
            extname: 'handlebars', 
            defaultLayout: 'main', 
            layoutsDir: __dirname + '/views/layouts/'
        }));
        app.set('view engine', 'handlebars');

    // Public
        app.use(express.static(path.join(__dirname, 'public')))

// Rotas
    app.use('/', urls)

// Outros

const port = 3000
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!`)
})