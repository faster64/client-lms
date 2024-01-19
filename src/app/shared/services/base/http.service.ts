import { HttpClient, HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    public http: HttpClient
  ) { }

  public get<T>(url: string, options?: HttpOption): Observable<T> {
    if (options != null) {
      return this.http.request<T>('GET', url, options);
    }
    return this.http.get<T>(url);
  }

  public post<T>(url: string, body: any, options?: HttpOption): Observable<T> {
    if (options != null) {
      return this.http.request<T>('POST', url, Object.assign(options, { body: body }));
    }
    return this.http.post<T>(url, body);
  }

  public put<T>(url: string, body: any, options?: HttpOption): Observable<T> {
    if (options != null) {
      return this.http.request<T>('PUT', url, Object.assign(options, { body: body }));
    }
    return this.http.put<T>(url, body);
  }

  public delete<T>(url: string, body?: any, options?: HttpOption): Observable<T> {
    if (options != null) {
      return this.http.request<T>('DELETE', url, Object.assign(options, { body: body }));
    }
    return this.http.request<T>('DELETE', url, {
      body: body
    });
  }
}

export class HttpOption {
  public headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  // public observe!: 'events';
  public context?: HttpContext;
  public params?: HttpParams | {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  public reportProgress?: boolean;
  public responseType?: 'json';
  public withCredentials?: boolean;
}
