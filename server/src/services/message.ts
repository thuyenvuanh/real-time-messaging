import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { MessageContent } from "../utils/type";

function registerMessageStreamHandler(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
  const messageStream = (message: MessageContent) => {
    io.to(message.roomId).emit('message:out', message);
  }

  socket.on('message:in', messageStream);
}

export default registerMessageStreamHandler;