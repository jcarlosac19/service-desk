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

exports.obtenerGrupos = async (req, res) => {
    await Grupos.find()
    .then(grupos => {
        res.status(200).send(grupos);
    })
    .catch(err => {
        res.status(400).send("No se encontro ningun grupo.")
    });
};

exports.obtenerGrupoPorId = async (req, res) => {
    const id = req.params.id;
    await Grupos.findById(id)
    .then(grupo => {
        res.status(200).send(grupo);
    })
    .catch(err => {
        res.status(400).send(`No se encontro el grupo con id: ${id}`)
    });

};