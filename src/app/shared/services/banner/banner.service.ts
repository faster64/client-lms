import { Injectable } from '@angular/core';
import { CommonConstant } from '../../constants/common.constant';
import { ServiceResult } from '../../models/base/service-result';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';
@Injectable({
    providedIn: 'root'
})
export class BannerService extends BaseService {
    constructor(httpService: HttpService) {
        super(httpService);
        this.controller = 'banner';
    }

    information() {
        const url = this.url() + `/banner-information?${CommonConstant.DISALLOW_NOTICE}`;
        return this.http.get<ServiceResult>(url);
    }

    updateInformation(banner) {
        const url = this.url() + '/update-banner';
        return this.http.put<ServiceResult>(url, banner);
    }
}
