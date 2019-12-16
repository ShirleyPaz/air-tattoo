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

exports.deleteByName = async (req, res) => {
    const nome = req.body.nome.toLowerCase();
    await Tatuador.find({ nome })
        .then((tatuador) => {
            if (tatuador.length === 0) {
                return res.sendStatus(404).send("NOT FOUND");;
            }
            tatuador[0].remove(err => {
                if (!err) {
                    res.status(200).send("SUCCESS");
                }
            });
        })
        .catch((e) => {
            res.status(500).send('AN ERROR HAS OCCURRED. TRY AGAIN LATER.')
        })
};

exports.updateById = async (req, res) => {

    try {
        const idParam = req.params.id;
        let novoTatuador = req.body;
        novoTatuador.nome = req.body.nome.toLowerCase();
        await Tatuador.updateOne(
            { id: Number(idParam) },
            { $set: novoTatuador })
            .then((cliente) => {
                if (!cliente) {
                    return res.sendStatus(404).send("NOT FOUND");;
                }
                res.status(200).send("SUCCESS");
            })
            .catch((e) => {
                res.status(500).send('AN ERROR HAS OCCURRED. TRY AGAIN LATER.')
            });
    } catch (e) {
        res.status(500).send('AN ERROR HAS OCCURRED. TRY AGAIN LATER.')
    }
};




