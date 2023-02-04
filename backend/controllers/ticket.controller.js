const Ticket = require("../models/ticket.model");
const Pasos = require("../models/flujos.pasos.model");
const Estados = require("../models/ticket.estados.model");

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
          creador_id      : currentUserId,
          modificador_id  : null,
          esta_eliminado  : false
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

exports.actualizarTicket = async (req, res) => {
  const filter  = req.params.id;
  const { asunto, contenido, estado_id, prioridad_id, categoria_id } = req.body;
  
  let update = {
    ...( asunto         && { asunto         }),
    ...( contenido      && { contenido      }),
    ...( estado_id      && { estado_id      }),
    ...( prioridad_id   && { prioridad_id   }),
    ...( categoria_id   && { categoria_id   })
  }

  await Ticket.findOneAndUpdate(
      filter, update, {
      new: true
  }).then(doc => {
      res.status(200).send(doc);
  }).catch(err => {
      res.status(400).send("No se pudo modificar el documento.")
  })
}

exports.cambiarDisponibilidadDeUnTicket = async (req, res) => {
  const id = req.params.id;
  const filtroTicket  = { _id: id };

  const filtroPasos = { ticket_id: { $eq: id } }
  const modificador = req.user.user_id;

  const method = req.method;
  const isDeleted = method == 'DELETE';
  const esta_eliminado = isDeleted ? true : false

  const update = {
      modificador_id: modificador,
      esta_eliminado: esta_eliminado
  }
  try{
      let ticket = await Ticket.findOneAndUpdate(filtroTicket, update, {
          new: true
      });

      let pasos = await Pasos.updateMany(filtroPasos, update, {
        new: true
    });

      res.status(200).send({
          message: "Se desactivo el ticket de manera exitosa y los pasos relacionados a el.",
          ticket: ticket,
          pasos: pasos
      });
  } catch(err){
      res.status(400).send({message: "Hubo un error no se pudo modificar el documento."})
  }
}