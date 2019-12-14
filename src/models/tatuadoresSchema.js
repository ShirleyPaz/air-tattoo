const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tatuadorSchema = new Schema(
    {   
        id: { type: Number, required: true },
        nome: { type: String, required: true },
        email: { type: String, required: true },
        estilo: { type: String, required: true },
    },
    {
        versionKey: false,
    }
);

const tatuador = mongoose.model('tatuador', tatuadorSchema);

module.exports = tatuador;

