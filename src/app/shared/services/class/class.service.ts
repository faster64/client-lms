import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';
import { ServiceResult } from '../../models/base/service-result';

@Injectable({
  providedIn: 'root'
})
export class ClassService extends BaseService {

  constructor(httpService: HttpService) {
    super(httpService);
    this.controller = 'class';
  }

  getClasses() {
    return this.http.get<ServiceResult>(this.getUrl() + '/available');
  }
}
