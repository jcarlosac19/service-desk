const Categoria = require("../models/ticket.categorias.model");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

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

exports.obtenerCategorias = async (req, res) =>{
    await Categoria.find()
    .then(categorias => {
        res.status(200).send(categorias)
    })
    .catch(err =>{
        res.status(400).send("No se pudieron obtener las categorias.")
    });
}

exports.obtenerCategoriaPorId = async (req, res) =>{
    const id  = req.params.id;
    await Categoria.findById( id )
    .then(categorias => {
        res.status(200).send(categorias)
    })
    .catch(err =>{
        res.status(400).send(`No se encontro la categoria, con id: ${id}`)
    });
}