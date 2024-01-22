import { Injectable } from "@angular/core";
import { BaseService } from "../base/base.service";
import { HttpService } from "../base/http.service";
import { ServiceResult } from "../../models/base/service-result";

@Injectable({
  providedIn: 'root'
})
export class UtilsService extends BaseService {

  constructor(
    http: HttpService
  ) {
    super(http);
    this.controller = 'utils';
  }

  uploadImage(formData: FormData) {
    const url = `${this.url()}/upload-image`;
    return this.http.post<ServiceResult>(url, formData);
  }
}
