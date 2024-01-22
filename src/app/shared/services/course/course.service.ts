import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';
@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService {

  constructor(httpService: HttpService) {
    super(httpService);
    this.controller = 'course';
  }
}
