const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ticketComentario = new mongoose.Schema(
  {
    asunto    : {type: String, defualt: null},
    contenido : {type: String, defualt: null},
    user_id   : {type: ObjectId, default: null},
    ticket_id : {type: ObjectId, default: null}
  },
  {
    timestamps: 
      {
        createdAt: "creado_a",
        updatedAt: "actualizado_a"
      }
  }
);

module.exports = mongoose.model("ticket_comentario", ticketComentario);