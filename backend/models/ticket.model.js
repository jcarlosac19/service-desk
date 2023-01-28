const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ticketSchema = new mongoose.Schema(
  {
    asunto          : { type: String, default: null },
    contenido       : { type: String, default: null },
    estado_id       : { type: ObjectId, default: null },
    prioridad_id    : { type: ObjectId, default: null },
    creador_id      : { type: ObjectId, default: null },
    asignado_id     : { type: ObjectId, default: null },
    actualizador_id : { type: ObjectId, default: null},
    completador_id  : { type: ObjectId, default: null },
    completado_a    : { type: Date, default: null },
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