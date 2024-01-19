import { Injectable } from "@angular/core";
import { ServiceResult } from "src/app/models/base/service-result";
import { BaseService } from "../base/base.service";
import { HttpService } from "../base/http.service";
import { TimeModel } from "src/app/models/base/time-model";
import { of, switchMap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilsService extends BaseService {

  static TimeOptions: TimeModel[] = [];

  constructor(
    http: HttpService
  ) {
    super(http);
    this.controller = 'utils';
  }

  uploadImage(formData: FormData) {
    const url = `${this.getUrl()}/upload-image`;
    return this.http.post<ServiceResult>(url, formData);
  }

  getTimeRangeOptions() {
    if (UtilsService.TimeOptions.length) {
      const resp = new ServiceResult();
      resp.code = 'success';
      resp.data = UtilsService.TimeOptions;
      return of(resp);
    }

    const url = `${this.getUrl()}/time-range-options`;
    return this.http
      .get<ServiceResult>(url)
      .pipe(
        switchMap(resp => {
          if (resp.code == 'success') {
            UtilsService.TimeOptions = resp.data;
            return of(resp.data);
          }
          return throwError(resp);
        })
      )
  }
}
