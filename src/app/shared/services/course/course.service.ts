import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';
import { CourseStatus } from '../../enums/course-status.enum';
import { PaginationRequest } from '../../models/base/pagination-request';
import { StringHelper } from '../../helpers/string.helper';
import { CommonConstant } from '../../constants/common.constant';
import { ServiceResult } from '../../models/base/service-result';
@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService {

  public static Statuses = [
    {
      id: CourseStatus.Release,
      text: 'Đã phát hành'
    },
    {
      id: CourseStatus.CommingSoon,
      text: 'Sắp ra mắt'
    },
    {
      id: CourseStatus.Inactive,
      text: 'Ngừng phát hành'
    }
  ]

  constructor(httpService: HttpService) {
    super(httpService);
    this.controller = 'course';
  }
}
