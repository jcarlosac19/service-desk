const Grupos = require("../models/ticket.grupos.model");

exports.crearGrupo = async (req, res) => {
    currentUserId = req.user.user_id;
    const {nombre, color} = req.body;
     await Grupos.create({
        nombre: nombre,
        color: color,
        creador_id: currentUserId
    })
    .then(()=>{
        res.status(201).send("El grupo se creo exitosamente.")
    })
    .catch(()=>{
        res.status(400).send("Hubo un error al crear el grupo.")
    });
}