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