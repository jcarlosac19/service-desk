const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ticketEstados = new mongoose.Schema(
  {
    nombre          : {type: String, defualt: null},
    color           : {type: String, defualt: null},
    creador_id      : {type: ObjectId, default: null}
  },
  {
    timestamps: 
      {
        createdAt: "creado_a",
        updatedAt: "actualizado_a"
      }
  }
);

module.exports = mongoose.model("ticket_estados", ticketEstados);