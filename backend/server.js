// Get dependencies
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/index').config;

//Routes
const ticketRoutes = require('./routes/ticket.routes');
const authRoutes = require('./routes/auth.routes');
const categoriasRoutes = require('./routes/categorias.routes');
const gruposRoutes = require('./routes/grupos.routes');
const prioridadesRoutes = require('./routes/prioridades.routes');
const flujosRoutes = require('./routes/flujos.routes');
const pasosRoutes = require('./routes/flujos.pasos.routes');
const estadosRoutes = require('./routes/estados.routes');
const comentariosRoutes = require('./routes/comentarios.routes');
const historicoRoutes = require('./routes/historico.routes');

//Middlewares
const verifyAccessLevel = require('./middleware/access.level');
const verifyToken = require('./middleware/jwt.auth');

const app = express();
const urlPrefix = '/api/v1';

require("./config/db.config").connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
    res.json({ message: "La API esta corriendo..." });
  });

app.use(urlPrefix,authRoutes);

app.use(urlPrefix,
    [
      verifyToken.verifyToken,
      verifyAccessLevel.isActive
    ],
      [
        ticketRoutes,
        categoriasRoutes,
        gruposRoutes,
        prioridadesRoutes,
        flujosRoutes,
        pasosRoutes,
        estadosRoutes,
        comentariosRoutes,
        historicoRoutes
      ]
);

const port = config.NODE_PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));