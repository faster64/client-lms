import { Injectable } from '@angular/core';
import { CommonConstant } from '../../constants/common.constant';
import { ServiceResult } from '../../models/base/service-result';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';
@Injectable({
  providedIn: 'root'
})
export class GuideService extends BaseService {
  constructor(httpService: HttpService) {
    super(httpService);
    this.controller = 'guide';
  }

  information() {
    const url = this.url() + `/guide-information?${CommonConstant.DISALLOW_NOTICE}`;
    return this.http.get<ServiceResult>(url);
  }

  updateInformation(guide) {
    const url = this.url() + '/update-guide';
    return this.http.put<ServiceResult>(url, guide);
  }
}
