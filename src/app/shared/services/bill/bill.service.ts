import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';
import { ServiceResult } from '../../models/base/service-result';
@Injectable({
    providedIn: 'root'
})
export class BillService extends BaseService {
    constructor(httpService: HttpService) {
        super(httpService);
        this.controller = 'bill';
    }

    check(data) {
        const url = this.url() + `/check`;
        return this.http.post<ServiceResult>(url, data);
    }

    confirm(id) {
        const url = this.url() + `/request-confirm/` + id;
        return this.http.put<ServiceResult>(url, {});
    }
}
