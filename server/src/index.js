const express = require("express");

const cors = require("cors");
const connection = require("./database/connection");
const Routes = require("./routes/indexRoutes");
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const { initializeSocket } = require("./socket/socket");

const app = express();
const PORT = 8000;
const server = http.createServer(app); 

connection();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/api", Routes);

initializeSocket(server)

server.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});