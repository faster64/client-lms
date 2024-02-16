import { Role } from "../auth/role";
import { BaseModel } from "../base/base-model";
import { Class } from "../class/class";

export class User extends BaseModel {
  public avatar = "";
  public avatarUrl = "";
  public email = "";
  public username = "";
  public phoneNumber = "";
  public confirmedPhone = false;
  public confirmedEmail = false;
  public fullName = "";
  public state = 0;
  public stateText = "";
  public class = new Class();
  public classId = "";
  public roles: Role[] = [];
}
