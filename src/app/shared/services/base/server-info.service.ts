import { Injectable } from "@angular/core";
import { ServiceResult } from "src/app/models/base/service-result";
import { BaseService } from "./base.service";
import { HttpService } from "./http.service";
import { environment } from "src/environments/environment";
import { CommonConstant } from "../../constants/common.constant";

interface ServerTime {
  ts: number;
  h: string;
  format: string;
  offset: number;
  tz: any;
}

@Injectable({
  providedIn: 'root'
})
export class ServerInfoService extends BaseService {

  serverTime: ServerTime;

  constructor(
    http: HttpService
  ) {
    super(http);
    this.controller = 'serverinfo';
  }

  override url = () => `${environment.base_host}/${this.controller}`;

  checkConnect() {
    const url = `${environment.base_host}/ping?${CommonConstant.NO_RETRY}&${CommonConstant.DISALLOW_NOTICE}`;
    return this.http.get<ServiceResult>(url);
  }

  getServerTime() {
    if (this.serverTime) {
      return;
    }
    const url = `${this.url()}/server-time`;
    this.http.get<ServerTime>(url).subscribe(resp => this.serverTime = resp);
  }
}
