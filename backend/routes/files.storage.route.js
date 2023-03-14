const { Router } = require("express");
const verifyAccessLevel = require("../middleware/access.level");

const verifyGroups = require("../middleware/verifier.grupos");
const fileStorage = require("../controllers/file.storage.controller");

const app = Router();

app.get("/archivo/:id",
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser
    ],
    fileStorage.downloadFile
);

app.get("/archivos/lista/:id", 
    [
        verifyAccessLevel.isAdmin,
        verifyAccessLevel.isUser
    ],
    fileStorage.getListOfFiles
);


module.exports = app;