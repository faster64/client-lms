import { BaseResponse } from "./base-response";

export class ServiceResult extends BaseResponse {
  public data: any;

  public total: number = 0;

  public serverTime = "";
}
