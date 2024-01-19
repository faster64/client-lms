import { Injectable } from '@angular/core';
import { BaseResponse } from '../../../models/base/base-response';
import { PaginationRequest } from '../../../models/base/pagination-request';
import { BaseService } from './base.service';
import { HttpService } from './http.service';
import { ServiceResult } from '../../../models/base/service-result';
import { SnackBar } from '../../components/element/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/models/snackbar.param';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CommonConstant } from '../../constants/common.constant';

@Injectable({
  providedIn: 'root'
})
export class BehaviorService extends BaseService {

  constructor(
    http: HttpService
  ) {
    super(http);
    this.controller = 'behavior';
  }

  public collect(behavior: string) {
    const url = `${this.getUrl()}?${CommonConstant.DISALLOW_NOTICE}`;
    return this.http.post(url, { behavior: behavior });
  }
}
