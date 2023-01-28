const mongoose = require("mongoose");

const ticketPrioridades = new mongoose.Schema(
  {
    nombre    : {type: String, defualt: null},
    color     : {type: String, defualt: null},
    creador_id: {type: Number, default: null}
  },
  {
    timestamps: 
      {
        createdAt: "creado_a",
        updatedAt: "actualizado_a"
      }
  }
);

module.exports = mongoose.model("ticket_prioridad", ticketPrioridades);