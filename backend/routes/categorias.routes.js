const { Router } = require("express");
const verifyAccessLevel = require("../middleware/access.level");
const categoriaController = require("../controllers/categorias.controller");
const verifyCategory = require("../middleware/verifier.categorias");
const app = Router();

app.post("/categorias",
[
    verifyAccessLevel.isAdmin,
    verifyAccessLevel.isUser,
    verifyCategory.verifyIfCategoryExist,
    verifyCategory.verifyIfGroupIdExist
],
categoriaController.crearCategoria
);

app.get("/categorias",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser
    ],
    categoriaController.obtenerCategorias
);

app.get("/categorias/:id",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser
    ],
    categoriaController.obtenerCategoriaPorId
);

module.exports = app;