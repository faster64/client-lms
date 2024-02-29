import { Injectable } from '@angular/core';
import { ServiceResult } from '../../models/base/service-result';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';
import { TestingFormData } from '../../models/lesson/testing-form-data';
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
    return this.http.get<ServiceResult>(url);
  }

  getTesting(lessonId) {
    const url = `${this.url()}/result?lessonId=${lessonId}`;
    return this.http.get<ServiceResult>(url);
  }

  submit(data: TestingFormData) {
    const url = `${this.url()}/submit`;
    return this.http.post<ServiceResult>(url, data);
  }

  remake(lessonId) {
    const url = `${this.url()}/remake?lessonId=${lessonId}`;
    return this.http.post<ServiceResult>(url, null);
  }
}
