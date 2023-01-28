const mongoose = require("mongoose");

const ticketTipoActualizaciones = new mongoose.Schema(
  {
    tipo      : {type: String, defualt: null},
    creador_id: {type: String, default: null}
  },
  {
    timestamps: 
      {
        createdAt: "creado_a",
        updatedAt: "actualizado_a"
      }
  }
);

module.exports = mongoose.model("ticket_tipo_actualizaciones", ticketTipoActualizaciones);