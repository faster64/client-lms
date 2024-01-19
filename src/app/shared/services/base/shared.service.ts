import { Injectable } from '@angular/core';
import { HubConnectionState } from '@microsoft/signalr';
import { DeviceType } from '../../enumerations/device.enum';
import { HubConnectionService } from './hub-connection.service';
import { TransferDataService } from './transfer-data.service';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  static OnlineUsers = 0;

  static DeviceType = DeviceType.Desktop;

  static UnderMaintenanceMode = false;

  private _previousScreen = "";

  get previousScreen() {
    return this._previousScreen;
  };

  private _lastVisitedScreen = "";

  get lastVisitedScreen() {
    return this._lastVisitedScreen;
  };

  set lastVisitedScreen(value: string) {
    this._previousScreen = this.lastVisitedScreen;
    this._lastVisitedScreen = value;
    this.transferService.changeScreenEvent.emit(value);
    console.customize(`last visited screen:`, this._lastVisitedScreen);
  }

  get currentLanguage(): string {
    return 'vi-VN';
  }

  onlineUsersText() {
    switch (this.hubService.connection.state) {
      case HubConnectionState.Connected:
        return SharedService.OnlineUsers + " đang xem";
      case HubConnectionState.Disconnected:
        return "Kết nối bị ngắt";
      case HubConnectionState.Reconnecting:
        return "Đang kết nối lại...";
      default:
        return "Unknown";
    }
  }

  constructor(
    private transferService: TransferDataService,
    private hubService: HubConnectionService
  ) {
  }
}
