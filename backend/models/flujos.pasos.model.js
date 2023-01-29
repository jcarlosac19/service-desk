const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const flujoPasos = new mongoose.Schema(
  {
    nombre                          : {type: String, defualt: null},
    order                           : {type: Number, default: null},
    tiempo_respuesta_esperado_hrs   : {type: Number, default: null},
    creador_id                      : {type: ObjectId, defualt: null}
  },
  {
    timestamps: 
      {
        createdAt: "creado_a",
        updatedAt: "actualizado_a"
      }
  }
);

module.exports = mongoose.model("flujo_pasos", flujoPasos);