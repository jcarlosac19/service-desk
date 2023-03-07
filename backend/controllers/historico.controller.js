const TicketHistorico = require("../models/ticket.historico.actualizaciones.model");
const Ticket = require("../models/ticket.model");   
const Usuario = require("../models/usuario.model");

exports.crearActualizacion = async (req, res) => {
    currentUserId = req.user.user_id;

    const { ticket_id, flujo_paso_id, asignado_id } = req.body;

     await TicketHistorico.create({
        ticket_id: ticket_id,
        flujo_paso_id: flujo_paso_id,
        completado_a: null,
        asignado_id: asignado_id,
        esta_completado: false,
        modificador_id: null,
        esta_eliminado: false
    })
    .then(()=>{
        res.status(201).send("La actualizacion se creo exitosamente.")
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
  const id = req.params.id;

  try {
    const historyByTicket = await TicketHistorico.find({ ticket_id: id })
      .populate('ticket_id')
      .populate('creador_id')
      .populate('asignado_id')
      .populate('modificador_id');
    res.status(200).json(historyByTicket);
  } catch (err) {
    res
      .status(400)
      .json({ message: `El ticket id: ${id} no tiene ningun comentario.` });
  }
};

  