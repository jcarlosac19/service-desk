const crearFlujoPaso = require("../models/flujos.pasos.model");

exports.crearFlujoPaso = async (req, res) => {
    currentUserId = req.user.user_id;
    const { nombre, orden, tiempoRespuesta, flujosId } = req.body;
     await crearFlujoPaso.create({
        nombre                  : nombre,
        orden                   : orden,
        tiempo_de_respuesta_hrs : tiempoRespuesta,
        flujos_id               : flujosId,
        creador_id              : currentUserId
    })
    .then(()=>{
        res.status(201).send("El flujo se creo exitosamente.")
    })
    .catch(()=>{
        res.status(400).send("Hubo un error al crear el flujo.")
    });
}