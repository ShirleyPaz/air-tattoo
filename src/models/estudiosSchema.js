const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const EstudiosSchema = new Schema(
//     {
//         id: { type: Number, required: true },
//         nome: { type: String, required: true },
//         email: { type: String, required: true },
//         endLogradouro: { type: String, required: true },
//         endNumero: { type: Number, required: true },
//         cep: { type: String, required: true },
//         agenda: [
//             {
//                 data: { type: Date, required: true },
//                 horaInicio: { type: Number, required: true },
//                 horaFinal: { type: Number, required: true },
//                 eventos: [
//                     {
//                         id: { type: Number, required: true },
//                         horaInicio: { type: Number, required: true },
//                         horaFinal: { type: Number, required: true },
//                         tatuador: { type: String },
//                         tipo: { type: String, required: true },
//                     }
//                 ],
//             }]
//     }, {
//     versionKey: false
// });

// const Estudios = mongoose.model('Estudios', EstudiosSchema);

// module.exports = Estudios;

const Evento = new Schema({
    // id: Number, 
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

