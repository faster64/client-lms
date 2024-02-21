import { Injectable } from '@angular/core';
import { ServiceResult } from '../../models/base/service-result';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';
@Injectable({
    providedIn: 'root'
})
export class CartService extends BaseService {

    constructor(httpService: HttpService) {
        super(httpService);
        this.controller = 'cart';
    }

    check(courseIds: any[]) {
        const url = this.url() + `/check`;
        return this.http.post<ServiceResult>(url, { courseIds: courseIds });
    }
}
