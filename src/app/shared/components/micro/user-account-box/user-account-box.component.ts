import { Component, Injector, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { RequestInformation } from 'src/app/models/base/request-information';
import { Message } from 'src/app/models/message';
import { SnackBarParameter } from 'src/app/models/snackbar.param';
import { Event } from 'src/app/shared/constants/event';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { PopupService } from 'src/app/shared/services/base/popup.service';
import { SharedService } from 'src/app/shared/services/base/shared.service';
import { TransferDataService } from 'src/app/shared/services/base/transfer-data.service';
import { TranslationService } from 'src/app/shared/services/base/translation.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { UserService } from 'src/app/shared/services/user/user.serivce';
import { BaseComponent } from '../../base-component';
import { MessageBox } from '../../element/message-box/message-box.component';
import { SnackBar } from '../../element/snackbar/snackbar.component';
import { UploadAvatarComponent } from '../../element/upload-avatar/upload-avatar.component';
import { BaseButton } from '../button/button.component';

@Component({
  selector: 'app-user-account-box',
  templateUrl: './user-account-box.component.html',
  styleUrls: ['./user-account-box.component.scss']
})
export class UserAccountBoxComponent extends BaseComponent {

  shortName = "";

  ipInformation = new RequestInformation();

  isLoadingInformation = false;

  isLoadingIp = false;

  ref: MatDialogRef<UploadAvatarComponent>;

  @ViewChild("signoutBtn")
  signoutBtn!: BaseButton;

  constructor(
    public override injector: Injector,
    public router: Router,
    public override sharedService: SharedService,
    public translationService: TranslationService,
    public transferService: TransferDataService,
    public authService: AuthService,
    public userService: UserService,
    public dialog: MatDialog,
    public popupService: PopupService,
    // public appService: AppService,
    public notificationService: NotificationService
  ) {
    super(injector);
  }

  override initData(): void {
    super.initData();
    this.loadInformation();

    this.transferService.updateAvatarEvent
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(resp => {
        this.ref?.close();
        this.loadInformation();
      });
  }

  openMenu() {
    this.loadIp();
  }

  loadIp() {
    if (this.ipInformation.ip != '' || this.isLoadingIp) {
      return;
    }

    this.isLoadingIp = true;
    this.authService
      .getRequestInformation()
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(
        resp => {
          this.isLoadingIp = false;
          if (resp.code == 'success') {
            this.ipInformation = resp.data;
          }
        },
        _ => this.isLoadingIp = false
      )
  }

  loadInformation() {
    if (this.isLoadingInformation) {
      return;
    }

    this.isLoadingInformation = true;
    this.userService.getInformation()
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(
        resp => {
          this.isLoadingInformation = false;
          if (resp.code == 'success' && resp.data) {
            this.userService.user = resp.data;
            if (StringHelper.isNullOrEmpty(this.userService.user.avatarUrl)) {
              this.setDefaultAvatar();
            }
          }
        },
        _ => this.isLoadingInformation = false
      )
  }

  uploadAvatar(event) {
    // event.stopPropagation();
    // event.preventDefault();
    const config = this.popupService.maxPingConfig(480, 320);
    config.position = { top: '0' };
    config.panelClass = ['upload-avatar-popup', 'slide-dialog'];

    this.ref = this.dialog.open(UploadAvatarComponent, config);
    this.ref.afterOpened().subscribe(() => document.querySelector('.cdk-overlay-pane.slide-dialog').classList.add('in'));
  }

  setDefaultAvatar() {
    this.userService.user.avatarUrl = '';
    this.shortName = this.authService.getAuth()['username'][0];
  }

  removeAvatar(event) {
    // event.stopPropagation();
    // event.preventDefault();
    MessageBox.confirm(new Message(this, { content: TranslationService.VALUES['USER']['REMOVE_AVATAR_CONFIRM_MSG'] }, () => {
      this.userService.removeAvatar()
        .pipe(takeUntil(this._onDestroySub))
        .subscribe(
          resp => {
            if (resp.code == 'success') {
              SnackBar.success(new SnackBarParameter(this, TranslationService.VALUES['USER']['REMOVE_AVATAR_SUCCESS_MSG']));
              this.loadInformation();
            }
          }
        )
    }));
  }

  signOut() {
    this.authService.signOut();
  }

  feedback(event) {
    this.stopEvent(event);
    // this.router.navigateByUrl(`/${Routing.FEEDBACK.path}`);
  }

  stopEvent(event) {
    event.stopPropagation();
    event.preventDefault();
  }
}
