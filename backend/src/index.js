const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

// Conexão com o banco de dados MongoDB
mongoose.connect('mongodb+srv://omnistack:omnistack123@cluster0-sdmfz.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
const server = http.Server(app);

const routes = require('./routes');
const { setupWebsocket } = require('./websocket')

setupWebsocket(server);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(8080, err =>{
    if(err) console.log(err);
    else console.log('[ Express ] Servidor rodando na porta 8080')
})