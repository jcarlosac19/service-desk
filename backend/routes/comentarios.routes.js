const { Router } = require("express");
const verifyAccessLevel = require("../middleware/access.level");
const comentariosController = require("../controllers/comentarios.controller");
const verifyComentarios = require("../middleware/verifier.comentarios");
const app = Router();

app.post("/comentarios",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser,

    ],
    comentariosController.crearComentario
);

app.get("/comentarios",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser
    ],
    comentariosController.obtenerComentarios
);

app.get("/comentarios/:id",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser
    ],
    comentariosController.obtenerComentarioByTicketId
);

module.exports = app;