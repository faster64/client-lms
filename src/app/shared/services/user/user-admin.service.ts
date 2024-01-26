import { Injectable } from "@angular/core";
import { User } from "../../models/user/user";
import { BaseService } from "../base/base.service";
import { HttpService } from "../base/http.service";
import { Observable } from "rxjs";
import { PaginationRequest } from "../../models/base/pagination-request";
import { ServiceResult } from "../../models/base/service-result";
import { StringHelper } from "../../helpers/string.helper";
import { CommonConstant } from "../../constants/common.constant";

@Injectable({
  providedIn: 'root'
})
export class UserAdminService extends BaseService {

  public user = new User();

  constructor(
    http: HttpService
  ) {
    super(http);
    this.controller = 'useradmin';
  }
}
