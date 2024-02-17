import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';
import { StringHelper } from '../../helpers/string.helper';
import { PaginationRequest } from '../../models/base/pagination-request';
import { CommonConstant } from '../../constants/common.constant';
import { ServiceResult } from '../../models/base/service-result';
@Injectable({
    providedIn: 'root'
})
export class CourseClientService extends BaseService {
    constructor(httpService: HttpService) {
        super(httpService);
        this.controller = 'courseclient';
    }

    public getMyCoursesPaging(classId: string, paginationRequest: PaginationRequest) {
        let url = `${this.url()}/my-courses?classId=${classId}&page=${paginationRequest.number}&size=${paginationRequest.size}&query=${paginationRequest.query}`;

        if (!StringHelper.isNullOrEmpty(paginationRequest.sort.fieldName)) {
            url += (paginationRequest.sort.asc ? '&asc' : '&desc') + `=${paginationRequest.sort.fieldName}`;
        }

        url += `&${CommonConstant.ALLOW_NOTICE_WITH_SNACKBAR_DANGER}`;
        return this.http.get<ServiceResult>(url, this._baseOptions);
    }

    getListLessonsPaging(courseId: string, paginationRequest: PaginationRequest) {
        let url = `${this.url()}/${courseId}/lessons?page=${paginationRequest.number}&size=${paginationRequest.size}&query=${paginationRequest.query}`;

        if (!StringHelper.isNullOrEmpty(paginationRequest.sort.fieldName)) {
            url += (paginationRequest.sort.asc ? '&asc' : '&desc') + `=${paginationRequest.sort.fieldName}`;
        }

        url += `&${CommonConstant.ALLOW_NOTICE_WITH_SNACKBAR_DANGER}`;
        return this.http.get<ServiceResult>(url, this._baseOptions);
    }
}
