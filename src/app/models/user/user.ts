import { BaseModel } from "../base/base-model";

export class User extends BaseModel {
  public avatarUrl = "";
  public username = "";
  public phoneNumber = "";
  public confirmedPhone = false;
  public email = "";
  public confirmedEmail = false;
  public firstName = "";
  public lastName = "";
  public fullName = "";
  public address = "";
  public dateOfBirth: Date;
  public gender: number;
}
