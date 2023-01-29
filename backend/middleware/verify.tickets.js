const Grupos = require("../models/ticket.grupos.model");

let gruposOpciones = {}

gruposOpciones.verifyAllRequiredFieldsForTicketCreation = (req, res, next) => {
    const { asunto, contenido, estado_id, prioridad_id,  } = req.body
    const { trabajo_flujo_id, creador_id } = req.body

    hasRequestAllRequiredFields = asunto && contenido && estado_id && prioridad_id && categoria_id && trabajo_flujo_id && creador_id
    if (!hasRequestAllRequiredFields) {
        res.status(400).send("Todos los campos son requeridos.");
        return;
        }
    next();
    };

module.exports = gruposOpciones