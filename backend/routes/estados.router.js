const { Router } = require("express");
const verifyAccessLevel = require("../middleware/access.level");
const estadosController = require("../controllers/estados.controller");
const verifyStatus = require("../middleware/verifier.estados");

const app = Router();

app.post("/estados",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser,
        verifyStatus.verifyIfStatusExist,
        verifyStatus.verifyRequiredFields
    ],
    estadosController.crearEstado
);

app.get("/estados",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser
    ],
    estadosController.obtenerEstados
);

app.get("/estados/:id",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser
    ],
    estadosController.obtenerEstadoPorId
);

module.exports = app;