const Ticket = require("../models/ticket.model");
const Pasos = require("../models/flujos.pasos.model");
const TicketHistorico = require("../models/ticket.historico.actualizaciones.model");
const Estados = require("../models/ticket.estados.model");
const Comentarios = require("../models/ticket.comentario.model");
const Prioridad = require("../models/ticket.prioridades.model");
const Categoria = require("../models/ticket.categorias.model");
const Flujo = require("../models/flujos.model");
const Usuario = require("../models/usuario.model");


exports.crearTicket = async (req, res) => {

    const currentUserId = req.user.user_id;

    const { asunto, contenido, estado_id, prioridad_id, categoria_id } = req.body
    const { trabajo_flujo_id } = req.body

    try{
        const ticket = new Ticket({
            asunto,
            contenido,
            estado_id,
            prioridad_id,
            categoria_id,
            trabajo_flujo_id,
            creador_id      : currentUserId,
            modificador_id  : null,
            esta_eliminado  : false
        });
        await ticket.save();

        const transaccion = new TicketHistorico({
            ticket_id: ticket._id,
            creador_id: ticket.creador_id,
            esta_completado: false,
            flujo_paso_id: ticket.trabajo_flujo_id,
            esta_eliminado: false,
        });

        await transaccion.save();
        res.status(201).json({error: '', message: "Ticket creado exitosamente."})
    }catch(err){
        res.status(400).json({error: err, message: "Hubo un error al crear el ticket."})
    }
};

Ticket.schema.post('create', async function (doc, next) {
    const transaccion = new TicketHistorico({
      ticket_id: doc._id,
      creador_id: doc.creador_id,
      esta_completado: false,
      flujo_paso_id: doc.trabajo_flujo_id,
      esta_eliminado: false,
    });
    await transaccion.save();
    next();
  });


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