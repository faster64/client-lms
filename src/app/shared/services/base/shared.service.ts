import { Injectable } from '@angular/core';
import { HubConnectionState } from '@microsoft/signalr';
import { HttpService } from './http.service';
import { PublisherService } from './publisher.service';
import { DeviceType } from '../../enums/device.enum';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  static OnlineUsers = 0;
  static DeviceType = DeviceType.Desktop;
  static UnderMaintenanceMode = false;

  get currentLanguage(): string {
    return 'vi-VN';
  }
}
