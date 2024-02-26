import { Injectable } from '@angular/core';
import { ServiceResult } from '../../models/base/service-result';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';
@Injectable({
  providedIn: 'root'
})
export class TestingService extends BaseService {

  constructor(httpService: HttpService) {
    super(httpService);
    this.controller = 'testing';
  }

  getDraft(lessonId) {
    const url = `${this.url()}/draft?lessonId=${lessonId}`;
    return this.http.get<ServiceResult>(url, this._baseOptions);
  }
}
