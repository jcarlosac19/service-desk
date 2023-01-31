const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ticketGrupo = new mongoose.Schema(
  {
    nombre          : {type: String, defualt: null, unique: true},
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

module.exports = mongoose.model("ticket_grupo", ticketGrupo);