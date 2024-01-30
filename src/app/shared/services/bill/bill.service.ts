import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';
import { ServiceResult } from '../../models/base/service-result';
import { BillStatus } from '../../enums/bill-status.enum';
@Injectable({
  providedIn: 'root'
})
export class BillService extends BaseService {

  public static States = [
    { id: BillStatus.Unpaid, text: "Chưa thanh toán" },
    { id: BillStatus.WaitConfirm, text: "Chờ xác nhận" },
    { id: BillStatus.Paid, text: "Đã thanh toán" },
  ]

  constructor(httpService: HttpService) {
    super(httpService);
    this.controller = 'bill';
  }

  check(data) {
    const url = this.url() + `/check`;
    return this.http.post<ServiceResult>(url, data);
  }

  requestConfirm(id) {
    const url = this.url() + `/request-confirm/` + id;
    return this.http.put<ServiceResult>(url, {});
  }

  confirm(id) {
    const url = this.url() + `/confirm/` + id;
    return this.http.put<ServiceResult>(url, {});
  }
}
