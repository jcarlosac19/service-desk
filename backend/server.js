// Get dependencies
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const ticketRoutes = require('./routes/ticket.routes');
const authRoutes = require('./routes/auth.routes');
const verifyAccessLevel = require('./middleware/access.level');
const verifyToken = require('./middleware/jwt.auth');
const config = require('./config/index').config;

const app = express();
require("./config/db.config").connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.json({ message: "La API esta corriendo..." });
  });

app.use(authRoutes);



app.use('/api/v1/tickets',
    [
      verifyToken.verifyToken,
      verifyAccessLevel.isActive
    ],
      ticketRoutes
);



const port = config.NODE_PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));