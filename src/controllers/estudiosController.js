const Estudio = require('../models/estudiosSchema')
const mongoose = require('mongoose');

exports.post = (req, res) => {
    const estudio = new Estudio(req.body);
    estudio.save()
        .then(() => {
            res.status(201).send('SUCCESS')
        })
        .catch((e) => {
            res.status(500).send('AN ERROR HAS OCCURRED. TRY AGAIN LATER.')
        })
}

exports.get = (req, res) => {
    Estudio.find()
        .then((estudios) => {
            res.status(200).send(estudios);
        })
        .catch((e) => {
            res.status(500).send('AN ERROR HAS OCCURRED. TRY AGAIN LATER.')
        })
};

exports.deleteById = async (req, res) => {
    const idParam = req.body.id
    await Estudio.findById(idParam)
        .then((estudio) => {
            if (!estudio) {
                return res.sendStatus(404).send("NOT FOUND");;
            }
            estudio.remove(err => {
                if (!err) {
                    res.status(200).send("SUCCESS");
                }
            });
        })
        .catch((e) => {
            res.status(500).send('AN ERROR HAS OCCURRED. TRY AGAIN LATER.')
        })
};

exports.getAgendasByEstudio = async (req, res) => {
    try {
        const estudioId = req.params.id;
        await Estudio.findById(estudioId)
            .then((estudio) => {
                res.status(200).send(estudio.agendas);
            })
            .catch((e) => {
                res.status(404).send('NOT FOUND');
            })
    } catch (e) {
        res.status(500).send('AN ERROR HAS OCCURRED. TRY AGAIN LATER.')
    }
};

exports.postAgendaByEstudio = (req, res) => {
    const estudioId = req.params.id;
    const agenda = req.body;

    Estudio.findById(estudioId)
        .then((estudio) => {
            estudio.agendas.push(agenda);
            estudio.save()
                .then(() => {
                    res.status(200).send('SUCCESS');
                }).catch(() => {
                    res.status(500).send('AN ERROR HAS OCCURRED. TRY AGAIN LATER.')
                })
        }).catch((e) => {
            res.status(404).send('NOT FOUND')
        })
};

exports.updateAgendaById = async (req, res) => {
    const estudioId = req.params.id;
    const agendaId = req.params.agendaId;
    let newAgenda = req.body;
    await Estudio.findOneAndUpdate(
        { _id: estudioId },
        {
            $set: {
                "agendas.$[elem].data": newAgenda.data,
                "agendas.$[elem].horaInicio": newAgenda.horaInicio,
                "agendas.$[elem].horaFinal": newAgenda.horaFinal,
                "agendas.$[elem].eventos": newAgenda.eventos || []
            },
        },
        {
            arrayFilters: [{
                "elem._id": new mongoose.Types.ObjectId(agendaId),
            }],
        })
        .then(() => {
            res.status(200).send("SUCCESS");
        })
        .catch((e) => {
            console.log(e)
            res.status(404).send('NOT FOUND')
        })
};

exports.deleteAgendaById = async (req, res) => {
    const estudioId = req.params.id;
    const agendaId = req.body.id;
    await Estudio.findOneAndUpdate(
        { _id: estudioId },
        { $pull: { agendas: { _id: agendaId } } },
    ).then(() => {
        res.status(200).send("SUCCESS");
    })
        .catch((e) => {
            console.log(e)
            res.status(404).send('NOT FOUND')
        })
}