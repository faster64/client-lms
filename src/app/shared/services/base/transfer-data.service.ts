import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

  cancelRouteProgressEvent = new EventEmitter<any>();
  changeScreenEvent = new EventEmitter<any>();
  resolvedEvent = new EventEmitter<any>();

  constructor() { }
}
