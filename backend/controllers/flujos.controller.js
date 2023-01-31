const Flujos = require("../models/flujos.model");

exports.crearFlujo = async (req, res) => {
    currentUserId = req.user.user_id;
    const { nombre } = req.body;
     await Flujos.create({
        nombre: nombre,
        creador_id: currentUserId
    })
    .then(()=>{
        res.status(201).send("El flujo se creo exitosamente.")
    })
    .catch(()=>{
        res.status(400).send("Hubo un error al crear el flujo.")
    });
}

exports.obtenerFlujos = async (req, res) => {
    await Flujos.find()
    .then(flujos =>{
        res.status(200).send(flujos);
    })
    .catch(err =>{
        res.status(400).send("No se encontro ningun flujo.")
    });
}

exports.obtenerFlujoPorId = async (req, res) => {
    id = req.params.id;
    await Flujos.findById( id )
    .then(flujo =>{
        res.status(200).send(flujo);
    })
    .catch(err =>{
        res.status(400).send(`El flujo con id: ${id} no pudo ser encontrado.`)
    });
}