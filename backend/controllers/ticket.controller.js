const { mongoose } = require("mongoose");
const Ticket = require("../models/ticket.grupos.model");

exports.crearTicket = async (req, res) => {

    const { asunto, contenido, estado_id, prioridad_id, categoria_id } = req.body
    const { trabajo_flujo_id, creador_id } = req.body

    await Ticket.create({
      asunto          : asunto,
      contenido       : contenido,
      estado_id       : estado_id,
      prioridad_id    : prioridad_id,
      categoria_id    : categoria_id,
      trabajo_flujo_id: trabajo_flujo_id,
      esta_compleado  : null,
      completado_a    : false,
      creador_id      : creador_id

      })
      .then(()=>{
        res.status(201).send("El ticket se creo exitosamente.")
      })
      .catch(()=>{
          res.status(400).send("Hubo un error al crear el ticket.")
      });

}