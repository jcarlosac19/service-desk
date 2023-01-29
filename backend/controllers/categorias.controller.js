const Categoria = require("../models/ticket.categorias.model");

exports.crearCategoria = async (req, res) => {
    currentUserId = req.user.user_id;
    const {nombre, color, grupo_id} = req.body;

     await Categoria.create({
        nombre: nombre,
        color: color,
        grupo_id: grupo_id,
        creador_id: currentUserId
    })
    .then(()=>{
        res.status(201).send("La categoria se creo exitosamente.")
    })
    .catch((err)=>{
        res.status(400).send(err)
    })
}