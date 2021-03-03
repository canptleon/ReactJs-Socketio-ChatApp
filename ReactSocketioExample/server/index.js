const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const server = express()
  .listen(5000, () =>console.log("5000. port dinleniyor."))

io = socket(server);

io.on("connection", (socket) => {
  console.log(socket.id + " Socket kodlu kişi bağlandı.");

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("Kullanıcı odaya bağlandı.");
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data.content);
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " Socket kodlu kişi çıktı.");
  });
});
