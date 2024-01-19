import { Injectable } from "@angular/core";
import { BaseService } from "../base/base.service";
import { HttpService } from "../base/http.service";
import { ServiceResult } from "src/app/models/base/service-result";
import { PaginationRequest } from "src/app/models/base/pagination-request";
import { CommonConstant } from "../../constants/common.constant";

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseService {
  constructor(
    http: HttpService
  ) {
    super(http);

    this.serviceName = '';
    this.controller = 'notification';
  }

  getOnlineUsers() {
    const url = `${this.getUrl()}/online-users?${CommonConstant.DISALLOW_NOTICE}`;
    return this.http.get<ServiceResult>(url);
  }

  getOnlineDetail() {
    const url = `${this.getUrl()}/online-detail?${CommonConstant.DISALLOW_NOTICE}`;
    return this.http.get<ServiceResult>(url);
  }

  getNumberOfUnreadNotification() {
    const url = `${this.getUrl()}/number-of-unread-notification?${CommonConstant.DISALLOW_NOTICE}`;
    return this.http.get<ServiceResult>(url);
  }

  getNotificationPaging(paginationRequest: PaginationRequest, type = "") {
    const page = paginationRequest.number;
    const size = paginationRequest.size;

    const url = `${this.getUrl()}/list?page=${page}&size=${size}&type=${type}&${CommonConstant.ALLOW_NOTICE_WITH_SNACKBAR_DANGER}`;
    return this.http.get<ServiceResult>(url, this._baseOptions);
  }

  markAsRead(id: string) {
    const url = `${this.getUrl()}/mark-as-read/${id}`;
    return this.http.put<ServiceResult>(url, null);
  }

  markAsUnread(id: string) {
    const url = `${this.getUrl()}/mark-as-unread/${id}`;
    return this.http.put<ServiceResult>(url, null);
  }

  markAllAsRead() {
    const url = `${this.getUrl()}/mark-all-as-read`;
    return this.http.put<ServiceResult>(url, null);
  }
}
