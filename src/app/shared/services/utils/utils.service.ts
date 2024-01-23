import { Injectable } from "@angular/core";
import { BaseService } from "../base/base.service";
import { HttpService } from "../base/http.service";
import { ServiceResult } from "../../models/base/service-result";
import { environment } from "src/environments/environment";
import { HttpBackend, HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UtilsService extends BaseService {

  private httpClient: HttpClient;

  constructor(
    http: HttpService,
    public handler: HttpBackend,
  ) {
    super(http);
    this.httpClient = new HttpClient(handler);
    this.controller = 'storage';
  }

  override getBaseHost = () => environment.upload_url + '/api';

  uploadImage(formData: FormData) {
    const url = `${this.url()}/public/write`;
    return this.http.post<ServiceResult>(url, formData);
  }
}
