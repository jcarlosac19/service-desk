const Ticket = require("../models/ticket.model");
const Pasos = require("../models/flujos.pasos.model");

exports.crearTicket = async (req, res) => {

    const currentUserId = req.user.user_id;

    const { asunto, contenido, prioridad_id, categoria_id } = req.body
    const { trabajo_flujo_id } = req.body;

    const ticket = {
      asunto,
      contenido,
      estado_id: "63ed84d64aaa4014a8cf51d7",
      prioridad_id,
      categoria_id,
      trabajo_flujo_id,
      creador_id      : currentUserId,
      modificador_id  : null,
      esta_eliminado  : false
  };

  Ticket.create(ticket)
  .then(() => {
    res.status(200).send({message: "Se creo el ticket exitosamente."});
  })
  .catch(err => {
    res.status(400).send({error: err, message: "No se pudo crear el ticket."})
  });

  };


exports.obtenerTickets = async (req, res) => {
    // const eliminados = Boolean((req.query.eliminados || "").replace(/\s*(false|null|undefined|0)\s*/i, ""));
    // const activos = false;
    Ticket.find({esta_eliminado: false})
          .populate('estado_id')
          .populate('prioridad_id')
          .populate('categoria_id')
          .populate('creador_id')
          .populate('modificador_id')
          .populate('trabajo_flujo_id')
          .exec((err, docs)=>{
            if (err) return res.status(400).send("Hubo un error."); 
            return res.status(200).send(docs);
        });
};

exports.getTicketsByUser = async (req, res) => {
    Ticket.find({creador_id: req.user.user_id, esta_eliminado: false})
          .populate('estado_id')
          .populate('prioridad_id')
          .populate('categoria_id')
          .populate('creador_id')
          .populate('modificador_id')
          .populate('trabajo_flujo_id')
          .exec((err, docs)=>{
                if (err) return res.status(400).send("Hubo un error."); 
                return res.status(200).send(docs);
            });
};

exports.obtenerTicketPorId = async (req, res) => {
  const id = req.params.id;
  try {
    const ticket = await Ticket.findById(id)
      .populate('estado_id')
      .populate('prioridad_id')
      .populate('categoria_id')
      .populate('creador_id')
      .populate('modificador_id')
      .populate('trabajo_flujo_id');

    res.json(ticket);
  } catch (err) {
    res.status(400).send({ message: 'No se pudo obtener el ticket.' });
  }
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

  const modificador = req.user.user_id;
  update.modificador_id = modificador;

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