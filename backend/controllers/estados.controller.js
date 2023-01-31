const Estados = require("../models/ticket.estados.model");

exports.crearEstado = async (req, res) => {
    currentUserId = req.user.user_id;
    const {nombre, color} = req.body;
     await Estados.create({
        nombre: nombre,
        color: color,
        creador_id: currentUserId
    })
    .then(()=>{
        res.status(201).send("El estado se creo exitosamente.")
    })
    .catch(()=>{
        res.status(400).send("Hubo un error al crear el estado.")
    });
}

exports.obtenerEstados = async (req, res) => {
    await Estados.find()
    .then(estados =>{
        res.status(200).send(estados);
    })
    .catch(err => {
        res.status(400).send("No se encontro ningun estado.")
    });
}

exports.obtenerEstadoPorId = async (req, res) => {
    const id = req.params.id;
    await Estados.findById( id )
    .then(estados =>{
        res.status(200).send(estados);
    })
    .catch(err => {
        res.status(400).send("No se encontro ningun estado.")
    });
}