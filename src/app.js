const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Conexão com BD
mongoose.connect('mongodb+srv://airtattoo:LdHpNNOdvuHmtmRn@airttattoo-1skm7.mongodb.net/',{
useNewUrlParser: true
});

let db = mongoose.connection;

db.on('error', console.log.bind(console, 'connection error: '));
db.once('open', () => {console.log('conexão realizada')});

// Define Rotas
const index = require('./routes/index');
const tatuadores = require('./routes/tatuadores');
const estudios = require('./routes/estudios');

// bodyParser
app.use(express.static("public"));
app.use(bodyParser.json());

// Rotas
app.use("/", index);
app.use('/tatuadores',tatuadores);
app.use('/estudios', estudios);

module.exports = app;