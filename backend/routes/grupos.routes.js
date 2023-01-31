const { Router } = require("express");
const verifyAccessLevel = require("../middleware/access.level");

const verifyGroups = require("../middleware/verifier.grupos");
const grupoController = require("../controllers/grupos.controller");

const app = Router();

app.post("/grupos",
    [   verifyGroups.verifyRequiredFields,
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser,
        verifyGroups.verifyIfGroupExist
    ],
    grupoController.crearGrupo
);

app.get("/grupos",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser
    ],
    grupoController.obtenerGrupos
);

app.get("/grupos/:id",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser
    ],
    grupoController.obtenerGrupoPorId
);


module.exports = app;