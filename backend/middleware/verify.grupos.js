const Grupos = require("../models/ticket.grupos.model");

let gruposOpciones = {}

gruposOpciones.verifyIfGroupExist = async (req, res, next) =>{
    const { nombre } = req.body;
    await Grupos.findOne({ nombre })
    .then(grupo =>{
      if(grupo) {
        res.status(409).send("Esta grupo ya existe, intente con otro nombre.");
        return;
      }
      next();
    })
    .catch(err => {
         res.status(500).send("Hubo un error contacte al administrador.")
         return;
    });
};

gruposOpciones.verifyRequiredFields = (req, res, next) => {
  const { nombres, color } = req.body;
  hasRequestAllRequiredFields = nombres && color
  if (!hasRequestAllRequiredFields) {
      res.status(400).send("Todos los campos son requeridos.");
      return;
    }
  next();

};

module.exports = gruposOpciones