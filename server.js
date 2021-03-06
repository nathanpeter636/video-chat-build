const express = require("express");

const app = express();

const server = require("http").Server(app);

//https://socket.io/
const io = require("socket.io")(server);

//https://www.uuidgenerator.net/version4

const { v4: uuidv4 } = require("uuid");

//https://peerjs.com/

const { ExpressPeerServer } = require("peer");

const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/peerjs", peerServer);

app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

//https://socket.io/docs/v3/server-api/#Flag-%E2%80%98broadcast%E2%80%99

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);

    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message);
    });
  });
});

server.listen(process.env.PORT || 3030);
