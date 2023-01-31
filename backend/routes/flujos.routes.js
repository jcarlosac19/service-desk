const { Router } = require("express");
const verifyAccessLevel = require("../middleware/access.level");
const flujosController = require("../controllers/flujos.controller");
const verifyFlujos = require("../middleware/verifier.flujos");

const app = Router();

app.post("/flujos",
[
    verifyAccessLevel.isAdmin,
    verifyAccessLevel.isUser,
    verifyFlujos.verifyRequiredFields,
    verifyFlujos.verifyIfWorkflowExist
],
    flujosController.crearFlujo
);

app.get("/flujos",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser
    ],
    flujosController.obtenerFlujos
);

app.get("/flujos/:id",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser
    ],
    flujosController.obtenerFlujoPorId
);

module.exports = app;