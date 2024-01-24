import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';
import { ServiceResult } from '../../models/base/service-result';
@Injectable({
    providedIn: 'root'
})
export class SocialService extends BaseService {
    constructor(httpService: HttpService) {
        super(httpService);
        this.controller = 'social';
    }

    information() {
        const url = this.url() + '/social-information';
        return this.http.get<ServiceResult>(url);
    }

    updateInformation(social) {
        const url = this.url() + '/update-social';
        return this.http.put<ServiceResult>(url, social);
    }
}
