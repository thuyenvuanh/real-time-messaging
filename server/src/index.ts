import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import registerRoomHandlers from "./services/room";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import registerMessageStreamHandler from "./services/message";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});
const port = process.env.PORT;
const onConnection = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  registerRoomHandlers(io, socket);
  registerMessageStreamHandler(io, socket);
  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
};

app.get("/", (req, res) => {
  res.send("OK");
});

io.on("connection", onConnection);

httpServer.listen(port, () => console.log("[server]: Server is running"));
