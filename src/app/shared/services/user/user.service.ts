import { Injectable } from "@angular/core";
import { User } from "../../models/user/user";
import { BaseService } from "../base/base.service";
import { HttpService } from "../base/http.service";
import { UserState } from "../../enums/user-state.enum";
import { ServiceResult } from "../../models/base/service-result";
import { StringHelper } from "../../helpers/string.helper";
import { of } from "rxjs";

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

  getProfile() {
    if (this.user && !StringHelper.isNullOrEmpty(this.user.id) && this.user.id != '0') {
      var resp = new ServiceResult();
      resp.code = 'success';
      resp.data = this.user;

      return of(resp);
    }

    const url = this.url() + '/profile';
    return this.http.get<ServiceResult>(url);
  }

  updateProfile(entity: any) {
    return this.http.put<ServiceResult>(this.url() + '/update-profile', entity, this._baseOptions);
  }
}
