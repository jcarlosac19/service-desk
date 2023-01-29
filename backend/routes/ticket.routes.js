const { Router } = require("express");
const jwtAuth = require("../middleware/jwt.auth");

//Controllers
const testController = require("../controllers/test.controller");
const grupoController = require("../controllers/grupos.controller");
const categoriaController = require("../controllers/categorias.controller");
const comentarioController = require("../controllers/comentarios.controller");

//Middlewares 
const verifyGroups = require("../middleware/verify.grupos");
const verifyAccessLevel = require("../middleware/access.level");
const verifyCategory = require("../middleware/verify.categorias");
const verifyTickets = require("../middleware/verify.tickets")

//Routes
const app = Router();

app.get("/",                testController.routerTest);

app.post("/crear",
    [
        verifyTickets.verifyAllRequiredFieldsForTicketCreation
    ],
    testController.routerTest
);

app.put("/actualizar/:id",  testController.routerTest);

app.post("/categoria",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser,
        verifyCategory.verifyIfCategoryExist,
        verifyCategory.verifyIfGroupIdExist
    ],
    categoriaController.crearCategoria
);

app.get("/categoria",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser
    ],
    testController.routerTest
);

app.post("/grupo",
    [   verifyGroups.verifyRequiredFields,
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser,
        verifyGroups.verifyIfGroupExist
    ],
    grupoController.crearGrupo
);

app.get("/grupo",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser
    ],
    testController.routerTest
);

app.post("/prioridad",      testController.routerTest);
app.get("/prioridad",       testController.routerTest);

app.post("/comentario",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser
    ],
    comentarioController.crearComentario
);

app.get("/comentario",      jwtAuth.verifyToken, testController.routerTest);

app.post("/auditoria",      jwtAuth.verifyToken, testController.routerTest);
app.get("/auditoria",       jwtAuth.verifyToken, testController.routerTest);

module.exports = app;

