const Tatuador = require('../models/tatuadoresSchema')

exports.get = (req, res) => {
    Tatuador.find()
        .then((tatuadores) => {
            res.status(200).send(tatuadores);
        })
        .catch((e) => {
            res.status(500).send(e)
        })
};

exports.post = (req, res) => {
    Tatuador.find()
        .then((tatuadores) => {
            const nextId = tatuadores.length == 0 ? 0 : tatuadores[tatuadores.length - 1].id + 1
            let tatuador = new Tatuador(req.body);
            tatuador.id = nextId;
            tatuador.nome = tatuador.nome.toLowerCase();
            tatuador.save()
            return res.status(201).send({ tatuador })
        })
        .catch((e) => {
            res.status(500).send(e)
        })
}





