export interface Message {
  sender: string;
  content: string;
  type: 'message' | 'status';
}
