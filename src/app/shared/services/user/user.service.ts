import { Injectable } from "@angular/core";
import { BaseService } from "../base/base.service";
import { HttpService } from "../base/http.service";
import { ServiceResult } from "../../models/base/service-result";
import { User } from "../../models/user/user";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  public user = new User();

  constructor(
    http: HttpService
  ) {
    super(http);
    this.controller = 'user';
  }


}
