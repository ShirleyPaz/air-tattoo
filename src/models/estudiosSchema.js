const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EstudiosSchema = new Schema(
    {
        id: { type: Number, required: true },
        nome: { type: String, required: true },
        email: { type: String, required: true },
        endLogradouro: { type: String, required: true },
        endNumero: { type: Number, required: true },
        cep: { type: Number, required: true },
        agenda: [
            {
                id: { type: Number, required: true },
                data: { type: Date, required: true },
                horaInicio: { type: String, required: true },
                horaFinal: { type: String, required: true },
                eventos: [
                    {
                        id: { type: Number, required: true },
                        horaInicio: { type: String, required: true },
                        horaFinal: { type: String, required: true },
                        tatuador: { type: String },
                        tipo: { type: String, required: true },
                    }
                ],
            }]
    }, {
    versionKey: false
});

const Estudios = mongoose.model('Estudios', EstudiosSchema);

module.exports = Estudios;

