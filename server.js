const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");

const config = require("./config/config");

const app = express();
const server = http.createServer(app);
const io = new Server(server,
  {
    cors: config.socketCors
  }
);

app.use(cors());

require("./route")(app);

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

require("./socket")(io);

server.listen(config.port, () => {
  console.log(`Server listening to ${config.port}`);
})
