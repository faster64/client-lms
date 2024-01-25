import { SocketType } from "./socket-type.enum";

export class SocketMessage {
    public type = SocketType.Message;
    public message: any;
}