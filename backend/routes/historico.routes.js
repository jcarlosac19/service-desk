const { Router } = require("express");
const verifyAccessLevel = require("../middleware/access.level");
const verifyUpdate = require("../middleware/verifier.ticket.historico");
const historicoController = require("../controllers/historico.controller");

const app = Router();

app.post("/historico",
    [   
        verifyAccessLevel.isUser,
        verifyUpdate.verifyAllRequiredFields,
        verifyUpdate.verifyIfTicketExist,
        verifyUpdate.verifyIfUserExiste,
        verifyUpdate.verifyIfWorkflowStepExist
    ],
    historicoController.crearActualizacion
);

app.get("/historico", 
    [
        verifyAccessLevel.isUser
    ],
    historicoController.obtenerHistorico
);

module.exports = app;
