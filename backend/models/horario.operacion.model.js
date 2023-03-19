const mongoose = require("mongoose");

const flujo = new mongoose.Schema(
  {
    horaInicio              : {type: Number, defualt: null, unique: true},
    horaFinal               : {type: Number, default: null, unique: true},
    incluyeFinesDeSemana    : {type: Boolean }
  },
  {
    timestamps: 
      {
        createdAt: "creado_a",
        updatedAt: "actualizado_a"
      }
  }
);

module.exports = mongoose.model("flujo", flujo);