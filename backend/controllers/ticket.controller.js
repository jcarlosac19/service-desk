const Ticket = require("../models/ticket.model");

exports.crearTicket = async (req, res) => {

    const currentUserId = req.user.user_id;

    const { asunto, contenido, estado_id, prioridad_id, categoria_id } = req.body
    const { trabajo_flujo_id } = req.body

    await Ticket.create({
      asunto          : asunto,
      contenido       : contenido,
      estado_id       : estado_id,
      prioridad_id    : prioridad_id,
      categoria_id    : categoria_id,
      trabajo_flujo_id: trabajo_flujo_id,
      esta_completado  : false,
      completado_a    : null,
      creador_id      : currentUserId

      })
      .then(()=>{
        res.status(201).send("El ticket se creo exitosamente.")
      })
      .catch((err)=>{
          res.status(400).send({error: err, message: "Hubo un error al crear el ticket."})
      });
};


exports.obtenerTickets = async (req, res) => {
  await Ticket.find()
  .then(tickets => {
      res.status(200).send(tickets);
  })
  .catch(err => {
      res.status(400).send(`No se pudo encontrar ningun ticket.`)
  })
};

exports.obtenerTicketPorId = async (req, res) => {
  const id = req.params.id;
  await Ticket.findById( id )
  .then(ticket => {
      res.status(200).send(ticket);
  })
  .catch(err => {
      res.status(400).send(`El ticket id: ${ id } no se pudo encontrar.`)
  })
};