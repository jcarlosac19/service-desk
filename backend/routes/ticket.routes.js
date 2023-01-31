const { Router } = require("express");
const ticketsController = require("../controllers/ticket.controller");
const verifyTickets = require("../middleware/verifier.tickets")
const verifyAccessLevel = require("../middleware/access.level");

const app = Router();

app.post("/tickets",
    [   
        verifyAccessLevel.isUser,
        verifyTickets.verifyAllRequiredFieldsForTicketCreation,
        verifyTickets.verifyIfCategoryExist,
        verifyTickets.verifyIfStatusExist,
        verifyTickets.verifyIfPriorityExist,
        verifyTickets.verifyIfWorkflowExist
    ],
    ticketsController.crearTicket
);

app.get("/tickets", 
    [
        verifyAccessLevel.isUser
    ],
    ticketsController.obtenerTickets
);


app.get("/tickets/:id", 
    [
        verifyAccessLevel.isUser
    ],
    ticketsController.obtenerTicketPorId
);

module.exports = app;

