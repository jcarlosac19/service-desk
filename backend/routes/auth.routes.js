const { Router } = require("express");
const controller = require("../controllers/user.auth.controller");
const verifySignUp = require("../middleware/verifier.sign.up")
const verifySignIn = require("../middleware/verifier.sign.in")
const app = Router();

app.post( 
    "/login",
    [
        verifySignIn.verifyRequiredFields
    ], 
    controller.login
);

app.post( 
    "/register",
    [
        verifySignUp.verifyIfUserExist, 
        verifySignUp.verifyRequiredFields
    ],
    controller.register
);

app.get('/get-user-by-email', controller.getUserByEmail);
app.get('/get-all-users', controller.getAllUsers);

module.exports = app;

