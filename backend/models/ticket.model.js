const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ticketSchema = new mongoose.Schema(
  {
    asunto          : { type: String, default: null },
    contenido       : { type: String, default: null },
    estado_id       : { type: ObjectId, ref: 'ticket_estados' },
    prioridad_id    : { type: ObjectId, ref: 'ticket_prioridade' },
    creador_id      : { type: ObjectId, ref: 'usuario' },
    categoria_id    : { type: ObjectId, ref: 'ticket_categoria' },
    trabajo_flujo_id: { type: ObjectId, ref: 'flujo' },
    modificador_id  : { type: ObjectId, ref: 'usuario' },
    esta_eliminado  : { type: Boolean, default: false}
  },
  {
    timestamps: 
      {
        createdAt: "creado_a",
        updatedAt: "actualizado_a"
      }
  }
);

module.exports = mongoose.model("ticket", ticketSchema);