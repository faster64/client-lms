import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { NotificationModel } from 'src/app/models/notification/notification';
import { SnackBarParameter } from 'src/app/models/snackbar.param';
import { NotificationType } from 'src/app/shared/enumerations/notification-type.enum';
import { DateHelper } from 'src/app/shared/helpers/date.helper';
import { SharedService } from 'src/app/shared/services/base/shared.service';
import { TransferDataService } from 'src/app/shared/services/base/transfer-data.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { BaseComponent } from '../../base-component';
import { SnackBar } from '../../element/snackbar/snackbar.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent extends BaseComponent {

  NotificationType = NotificationType;

  isLoadingNumberOfUnreadNotification = false;

  isLoadingNotification = false;

  notifications: NotificationModel[] = [];

  numberOfNotifications = 99;

  navbarOn = "all";

  selectedNotification = new NotificationModel();

  constructor(
    public override injector: Injector,
    public router: Router,
    public override sharedService: SharedService,
    public transferService: TransferDataService,
    public notificationService: NotificationService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.transferService.receivedNotificationEvent
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(socketMessage => {
        SnackBar.warning(new SnackBarParameter(this, socketMessage.message, 3500, () => {
          // this.router.navigateByUrl(`/${Routing.SIGN_IN_HISTORY.path}`);
        }));
        this.loadNotificationAndNumberUnread();
      });
  }

  override initData() {
    super.initData();
    this.loadNumberOfUnreadNotification();
  }

  loadNumberOfUnreadNotification() {
    if (this.isLoadingNumberOfUnreadNotification) {
      return;
    }

    this.isLoadingNumberOfUnreadNotification = true;
    this.notificationService.getNumberOfUnreadNotification()
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(resp => {
        this.isLoadingNumberOfUnreadNotification = false;
        if (resp.code == 'success') {
          this.numberOfNotifications = resp.data;
        }
      },
        _ => this.isLoadingNumberOfUnreadNotification = false
      )
  }

  loadNotifications() {
    if (this.isLoadingNotification) {
      return;
    }

    this.isLoadingNotification = true;
    this.paginationRequest.size = 32;
    this.notificationService.getNotificationPaging(this.paginationRequest, this.navbarOn)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(resp => {
        this.isLoadingNotification = false;
        if (resp.code == 'success') {
          this.notifications = resp.data;
          this.notifications.forEach(notification => {
            notification.datetime = DateHelper.DisplayTimeAgo(notification.timestamp);
            notification.isLoading = false;
          })
        }
      },
        _ => this.isLoadingNotification = false
      )
  }

  loadNotificationAndNumberUnread() {
    this.loadNumberOfUnreadNotification();
    this.loadNotifications();
  }

  changeNavigator(value: string) {
    this.navbarOn = value;
    this.loadNotifications();
  }

  markAsRead(notification: NotificationModel, event) {
    this.stopEvent(event);
    if (!notification.isUnread) {
      return;
    }

    notification.isLoading = true;
    this.notificationService.markAsRead(notification.id)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(resp => {
        notification.isLoading = false;
        if (resp.code == 'success') {
          this.loadNotificationAndNumberUnread();
        }
      });
  }

  markAsUnread(notification: NotificationModel, event) {
    this.stopEvent(event);
    if (notification.isUnread) {
      return;
    }

    notification.isLoading = true;
    this.notificationService.markAsUnread(notification.id)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(resp => {
        notification.isLoading = false;
        if (resp.code == 'success') {
          this.loadNotificationAndNumberUnread();
        }
      });
  }

  markAllAsRead(event) {
    this.stopEvent(event);
    this.notificationService.markAllAsRead()
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.loadNotificationAndNumberUnread();
        }
      });
  }

  displayNotificationNumber() {
    if (this.numberOfNotifications < 10) {
      return this.numberOfNotifications;
    }
    return '9+';
  }

  deleteNotification(item, event) {
    const noti = this.notifications.find(x => x.id == item.id);
    noti.isLoading = true;
    this.notificationService
      .delete([item.id])
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(resp => {
        noti.isLoading = false;
        if (resp.code == 'success') {
          this.loadNotificationAndNumberUnread();
        }
      });
  }

  redirect(path: string) {
    return this.router.navigateByUrl(`/${path}`);
  }

  stopEvent(event) {
    event.stopPropagation();
    event.preventDefault();
  }
}
