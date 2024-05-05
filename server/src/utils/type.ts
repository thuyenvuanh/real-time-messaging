export interface Room {
  roomId: string;
  sender: string;
}

export interface MessageContent extends Room{
  content: string;
  type: 'message' | 'status';
}
