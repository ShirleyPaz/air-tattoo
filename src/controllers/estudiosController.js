const Estudio = require('../models/estudiosSchema')

exports.post = (req, res) => {
    const estudio = new Estudio(req.body);
    estudio.save()
        .then(returnedValue => {
            console.log(returnedValue)
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
            res.status(500).send(e)
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
    const paramId = req.params.id;
    const agenda = req.body;

    Estudio.findById(paramId)
        .then((estudio) => {
            estudio.agendas.push(agenda);
            estudio.save()
                .then(() => {
                    res.status(200).send('SUCCESS');
                }).catch(() => {
                    res.status(500).send('NOT FOUND')
                })
        }).catch((e) => {
            console.log(e)
            res.status(500).send('AN ERROR HAS OCCURRED. TRY AGAIN LATER.')
        })
};

exports.updateAgendaById = async (req, res) => {
    try {
        const estudioId = req.params.id;
        await Estudio.findById(estudioId)
            .then(async (estudio) => {
                const agendaId = req.params.agendaId;
                let newAgenda = req.body;
                try {
                    const agenda = await estudio.agendas.find(agendaId);
                    agenda.update(newAgenda);
                    try {
                        res.status(200).send("SUCCESS");
                    } catch {
                        res.status(500).send('AN ERROR HAS OCCURRED. TRY AGAIN LATER.')
                    }
                } catch {
                    return res.sendStatus(404).send("NOT FOUND");;
                }
            })
            .catch((e) => {
                res.status(404).send('NOT FOUND')
            })

    } catch (e) {
        res.status(500).send('INVALID INPUT')
    }
};

exports.deleteAgendaById = async (req, res) => {
    try {
        const agendaId = req.params.id;
        try {
            const agenda = await Tatuador.agendas.find(agendaId);
            agenda.remove();
            try {
                res.status(200).send("SUCCESS");
            } catch {
                res.status(500).send('AN ERROR HAS OCCURRED. TRY AGAIN LATER.')
            }
        } catch {
            return res.sendStatus(404).send("NOT FOUND");;
        }
    } catch (e) {
        res.status(500).send('INVALID INPUT')
    }
};