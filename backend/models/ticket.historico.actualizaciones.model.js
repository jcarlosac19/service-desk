const mongoose = require("mongoose");

const ticketHistoricoActualizaciones = new mongoose.Schema(
  {
    ticket_id             : {type: Number, defualt: null},
    flujo_paso_id         : {type: Number, defualt: null},
    compleado_a           : {type: Date, default: null},
    asignado_id           : {type: String, default: null},
    esta_compleatado      : {type: Boolean, default: null}
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