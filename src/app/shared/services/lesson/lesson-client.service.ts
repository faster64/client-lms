import { Injectable } from '@angular/core';
import { CommonConstant } from '../../constants/common.constant';
import { StringHelper } from '../../helpers/string.helper';
import { PaginationRequest } from '../../models/base/pagination-request';
import { ServiceResult } from '../../models/base/service-result';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';
@Injectable({
    providedIn: 'root'
})
export class LessonClientService extends BaseService {

    constructor(httpService: HttpService) {
        super(httpService);
        this.controller = 'lessonclient';
    }

}
