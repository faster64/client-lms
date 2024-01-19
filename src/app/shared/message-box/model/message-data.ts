import { MessageBoxType } from "../enum/message.enum";

export class MessageData {
  public title? = "";
  public content = "";
  public boxType? = MessageBoxType.Information;
}
