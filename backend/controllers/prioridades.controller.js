const Prioridad = require("../models/ticket.prioridades.model");

exports.crearPrioridad = async (req, res) => {
    currentUserId = req.user.user_id;
    const {nombre, color} = req.body;
     await Estados.create({
        nombre: nombre,
        color: color,
        creador_id: currentUserId
    })
    .then(()=>{
        res.status(201).send("La prioridad se creo exitosamente.")
    })
    .catch(()=>{
        res.status(400).send("Hubo un error al crear la prioridad.")
    });
}