const Comentario = require("../models/ticket.comentario.model");

exports.crearComentario = async (req, res) => {
    currentUserId = req.user.user_id;
    const {asunto, ticket_id, contenido} = req.body;

     await Comentario.create({
        asunto: asunto,
        ticket_id: ticket_id,
        contenido: contenido,
        creador_id: currentUserId
    })
    .then(()=>{
        res.status(201).send("El comentario se creo exitosamente.")
    })
    .catch((err)=>{
        res.status(400).send(err)
    })
}