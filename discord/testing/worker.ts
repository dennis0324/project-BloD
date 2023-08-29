const http = require("http");
const { Server } = require("socket.io");
const { setupWorker } = require("@socket.io/sticky");
const { createAdapter } = require("@socket.io/cluster-adapter");

const httpServer = http.createServer();
const io = new Server(httpServer);

// use the cluster adapter
io.adapter(createAdapter());

// setup connection with the primary process
setupWorker(io);

io.on("connection", (socket) => {
  console.log('testing')
});