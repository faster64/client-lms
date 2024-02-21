import { Injectable } from '@angular/core';
import { ServiceResult } from '../../models/base/service-result';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';
@Injectable({
  providedIn: 'root'
})
export class VNPayService extends BaseService {

  constructor(httpService: HttpService) {
    super(httpService);
    this.controller = 'vnpay';
  }

  getCodes() {
    const url = this.url() + `/vnpay-response-codes`;
    return this.http.get<ServiceResult>(url);
  }

  createUrl(data) {
    const url = this.url() + `/create`;
    return this.http.post<ServiceResult>(url, data);
  }
}
