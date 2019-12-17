const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Evento = new Schema({
    horaInicio: { type: Number, required: true },
    horaFinal: { type: Number, required: true },
    tatuador: { type: String},
    tipo: { type: String, required: true },
});

const Agenda = new Schema({
    data: { type: Date, required: true },
    horaInicio: { type: Number, required: true },
    horaFinal: { type: Number, required: true },
    eventos: { type: [Evento]},
});

const EstudiosSchema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    agendas: { type: [Agenda]},
}, {
    versionKey: false
});

const Estudios = mongoose.model('Estudios', EstudiosSchema);

module.exports = Estudios;

