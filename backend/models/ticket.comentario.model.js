const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ticketComentario = new mongoose.Schema(
  {
    asunto            : {type: String, defualt: null},
    contenido         : {type: String, defualt: null},
    creador        : {type: ObjectId, ref: 'usuario', default: null},
    ticket         : {type: ObjectId, ref: 'ticket', default: null},
    modificador_id    : {type: ObjectId,default: null},
    esta_eliminado    : {type: Boolean, default: false}
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