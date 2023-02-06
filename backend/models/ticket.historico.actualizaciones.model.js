const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ticketHistoricoActualizaciones = new mongoose.Schema(
  {
    ticket_id             : {type: ObjectId, defualt: null},
    flujo_paso_id         : {type: ObjectId, defualt: null},
    compleado_a           : {type: Date, default: null},
    asignado_id           : {type: ObjectId, default: null},
    esta_completado       : {type: Boolean, default: null},
    modificador_id        : {type: ObjectId, default: null},
    esta_eliminado        : {type: Boolean, default: null}
  },
  {
    timestamps: 
      {
        createdAt: "creado_a",
        updatedAt: "actualizado_a"
      }
  }
);

module.exports = mongoose.model("ticket_historico_actualizaciones", ticketHistoricoActualizaciones);