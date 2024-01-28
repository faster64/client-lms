import { Injectable } from "@angular/core";
import { User } from "../../models/user/user";
import { BaseService } from "../base/base.service";
import { HttpService } from "../base/http.service";
import { UserState } from "../../enums/user-state.enum";
import { ServiceResult } from "../../models/base/service-result";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  public user = new User();

  public static States = [
    { id: UserState.Active, text: "Đang hoạt động" },
    { id: UserState.Inactive, text: "Ngừng hoạt động" },
  ]

  constructor(
    http: HttpService
  ) {
    super(http);
    this.controller = 'user';
  }

  information() {
    const url = this.url() + '/information';
    return this.http.get<ServiceResult>(url);
  }
}
