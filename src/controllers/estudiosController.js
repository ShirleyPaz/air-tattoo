const Estudio = require('../models/estudiosSchema')
const Tatuador = require('../models/tatuadoresSchema')

exports.post = (req, res) => {
    Estudio.find()
        .then((estudios) => {
            const nextId = estudios.length == 0 ? 0 : estudios[estudios.length - 1].id + 1
            let estudio = new Estudio(req.body);
            estudio.id = nextId;
            estudio.nome = estudio.nome.toLowerCase();
            estudio.save()
            return res.status(201).send({ estudio })
        })
        .catch((e) => {
            res.status(500).send(e)
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

exports.getByName = (req, res) => {
    const nome = req.params.name

    Estudio.find({ nome })
        .then((estudio) => {
            res.status(200).send(estudio);
        })
        .catch((e) => {
            res.status(500).send(e)
        })
};

exports.getAgendaByEstudioName = (req, res) => {
    const nome = req.params.name

    Estudio.find({ nome })
        .then((estudios) => {
            res.status(200).send(estudios[0].agenda);
        })
        .catch((e) => {
            res.status(500).send(e)
        })
};

exports.getAgendaByDate = (req, res) => {

    const nome = req.params.name;
    let data = req.params.data;
    if (!data.includes('-')) {
        const dia = data.slice(0, 2);
        const mes = data.slice(2, 4);
        const ano = data.slice(4);
        const dataConcat = `${ano}-${mes}-${dia}`;
        data = new Date(dataConcat);
    } else {
        data = new Date(data);
    }

    Estudio.find({ nome })
        .then((estudios) => {
            const agendasArr = estudios[0].agenda;
            const agenda = agendasArr.find(agenda => agenda.data.getTime() === data.getTime())
            res.status(200).send(agenda);
        })
        .catch((e) => {
            res.status(500).send(e)
        })
};

exports.postAgendaByEstudioName = (req, res) => {
    const nome = req.params.name;

    Estudio.find({ nome })
        .then((estudios) => {
            if (estudios.length === 0) {
                res.status(200).send({ message: "estúdio não encontrado" })
            }
            let estudio = new Estudio(estudios[0]);
            const agendasArr = [...estudios[0].agenda];
            const agendaReq = req.body;
            if (!agendaReq.data.includes('-')) {
                const dia = agendaReq.data.slice(0, 2);
                const mes = agendaReq.data.slice(2, 4);
                const ano = agendaReq.data.slice(4);
                const dataConcat = `${ano}-${mes}-${dia}`;
                agendaReq.data = new Date(dataConcat);
            } else { agendaReq.data = new Date(agendaReq.data) }
            agendasArr.push(agendaReq);
            estudio.agenda = agendasArr;
            estudio.save()
            return res.status(201).send({ estudio })
        })
        .catch((e) => {
            res.status(500).send(e)
        })
};

exports.postEventoByDate = (req, res) => {
    const nome = req.params.name;
    let data = req.params.data;
    if (!data.includes('-')) {
        const dia = data.slice(0, 2);
        const mes = data.slice(2, 4);
        const ano = data.slice(4);
        const dataConcat = `${ano}-${mes}-${dia}`;
        data = new Date(dataConcat);
    } else {
        data = new Date(data);
    }

    Estudio.find({ nome })
        .then((estudios) => {
            if (estudios.length === 0) {
                res.status(200).send({ message: "estúdio não encontrado" })
            }
            let estudio = new Estudio(estudios[0]);
            const agendasArr = [...estudio.agenda];
            const agendaDoDia = agendasArr.find(agenda => agenda.data.getTime() === data.getTime())
            if (agendaDoDia) {
                const indexAgenda = agendasArr.findIndex(agenda => agenda.data.getTime() === data.getTime())
                const evento = req.body;
                // criar evento id
                const nextId = agendaDoDia.eventos.length == 0 ? 0 : agendaDoDia.eventos[agendaDoDia.eventos.length - 1].id + 1
                evento.id = nextId;

                // criar tatuadorId a partir do nome
                // const tatuador = getTatuador(req.body.tatuador.toLowerCase())
                // if (tatuador.length === 0) {
                //     res.status(200).send('Tatuador não cadastrado');
                // }
                // const tatuadorId = tatuador[0].id
                // evento.tatuadorId = tatuadorId;

                // checar disponibilidade
                const inicioAgenda = agendaDoDia.horaInicio;
                const fimAgenda = agendaDoDia.horaFinal;
                const inicioAgendamento = evento.horaInicio;
                const fimAgendamento = evento.horaFinal;

                // checar se está dentro do horário de funcionamento
                const dentroDaAgenda = inicioAgendamento >= inicioAgenda && fimAgendamento <= fimAgenda

                // checar se não interfere em outros eventos
                const eventosEmConflito = agendaDoDia.eventos.filter(e => {
                    return (inicioAgendamento >= e.horaInicio && e.horaFinal >= inicioAgendamento ||
                        inicioAgendamento <= e.horaInicio && fimAgendamento >= e.horaFinal)
                })


                if (dentroDaAgenda && eventosEmConflito.length === 0) {
                    //checar outros eventos pra ver se bate
                    agendaDoDia.eventos.push(evento);
                    agendasArr.splice(indexAgenda, 1, agendaDoDia);
                    estudio.agenda = agendasArr;
                    estudio.save()
                    return res.status(201).send({ estudio })
                } else {
                    return res.status(200).send({ message: 'Horário indisponível' })
                }
            } else {
                return res.status(200).send({ message: 'Não há agenda aberta para esse dia' })
            }
        })
        .catch((e) => {
            res.status(500).send(e)
        })
};

// getTatuador = async (nome) => {
//     await Tatuador.find({})
//         .then(tatuadores => {
//             return tatuadores;
//         })
//         .catch((err) => {
//             console.log(err)
//             res.status(500).send({ message: 'tatuador não encontrado' })}
//         )
// }

exports.getEventosByDate = (req, res) => {

    const nome = req.params.name;
    let data = req.params.data;
    if (!data.includes('-')) {
        const dia = data.slice(0, 2);
        const mes = data.slice(2, 4);
        const ano = data.slice(4);
        const dataConcat = `${ano}-${mes}-${dia}`;
        data = new Date(dataConcat);
    } else {
        data = new Date(data);
    }

    Estudio.find({ nome })
        .then((estudios) => {
            const agendasArr = estudios[0].agenda;
            const agenda = agendasArr.find(agenda => agenda.data.getTime() === data.getTime())
            res.status(200).send(agenda.eventos);
        })
        .catch((e) => {
            res.status(500).send(e)
        })
};

exports.getEventoByDateAndId = (req, res) => {

    const nome = req.params.name;
    let data = req.params.data;
    let eventoId = req.params.eventoId;
    if (!data.includes('-')) {
        const dia = data.slice(0, 2);
        const mes = data.slice(2, 4);
        const ano = data.slice(4);
        const dataConcat = `${ano}-${mes}-${dia}`;
        data = new Date(dataConcat);
    } else {
        data = new Date(data);
    }

    Estudio.find({ nome })
        .then((estudios) => {
            const agendasArr = estudios[0].agenda;
            const agenda = agendasArr.find(agenda => agenda.data.getTime() === data.getTime())
            const evento = agenda.eventos.find(e => e.id == eventoId);
            res.status(200).send(evento);
        })
        .catch((e) => {
            res.status(500).send(e)
        })
};

exports.deleteEventById = (req, res) => {
    const nome = req.params.name;
    let data = req.params.data;
    let eventoId = req.params.eventoId;

    if (!data.includes('-')) {
        const dia = data.slice(0, 2);
        const mes = data.slice(2, 4);
        const ano = data.slice(4);
        const dataConcat = `${ano}-${mes}-${dia}`;
        data = new Date(dataConcat);
    } else {
        data = new Date(data);
    }

    Estudio.find({ nome })
        .then((estudios) => {
            if (estudios.length === 0) {
                res.status(200).send({ message: "estúdio não encontrado" })
            }
            let estudio = new Estudio(estudios[0]);
            const agendasArr = [...estudio.agenda];
            const agendaDoDia = agendasArr.find(agenda => agenda.data.getTime() === data.getTime())
            if (agendaDoDia) {
                const agendaIndex = agendasArr.findIndex(agenda => agenda.data.getTime() === data.getTime())
                // remover evento da agenda
                const eventoIndex = agendaDoDia.eventos.findIndex(e => e.id == eventoId);
                if (eventoIndex > -1) {
                    agendaDoDia.eventos.splice(eventoIndex, 1);
                    const novaAgenda = agendasArr.splice(agendaIndex,1,agendaDoDia);
                    estudio.agenda = novaAgenda;
                    estudio.save();
                    return res.status(200).send({ message: 'evento removido com sucesso' })
                } else {
                    return res.status(200).send({ message: 'evento não encontrado' })
                }
            } else {
                return res.status(200).send({ message: 'Não há eventos registrados nessa data' })
            }
        })
        .catch((e) => {
            res.status(500).send(e)
        })
};

exports.updateEventById = (request, response) => {

};