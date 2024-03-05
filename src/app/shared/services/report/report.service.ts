import { Injectable } from '@angular/core';
import { ServiceResult } from '../../models/base/service-result';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';
@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService {
  constructor(httpService: HttpService) {
    super(httpService);
    this.controller = 'report';
  }

  getByStudents(classId: string = '0') {
    const url = this.url() + `/students?classId=${classId}`;
    return this.http.get<ServiceResult>(url);
  }

  getStudentByLesson(classId: string = '0') {
    const url = this.url() + `/student-by-lesson?classId=${classId}`;
    return this.http.get<ServiceResult>(url);
  }
}
