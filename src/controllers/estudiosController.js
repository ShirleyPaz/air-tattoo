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
            const agendaArr = estudios[0].agenda;
            const agenda = agendaArr.find(agenda => agenda.data.getTime() === data.getTime())
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
            let estudio = new Estudio(estudios[0]);
            const agendaArr = [...estudios[0].agenda];
            const agendaReq = req.body;
            if (!agendaReq.data.includes('-')) {
                const dia = agendaReq.data.slice(0, 2);
                const mes = agendaReq.data.slice(2, 4);
                const ano = agendaReq.data.slice(4);
                const dataConcat = `${ano}-${mes}-${dia}`;
                agendaReq.data = new Date(dataConcat);
            } else { agendaReq.data = new Date(agendaReq.data)}
            agendaArr.push(agendaReq);
            estudio.agenda = agendaArr;
            estudio.save()
            return res.status(201).send({ estudio })
        })
        .catch((e) => {
            res.status(500).send(e)
        })
};

exports.postEventoByDate = (req, res) => {
    const nome = req.params.name;
    // let tatuadores;

    // Tatuador.find()
    //     .then((lista) => {
    //         tatuadores = lista;
    //     })
    //     .catch((e) => {
    //         res.status(500).send(e)
    //     })
     

    Estudio.find({ nome })
        .then((estudios) => {
            const estudio = estudios[0];
            const agendaArr = estudios[0].agenda;
            const agendaDay = agendaArr.find(agenda => agenda.data.getTime() === data.getTime())
            const index = agendaArr.findIndex(agenda => agenda.data.getTime() === data.getTime())
            const evento = req.body;
            // criar evento id
            const nextId = agendaArr.length == 0 ? 0 : estudios[estudios.length - 1].id + 1
            evento.id = nextId;
            // criar tatuadorId a partir do nome
            // const tatuadorId = tatuadores.find(tatuador => tatuador.nome === evento.tatuador).id;
            // evento.tataudorId = tatuadorId;
            // delete evento.tatuador;
            // checar disponibilidade
            const inicioAgenda = agendaDay.horaInicio;
            const fimAgenda = agendaDay.horarioFim;
            const inicioAgendamento = evento.horaInicio;
            const fimAgendamento = evento.horarioFim;

            if(inicioAgendamento >= inicioAgenda && fimAgendamento <= fimAgenda) {
                agendaDay.push(evento);
                agendaArr.splice(index, 1, agendaDay);
                estudio.agenda = agendaArr;
                estudio.save()
            } else {
                return res.status(200).send('Horário indisponível')
            }

            return res.status(201).send({ estudio })
        })
        .catch((e) => {
            res.status(500).send(e)
        })
};