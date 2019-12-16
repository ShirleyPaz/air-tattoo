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
    const tatuador = new Tatuador(req.body);
    tatuador.save()
        .then(() => {
            return res.status(201).send('SUCCESS')
        }).catch((e) => {
            res.status(500).send(e)
        })
}

exports.deleteById = async (req, res) => {
    const idParam = req.body.id
    await Tatuador.findById(idParam)
        .then((tatuador) => {
            if (!tatuador) {
                return res.sendStatus(404).send("NOT FOUND");;
            }
            tatuador.remove(err => {
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
        await Tatuador.findByIdAndUpdate(
            idParam,
            novoTatuador)
            .then((tatuador) => {
                if (!tatuador) {
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




