import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { CommonConstant } from '../../constants/common.constant';
import { LocalStorageKey } from '../../constants/localstorage-key.constant';
import { LocalHelper } from '../../helpers/local.helper';
import { PaginationRequest } from '../../models/base/pagination-request';
import { ServiceResult } from '../../models/base/service-result';
import { HttpOption, HttpService } from './http.service';
import { StringHelper } from '../../helpers/string.helper';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private baseHost = environment.base_host + "/" + environment.api_version;

  private apiVersion = environment.api_version;

  public serviceName = "";

  public controller = "";

  _baseOptions!: HttpOption;

  constructor(public http: HttpService) {
  }

  getBaseHost = () => this.baseHost;

  getApiVersion = () => this.apiVersion;

  url() {
    if (this.serviceName == '') {
      if (this.controller == '') {
        return this.getBaseHost();
      }
      return `${this.getBaseHost()}/${this.controller}`;
    }
    return `${this.getBaseHost()}/${this.serviceName}/${this.controller}`;
  }

  byId(id: any) {
    const url = `${this.url()}/${id}`;
    return this.http.get<ServiceResult>(url, this._baseOptions);
  }

  all(): Observable<ServiceResult> {
    const url = `${this.url()}?${CommonConstant.ALLOW_NOTICE_WITH_SNACKBAR_DANGER}`;
    return this.http.get<ServiceResult>(url, this._baseOptions);
  }

  paging(paginationRequest: PaginationRequest): Observable<ServiceResult> {
    let url = `${this.url()}/paging?page=${paginationRequest.number}&size=${paginationRequest.size}&query=${paginationRequest.query}`;

    if (!StringHelper.isNullOrEmpty(paginationRequest.sort.fieldName)) {
      url += (paginationRequest.sort.asc ? '&asc' : '&desc') + `=${paginationRequest.sort.fieldName}`;
    }

    url += `&${CommonConstant.ALLOW_NOTICE_WITH_SNACKBAR_DANGER}`;
    return this.http.get<ServiceResult>(url, this._baseOptions);
  }

  save(entity) {
    return this.http.post<ServiceResult>(this.url(), JSON.parse(JSON.stringify(entity)), this._baseOptions);
  }

  update(entity: any) {
    return this.http.put<ServiceResult>(this.url(), entity, this._baseOptions);
  }

  delete(ids: any[]) {
    return this.http.delete<ServiceResult>(this.url(), ids.map(id => id + ""), this._baseOptions);
  }

  getSequence() {
    const url = `${this.url()}/sequence`;
    return this.http.get<ServiceResult>(url, this._baseOptions);
  }
}
