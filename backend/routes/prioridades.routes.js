const { Router } = require("express");
const verifyAccessLevel = require("../middleware/access.level");
const prioridadesController = require('../controllers/prioridades.controller');
const verifyPrioridades = require("../middleware/verifier.prioridades");

const app = Router();

app.post("/prioridades",
[
    verifyAccessLevel.isAdmin,
    verifyAccessLevel.isUser,
    verifyPrioridades.verifyRequiredFields,
    verifyPrioridades.verifyIfPriorityExist
],
    prioridadesController.crearPrioridad
);

app.get("/prioridades",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser
    ],
    prioridadesController.obtenerPrioridades
);

app.get("/prioridades/:id",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser
    ],
    prioridadesController.obtenerPrioridadPorId
);

module.exports = app;