const Estilo = require('../models/estilosSchema')

exports.post = (req, res) => {
    Estilo.find()
    .then((estilos) => {
        res.status(200).send(estilos);
        const nextId = estilos.length == 0 ? 0 : estilos[estilos.length-1].id + 1
        let estilo = new Estilo(req.body);
        estilo.id = nextId;
        estilo.save()
        .then(() => {
            return res.status(201).send({estilo})
        })
        .catch((err) => {
            return res.status(500).send({ message: err });
        })
    })
    .catch((e) => {
        res.status(500).send(e)
    })
}

exports.get = (req, res) => {
    Estilo.find()
        .then((estilos) => {
            res.status(200).send(estilos);
        })
        .catch((e) => {
            res.status(500).send(e)
        })
};