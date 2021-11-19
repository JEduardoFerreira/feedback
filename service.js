var http = require('http')
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    let path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch (path) {
        case '':
        res.end('Home');
        break;
    case '/sobre':
        res.end(' Eduardo Ferreira - Servidor Node.js');
        break;
    default:
        res.end('Not found');
        break;
    }
}).listen(3000);

console.log('Servidor iniciando em localhost:3000; pressione Ctrl-C para encerrar')