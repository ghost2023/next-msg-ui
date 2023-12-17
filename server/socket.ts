import { Message } from "@/services/types";
import http from "http";
import { Server } from "socket.io";

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connect", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("join_conversation", (cid) => {
    socket.join(cid);
    console.log(`user with id-${socket.id} joined convo - ${cid}`);
  });

  socket.on("msg-send", (data: Message) => {
    console.log(data, "DATA");
    //This will send a message to a specific convo
    socket.to(data.conversationId).emit("msg-receive", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
