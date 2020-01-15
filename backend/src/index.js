const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes')

mongoose.connect('mongodb+srv://omnistack:omnistack123@cluster0-sdmfz.mongodb.net/week10?retryWrites=true&w=majority', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json());

app.use(routes);

app.listen(8080, err =>{
    if(err) console.log(err);
    else console.log('[ Express ] Servidor rodando na porta 8080')
})