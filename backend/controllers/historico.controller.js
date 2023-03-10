const TicketHistorico = require("../models/ticket.historico.actualizaciones.model");
const Ticket = require("../models/ticket.model");   
const Usuario = require("../models/usuario.model");
const Departamento = require("../models/departamentos.model");

exports.crearActualizacion = async (req, res) => {
    currentUserId = req.user.user_id;

    const { ticket_id, departamento_id, asignado_id } = req.body;

    let actividadesDelTicket = await TicketHistorico.find({ticket_id: ticket_id, esta_completado: false}).lean().exec();

    if(actividadesDelTicket.length > 0) return res.status(500).send({message: "Todas las actividades anteriores, deben de haber sido completada, para poder agregar una siguiente."})

     await TicketHistorico.create({
        ticket_id: ticket_id,
        departamento_id: departamento_id,
        completado_a: null,
        asignado_id: asignado_id,
        creador_id: currentUserId,
        esta_completado: false,
        modificador_id: null,
        esta_eliminado: false
    })
    .then(()=>{
        res.status(201).send({message: "Actualizacion creada correctamente."})
    })
    .catch((err)=>{
        res.status(400).send({error: err, message: "Hubo un error al crear la actualizacion."})
    });
};

exports.obtenerHistorico = async (req, res) => {
    await TicketHistorico.find()
    .then(historicos => {
        res.status(200).send(historicos);
    })
    .catch(err => {
        res.status(400).send(`No se pudo encontrar ningun ticket.`)
    })
  };
  
exports.obtenerHistoricoPorId = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const historyByTicket = await TicketHistorico.find({ ticket_id: id })
        .populate('ticket_id')
        .populate('departamento_id')
        .populate('creador_id')
        .populate('asignado_id')
        .populate('modificador_id');
        
      res.status(200).json(historyByTicket);
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ message: `El ticket id: ${id} no tiene ningun comentario.` });
    }
  };

  exports.completarActividadHistorico = async (req, res) =>{
    currentUserId = req.user.user_id;
    const id = parseInt(req.params.id);
    TicketHistorico.findOneAndUpdate({ ticket_id: id, esta_completado: false }, {
      completado_a: new Date(0),
      esta_completado: true,
      modificador_id: currentUserId
    })
    .then(()=>{
      res.status(201).send({message: "La actividad se actualizo correctament."})
    })
    .catch(err =>{
      res.status(500).send({message: "Hubo un error, no se puedo actualizar la actividad."})
    })
  };

  exports.reasignarActividadHistorico = async (req, res) =>{
    const currentUserId = req.user.user_id;
    const id = parseInt(req.params.id);
    const { asignado_id } = req.body;

    TicketHistorico.findOneAndUpdate({ ticket_id: id, esta_completado: false }, {
      asignado_id: asignado_id,
      modificador_id: currentUserId
    })
    .then(()=>{
      res.status(201).send({message: "La actividad se reasigno correctament."})
    })
    .catch(err => {
      res.status(500).send({message: "Hubo un error, no se pudo reasignar el ticket."})
    })
  }



  