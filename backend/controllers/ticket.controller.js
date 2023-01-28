const { mongoose } = require("mongoose");
const Ticket = require("../models/ticket.grupos.model");

exports.crearTicket = async (req, res) => {

    const ticket = await Ticket.create({

      });

}