import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';
import { ServiceResult } from '../../models/base/service-result';
import { PracticeTest } from '../../models/lesson/practice-test';
import { TestingDraft } from '../../models/lesson/testing-draft';
import { CommonConstant } from '../../constants/common.constant';
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

  saveDraft(lessonId, draft: TestingDraft) {
    const url = `${this.url()}/save-draft?lessonId=${lessonId}&${CommonConstant.DISALLOW_NOTICE}`;
    return this.http.post<ServiceResult>(url, draft);
  }
}
