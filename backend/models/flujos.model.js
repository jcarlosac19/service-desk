const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const flujo = new mongoose.Schema(
  {
    nombre    : {type: String, defualt: null},
    creador_id : {type: ObjectId, defualt: null}
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