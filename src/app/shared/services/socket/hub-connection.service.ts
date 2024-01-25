import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { Observable, from, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SnackBar } from '../../snackbar/snackbar.component';
import { SnackBarParameter } from '../../snackbar/snackbar.param';
import { AuthService } from '../auth/auth.service';
import { PublisherService } from '../base/publisher.service';
import { SocketMessage } from './socket-message';
import { SocketType } from './socket-type.enum';

@Injectable({
  providedIn: 'root'
})
export class HubConnectionService {

  connection!: HubConnection;

  isAuthenticated = false;

  constructor(
    public authService: AuthService,
    public transferService: PublisherService
  ) {
    this.initConnection();
  }

  initConnection() {
    this.connection = new HubConnectionBuilder()
      .withUrl(environment.hub_url, {
        accessTokenFactory: () => this.authService.getAccessToken(),
        withCredentials: false,
        timeout: 120000
      })
      .withAutomaticReconnect([0, 1000, 2000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 8000])
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.listenEvents();
  }

  connectHub(callback?: Function): Observable<boolean> {
    this
      .start()
      .subscribe(() => {
        console.log(`SignalR connected`);
        if (callback) {
          callback();
        }
        return of(true);
      })
    return of(true);
  }

  closeHub(callback?: Function) {
    this
      .stop()
      .subscribe(() => {
        if (callback) {
          callback();
        }
      });
  }

  start() {
    if (this.connection.state != HubConnectionState.Connected && this.connection.state != HubConnectionState.Connecting) {
      return from(this.connection.start());
    }
    return of(void 0);
  }

  stop() {
    if (this.connection && this.connection.state == HubConnectionState.Connected) {
      return from(this.connection.stop());
    }
    return of(void 0);
  }

  listenEvents() {
    this.onReceiveMessage();
    this.connection.onreconnecting(() => {
      console.warn("Kết nối tới máy chủ bị gián đoạn, đang thử kết nối lại...");
      SnackBar.warning(new SnackBarParameter(this, "Mất kết nối tới máy chủ, đang thử kết nối lại...", SnackBar.forever));

    });
    this.connection.onreconnected(() => {
      console.log("Kết nối tới máy chủ được phục hồi");
      SnackBar.success(new SnackBarParameter(this, "Kết nối tới máy chủ được phục hồi", 2000));
    });
    this.connection.onclose((error) => {
      console.log("Không thể kết nối tới máy chủ");
      SnackBar.danger(new SnackBarParameter(this, "Không thể kết nối tới máy chủ", SnackBar.forever));
    });
  }

  onReceiveMessage() {
    this.connection.on('ReceiveMessage', (socketMessage: SocketMessage) => {
      console.log(`[${this.connection.connectionId}] received a message: `, socketMessage);
      switch (socketMessage.type) {
        case SocketType.Login:
          break;
        case SocketType.Logout:
          this.authService.logout();
          break;
        case SocketType.FindLogout:
          console.log("Find logout: ", socketMessage);
          if (this.authService.getUserId() + "" == socketMessage.message) {
            this.authService.logout();
          }
          break;
        case SocketType.OnlineUser:
          break;
        case SocketType.UpdateRole:
        case SocketType.UpdateAccount:
          break;
        default:
          console.log(socketMessage);
          break;
      }
    });
  }

  sendMessage(message: string) {
    if (this.connection && this.connection.state === HubConnectionState.Connected) {
      this.connection.invoke("SendMessage", message);

    } else {
      this.connectHub(() => this.sendMessage(message));
    }
  }
}
