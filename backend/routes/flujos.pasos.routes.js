const { Router } = require("express");
const verifyAccessLevel = require("../middleware/access.level");
const pasosController = require("../controllers/flujos.pasos.controller");
const verifyPasos = require('../middleware/verifier.flujos.pasos');

const app = Router();

app.post("/flujos/pasos",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser,
        verifyPasos.verifyIfWorkflowStepExist,
        verifyPasos.verifyIfWorkflowExist,
        verifyPasos.verifyRequiredFields
    ],
    pasosController.crearPaso
);

app.get("/flujos/pasos",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser
    ],
    pasosController.obtenerPasos
);

app.get("/flujos/pasos/:id",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser
    ],
    pasosController.obtenerPasosPorId
);

module.exports = app;