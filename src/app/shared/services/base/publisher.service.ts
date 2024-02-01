import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  loggedInEvent = new EventEmitter<any>();
  cancelRouteEvent = new EventEmitter<any>();
  changeScreenEvent = new EventEmitter<any>();
  resolvedEvent = new EventEmitter<any>();
  routeChangeEvent = new EventEmitter<any>();
  updateCartEvent = new EventEmitter<any>();
  updateCmsHeaderLabelEvent = new EventEmitter<any>();
  searchCourseEvent = new EventEmitter<any>();

  constructor() { }
}
