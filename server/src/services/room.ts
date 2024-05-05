import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { MessageContent, Room } from "../utils/type";

function registerRoomHandlers(
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
  const roomJoin = (room: Room) => {
    socket.join(room.roomId);
    io.to(room.roomId).emit("message:out", {
      content: `${room.sender} joined the room`,
      sender: room.sender,
      roomId: room.roomId,
      type: 'status'
    } as MessageContent);
  };

  socket.on("room:join", roomJoin);
}

export default registerRoomHandlers;
