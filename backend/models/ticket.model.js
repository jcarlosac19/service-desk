const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ticketSchema = new mongoose.Schema(
  {
    asunto          : { type: String, default: null },
    contenido       : { type: String, default: null },
    estado_id       : { type: ObjectId, default: null },
    prioridad_id    : { type: ObjectId, default: null },
    creador_id      : { type: ObjectId, default: null },
    categoria_id    : { type: ObjectId, default: null },
    trabajo_flujo_id: { type: ObjectId, default: null },
    completado_a    : { type: Date, default: null },
    esta_completado : { type: Boolean, default: false}
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