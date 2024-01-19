import { SignInType } from "src/app/shared/enumerations/sign-in-type.enum";
import { SocialUserExtend } from "../responses/social-user";

export class AuthRequest {
  public type = SignInType.Tradition;
  public userName = "";
  public password = "";
  public authGoogleRequest: SocialUserExtend;
}
