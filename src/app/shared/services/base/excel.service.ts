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

@Injectable({
  providedIn: 'root'
})
export class ExcelService extends BaseService {

  override controller = "";

  public apiExcelUrl() {
    return `${this.getBaseHost()}/${this.controller}`;
  }

  constructor(
    http: HttpService
  ) {
    super(http);
  }

  public exportAndDownload(controller: string, subject: Subject<void>, id?: string) {
    SnackBar.progress(new SnackBarParameter(this, 'Yêu cầu đang được xử lý', SnackBar.forever));
    this.controller = controller;
    const api = id ? this.exportById(id) : this.export();

    api.pipe(takeUntil(subject))
      .subscribe(
        response => {
          setTimeout(() => {
            SnackBar.close();
          }, 1000);
          if (response.code == "success") {
            window.location.href = `${this.apiExcelUrl()}/download?key=${response.data}`;
          }
        }
      )
  }

  public export() {
    const url = `${this.apiExcelUrl()}/export`;
    return this.http.get<ServiceResult>(url);
  }

  public exportById(id: string) {
    const url = `${this.apiExcelUrl()}/export/${id}`;
    return this.http.get<ServiceResult>(url);
  }

  public getExportUrl(module = "", key: string) {
    return `${this.apiExcelUrl()}/${module}/export?key=${key}`;
  }

  public getImportTemplateKey(module = "") {
    const url = `${this.apiExcelUrl()}/${module}/import-template-key`;
    return this.http.post<BaseResponse>(url, null);
  }

  public downloadImportTemplate(module = "", key: string) {
    return `${this.apiExcelUrl()}/${module}/download-template?key=${key}`;
  }

}
