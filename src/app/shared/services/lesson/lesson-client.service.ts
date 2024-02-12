import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';
import { ServiceResult } from '../../models/base/service-result';
@Injectable({
  providedIn: 'root'
})
export class LessonClientService extends BaseService {

  constructor(httpService: HttpService) {
    super(httpService);
    this.controller = 'lessonclient';
  }

  getLessonById(id: string, courseId: string) {
    const url = `${this.url()}/${id}?courseId=${courseId}`;
    return this.http.get<ServiceResult>(url, this._baseOptions);
  }
}
