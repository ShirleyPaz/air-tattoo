const Estudio = require('../models/estudiosSchema')
const mongoose = require('mongoose');

exports.post = (req, res) => {
    const estudio = new Estudio(req.body);
    estudio.save()
        .then(() => {
            res.status(201).send({status: 201, mensagem: 'Adicionado com sucesso.'})
        })
        .catch((e) => {
            res.status(500).send({status: 500, mensagem: 'Ops!Estamos com problemas técnicos. Tente mais tarde!'})
        })
}

exports.get = (req, res) => {
    Estudio.find()
        .then((estudios) => {
            res.status(200).send(estudios);
        })
        .catch((e) => {
            res.status(500).send({status: 500, mensagem: 'Ops!Estamos com problemas técnicos. Tente mais tarde!'})
        })
};

exports.deleteById = async (req, res) => {
    const idParam = req.body.id
    await Estudio.findById(idParam)
        .then((estudio) => {
            if (!estudio) {
                return res.sendStatus(404).send({status: 404, mensagem: 'estúdio não encontrado'});;
            }
            estudio.remove(err => {
                if (!err) {
                    res.status(200).send({status: 200, mensagem: 'Removido com sucesso'});
                }
            });
        })
        .catch((e) => {
            res.status(500).send({status: 500, mensagem: 'Ops!Estamos com problemas técnicos. Tente mais tarde!'})
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
                res.status(404).send({status: 404, mensagem: 'estúdio não encontrado'});
            })
    } catch (e) {
        res.status(500).send({status: 500, mensagem: 'Ops!Estamos com problemas técnicos. Tente mais tarde!'})
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
                    res.status(201).send({status: 201, mensagem: 'Adicionado com sucesso.'});
                }).catch(() => {
                    res.status(500).send({status: 500, mensagem: 'Ops!Estamos com problemas técnicos. Tente mais tarde!'})
                })
        }).catch((e) => {
            res.status(404).send({status: 404, mensagem: 'estúdio não encontrado'})
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
            res.status(200).send({status: 200, mensagem: 'Atualizado com sucesso'});
        })
        .catch((e) => {
            console.log(e)
            res.status(404).send({status: 404, mensagem: 'agenda não encontrada'})
        })
};

exports.deleteAgendaById = async (req, res) => {
    const estudioId = req.params.id;
    const agendaId = req.body.id;
    await Estudio.findOneAndUpdate(
        { _id: estudioId },
        { $pull: { agendas: { _id: agendaId } } },
    ).then(() => {
        res.status(200).send({status: 200, mensagem: 'Removido com sucesso'});
    })
        .catch((e) => {
            console.log(e)
            res.status(404).send({status: 404, mensagem: 'agenda não encontrada'})
        })
}