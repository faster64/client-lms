import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';
import { TicketStatus } from '../../enums/ticket-status.enum';
import { Observable } from 'rxjs';
import { PaginationRequest } from '../../models/base/pagination-request';
import { ServiceResult } from '../../models/base/service-result';
@Injectable({
  providedIn: 'root'
})
export class TicketService extends BaseService {

  public static States = [
    { id: TicketStatus.NotResponsed, text: "Chưa phản hồi" },
    { id: TicketStatus.Responsed, text: "Đã phản hồi" },
  ]

  constructor(httpService: HttpService) {
    super(httpService);
    this.controller = 'ticket';
    this.pagingEndpoint = 'paging2';
  }


}
