const { Router } = require("express");
const jwtAuth = require("../middleware/jwt.auth");

//Controllers
const testController = require("../controllers/test.controller");
const grupoController = require("../controllers/grupos.controller");
const categoriaController = require("../controllers/categorias.controller");

//Middlewares 
const verifyGroups = require("../middleware/verify.grupos");
const verifyAccessLevel = require("../middleware/access.level");
const verifyCategory = require("../middleware/verify.categorias");

//Routes
const app = Router();

app.get("/",                testController.routerTest);
app.post("/crear",          testController.routerTest);
app.put("/actualizar/:id",  testController.routerTest);

app.post("/categoria",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser,
        verifyCategory.verifyIfCategoryExist
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
    [
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

app.post("/comentario",     jwtAuth.verifyToken, testController.routerTest);
app.get("/comentario",      jwtAuth.verifyToken, testController.routerTest);

app.post("/auditoria",      jwtAuth.verifyToken, testController.routerTest);
app.get("/auditoria",       jwtAuth.verifyToken, testController.routerTest);

module.exports = app;

