declare module "kickit-websocket" {
  export interface ClientChatMessage {
    command: number;
    content: string;
    user: string;
    channel: string;
  }

  export interface ServerChatMessage extends ClientChatMessage {
    timestamp: string;
  }

}