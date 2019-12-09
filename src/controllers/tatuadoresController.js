const Tatuador = require('../models/tatuadoresSchema')


exports.get = (req, res) => {
        Tatuador.find()
        .then((tatuadores) => {
            res.status(200).send(tatuadores);
        })
        .catch((e) => {
            res.status(200).send(e)
        })
  };

  exports.post = (req, res) => {
    let tatuador = new Tatuador(req.body);

    tatuador.save()
        .then(() => {
            return res.status(201).send({tatuador})
        })
        .catch((err) => {
            return res.status(500).send({ message: err });
        })
  }