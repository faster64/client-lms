import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { Observable, catchError, from, of, switchMap, throwError } from 'rxjs';
import { SnackBarParameter } from 'src/app/models/snackbar.param';
import { SocketMessage } from 'src/app/models/socket/socket-message';
import { environment } from 'src/environments/environment';
import { SnackBar } from '../../components/element/snackbar/snackbar.component';
import { DeviceType } from '../../enumerations/device.enum';
import { SocketType } from '../../enumerations/socket-type.enum';
import { SharedService } from './shared.service';
import { TransferDataService } from './transfer-data.service';
import { AuthService } from '../auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HubConnectionService {

  connection!: HubConnection;

  isAuthenticated = false;

  constructor(
    public authService: AuthService,
    public transferService: TransferDataService
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
        console.success(`SignalR connected`);
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
      if (SharedService.DeviceType == DeviceType.Desktop) {
        // SnackBar.warning(new SnackBarParameter(this, "Mất kết nối tới máy chủ, đang thử kết nối lại...", SnackBar.forever));
      }
    });
    this.connection.onreconnected(() => {
      console.success("Kết nối tới máy chủ được phục hồi");
      if (SharedService.DeviceType == DeviceType.Desktop) {
        // SnackBar.success(new SnackBarParameter(this, "Kết nối tới máy chủ được phục hồi", 2000));
      }
    });
    this.connection.onclose((error) => {
      console.err("Không thể kết nối tới máy chủ");
      if (SharedService.DeviceType == DeviceType.Desktop) {
        // SnackBar.danger(new SnackBarParameter(this, "Không thể kết nối tới máy chủ", SnackBar.forever));
      }
    });
  }

  onReceiveMessage() {
    this.connection.on('ReceiveMessage', (socketMessage: SocketMessage) => {
      console.customize(`[${this.connection.connectionId}] received a message: `, socketMessage);
      switch (socketMessage.type) {
        case SocketType.SignIn:
          this.transferService.receivedNotificationEvent.emit(socketMessage);
          break;
        case SocketType.SignOut:
          this.authService.signOut();
          break;
        case SocketType.OnlineUser:
          SharedService.OnlineUsers = socketMessage.message;
          break;
        case SocketType.UpdateRole:
          this.authService.removeAccessToken();
          this.authService.refreshing = true;
          this.authService.refreshToken().pipe(
            switchMap(response => {
              this.authService.refreshing = false;
              if (response.code == 'success') {
                this.authService.saveAuthenticate(response.accessToken, response.refreshToken);
              }
              return of(true);
            }),
            catchError((e: HttpErrorResponse) => {
              this.authService.refreshing = false;
              return throwError(e.error);
            })
          ).subscribe();
          SnackBar.warning(new SnackBarParameter(this, "Quản trị hệ thống vừa thay đổi quyền trong vai trò của bạn", 3000));
          break;
        case SocketType.ReceivedFile:
          this.transferService.receivedFileEvent.emit(socketMessage);
          break;
        case SocketType.NewFeedback:
          this.transferService.receivedNewFeedbackEvent.emit(socketMessage);
          break;
        case SocketType.SomeOneTyping:
          this.transferService.receivedSomeOnTypeingEvent.emit(socketMessage);
          break;

        default:
          console.customize(socketMessage);
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

  sendTyping() {
    if (this.connection && this.connection.state === HubConnectionState.Connected) {
      this.connection.invoke("SomeOneTyping");

    } else {
      this.connectHub(() => this.sendTyping());
    }
  }
}
