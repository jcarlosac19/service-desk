const Categorias = require("../models/ticket.categorias.model");

let categoriasOpciones = {}

categoriasOpciones.verifyIfCategoryExist = async (req, res, next) =>{
    const { nombre } = req.body;
    await Categorias.findOne({ nombre })
    .then(grupo =>{
      if(grupo) {
        res.status(409).send("Esta categoria ya existe, intente con otro nombre.");
        return;
      }
      next();
    })
    .catch(err => {
         res.status(500).send("Hubo un error contacte al administrador.")
         return;
    });
};

module.exports = categoriasOpciones