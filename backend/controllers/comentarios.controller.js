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
    const eliminados = Boolean((req.query.eliminados || "").replace(/\s*(false|null|undefined|0)\s*/i, ""));
    const activos = false;
    const filtro = { esta_eliminado: { $in: [activos, eliminados] } };

    await Comentario.find(filtro)
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

exports.actualizarComentario = async (req, res) => {
    const filter  = req.params.id;
    const { asunto, contenido } = req.body;
    
     let update = {
        ...( asunto     && { asunto     }),
        ...( contenido  && { contenido  })
    }

    const modificador = req.user.user_id;
    update.modificador_id = modificador;

    await Comentario.findOneAndUpdate(
        filter, update, {
        new: true
    }).then(doc => {
        res.status(200).send(doc);
    }).catch(err => {
        res.status(400).send("No se pudo modificar el documento.")
    })
}

exports.cambiarDisponibilidadDeUnComentario = async (req, res) => {
    const id = req.params.id;
    const filtro  = { _id: id };
    const modificador = req.user.user_id;

    const method = req.method;
    const isDeleted = method == 'DELETE';
    const esta_eliminado = isDeleted ? true : false

    const update = {
        modificador_id: modificador,
        esta_eliminado: esta_eliminado
    }
    try{
        let comentario = await Comentario.findOneAndUpdate(filtro, update, {
            new: true
        });

        res.status(200).send({
            message: "Se desactivo la categoria de manera exitosa.",
            comentario: comentario
        });
    } catch(err){
        res.status(400).send({message: "Hubo un error no se pudo modificar el documento."})
    }
}