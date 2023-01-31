const Prioridad = require("../models/ticket.prioridades.model");

exports.crearPrioridad = async (req, res) => {
    currentUserId = req.user.user_id;

    const {nombre, color} = req.body;

     await Prioridad.create({
        nombre: nombre,
        color: color,
        creador_id: currentUserId
    })
    .then(()=>{
        res.status(201).send("La prioridad se creo exitosamente.")
    })
    .catch((err)=>{
        res.status(400).send(
            {
                error: err,
                message: "Hubo un error al crear la prioridad."
            }
        );
    });
}

exports.obtenerPrioridades = async (req, res) => {
    await Prioridad.find()
    .then(prioridades => {
        res.status(201).send(prioridades);
    })
    .catch(err => {
        res.status(400).send("No se pudo encontrar ninguna prioridad.")
    })
};

exports.obtenerPrioridadPorId = async (req, res) => {
    const id = req.params.id;

    await Prioridad.findById( id )
    .then(prioridad => {
        res.status(200).send(prioridad);
    })
    .catch(err =>{
        res.status(400).send(`No se encontro la prioridad con id: ${id}`)
    })
}