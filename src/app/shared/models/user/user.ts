import { BaseModel } from "../base/base-model";

export class User extends BaseModel {
  public avatarUrl = "";
  public email = "";
  public username = "";
  public phoneNumber = "";
  public confirmedPhone = false;
  public confirmedEmail = false;
  public fullName = "";
  public state = 0;
  public stateText = "";
}
