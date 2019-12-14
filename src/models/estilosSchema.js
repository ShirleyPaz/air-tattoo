const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EstilosSchema = new Schema(
    {
        id: { type: Number, required: true },
        nome: { type: String, required: true },
    },
    {
        versionKey: false,
    }
);

const Estilos = mongoose.model('Estilos', EstilosSchema);

module.exports = Estilos;

