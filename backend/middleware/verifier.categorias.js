const Categorias = require("../models/ticket.categorias.model");
const Grupos = require("../models/ticket.grupos.model");

let categoriasOpciones = {}

categoriasOpciones.verifyIfCategoryExist = async (req, res, next) =>{
    const { nombre } = req.body;
    await Categorias.findOne({ nombre })
    .then(categoria =>{
      if(categoria) {
        res.status(409).send("Esta categoria ya existe, intente con otro nombre.");
        return;
      }
      next();
    })
    .catch(err => {
         res.status(500).send("Hubo un error contacte al administrador.");
         return;
    });
};

categoriasOpciones.verifyIfGroupIdExist = async (req, res, next) => {
  const { grupo_id } = req.body;
  await Grupos.findById( grupo_id )
  .then(grupo =>{
    if(!grupo){
      res.status(400).send("El grupo que ingreso no existe.");
      return;
    }
    next();
  })
  .catch(err => {
    res.status(500).send("Hubo un error contacte al administrador.");
  });
};

module.exports = categoriasOpciones