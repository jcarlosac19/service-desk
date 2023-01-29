const { mongoose } = require("mongoose");
const TicketHistorico = require("../models/ticket.historico.actualizaciones.model");

exports.crearActualizacion = async (req, res) => {
    currentUserId = req.user.user_id;

    const {ticket_id, flujo_paso_id,completado_a,asignado_id,esta_completado} = req.body;

     await TicketHistorico.create({
        ticket_id: ticket_id,
        flujo_paso_id: flujo_paso_id,
        compleado_a: completado_a,
        asignado_id: asignado_id,
        esta_completado: esta_completado
    })
    .then(()=>{
        res.status(201).send("La actualizacion se creo exitosamente.")
    })
    .catch(()=>{
        res.status(400).send("Hubo un error al crear la actualizacion.")
    });
};