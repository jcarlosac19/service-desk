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
};

exports.obtenerComentarios = async (req, res) => {

    await Comentario.find()
    .then(comentarios => {
        res.status(200).send(comentarios);
    })
    .catch(err => {
        res.status(400).send(`El ticket id: ${ticket_id} no tiene ningun comentario.`)
    })
};

exports.obtenerComentarioByTicketId = async (req, res) => {
    const id = req.params.id;
    await Comentario.find({ ticket_id: id })
    .then(comentarios => {
        res.status(200).send(comentarios);
    })
    .catch(err => {
        res.status(400).send(`El ticket id: ${ticket_id} no tiene ningun comentario.`)
    })
};