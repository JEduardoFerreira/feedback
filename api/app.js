const express = require('express')
const app = express()
const cors = require('cors')

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
})
app.listen(3000)