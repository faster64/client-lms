import { Injectable } from "@angular/core";
import { User } from "../../models/user/user";
import { BaseService } from "../base/base.service";
import { HttpService } from "../base/http.service";
import { Observable } from "rxjs";
import { PaginationRequest } from "../../models/base/pagination-request";
import { ServiceResult } from "../../models/base/service-result";
import { StringHelper } from "../../helpers/string.helper";
import { CommonConstant } from "../../constants/common.constant";

@Injectable({
    providedIn: 'root'
})
export class UserClientService extends BaseService {

    public user = new User();

    constructor(
        http: HttpService
    ) {
        super(http);
        this.controller = 'user';
    }

    override paging(paginationRequest: PaginationRequest): Observable<ServiceResult> {
        let url = `${this.url()}/client-paging?page=${paginationRequest.number}&size=${paginationRequest.size}&query=${paginationRequest.query}`;

        if (!StringHelper.isNullOrEmpty(paginationRequest.sort.fieldName)) {
            url += (paginationRequest.sort.asc ? '&orderBy' : '&orderByDescending') + `=${paginationRequest.sort.fieldName}`;
        }

        url += `&${CommonConstant.ALLOW_NOTICE_WITH_SNACKBAR_DANGER}`;
        return this.http.get<ServiceResult>(url, this._baseOptions);
    }
}
