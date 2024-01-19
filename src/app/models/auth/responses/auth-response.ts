import { BaseResponse } from "src/app/models/base/base-response";

export class AuthResponse extends BaseResponse {

  public accessToken: string = "";

  public refreshToken: string = "";

  public requiredMFA = false;
}
