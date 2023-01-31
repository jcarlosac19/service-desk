const crearFlujoPaso = require("../models/flujos.pasos.model");

exports.crearPaso = async (req, res) => {
    
    currentUserId = req.user.user_id;

    const { nombre, orden, tiempo_de_respuesta_hrs, flujo_id } = req.body;

     await crearFlujoPaso.create({
        nombre                  : nombre,
        orden                   : orden,
        tiempo_de_respuesta_hrs : tiempo_de_respuesta_hrs,
        flujo_id                : flujo_id,
        creador_id              : currentUserId
    })
    .then(()=>{
        res.status(201).send("El flujo se creo exitosamente.")
    })
    .catch(()=>{
        res.status(400).send("Hubo un error al crear el flujo.")
    });
};

exports.obtenerPasos = async (req, res) => {

    res.status(200).send("");
};

exports.obtenerPasosPorId = async (req, res) => {

    res.status(200).send("");
};