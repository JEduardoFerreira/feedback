const migrations = require('./modules/migartions')
const express = require('express')
const app = express()
const cors = require('cors')
const Usuario = require('./models/usuario')
const Avaliacoes = require('./models/avaliacoes')

const alunos = [
    {
        nome: 'Pedro',
        idade: 12
    },
    {
        nome: 'Clara',
        idade: 13
    },
    {
        nome: 'Robson',
        idade: 14
    },
    {
        nome: 'Luana',
        idade: 15
    }
]

app.use(cors())

app.get('/api/alunos', function (req, res) {
    res.send(alunos)
});

app.get('/api/usuarios', async function (req, res) {
    const usuarios = await Usuario.findAll();
    res.send(usuarios)
});

app.get('/api/avaliacoes', async function (req, res) {
    const avaliacoes = await Avaliacoes.findAll();
    res.send(avaliacoes)
});

app.listen(3000);