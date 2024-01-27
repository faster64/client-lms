import { TicketStatus } from "../../enums/ticket-status.enum";
import { BaseModel } from "../base/base-model";

export class Ticket extends BaseModel {
  public fullName = '';
  public phoneNumber = '';
  public email = '';
  public classId = '';
  public className = '';
  public address = '';
  public question = '';
  public sentDate = new Date();
  public responseDate = new Date();
  public status = TicketStatus.NotResponsed;
}
