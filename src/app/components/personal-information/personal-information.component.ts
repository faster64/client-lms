import { Component, Injector, ViewChild } from '@angular/core';
import { DxTextBoxComponent } from 'devextreme-angular';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BaseButton } from 'src/app/shared/components/micro/button/button.component';
import { ClassSelectorComponent } from 'src/app/shared/components/micro/class-selector/class-selector.component';
import { User } from 'src/app/shared/models/user/user';
import { UserService } from 'src/app/shared/services/user/user.service';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent extends BaseComponent {

  user = new User();

  viewMode = true;

  roles = '';

  isStudent = false;

  @ViewChild("name")
  name: DxTextBoxComponent;

  @ViewChild("selector")
  selector: ClassSelectorComponent;

  @ViewChild("saveBtn")
  saveBtn: BaseButton;

  constructor(
    injector: Injector,
    public userService: UserService
  ) {
    super(injector);
  }

  override initData(): void {
    super.initData();
    this.load();
  }

  load() {
    this.isLoading = true;
    this.userService
      .getProfile()
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.userService.user = resp.data;
          this.user = resp.data;
          this.roles = this.user.roles.map(x => x.name).join(', ');
          this.isStudent = this.user.roles && this.user.roles.length == 1 && this.user.roles[0].code == 'student';
          setTimeout(() => {
            this.selector?.getClassList();
          }, 100);
        }
      })
  }

  selected(event) {
    this.user.avatar = event.fileNames[0];
    this.user.avatarUrl = event.presignedUrls[0];
  }

  update() {
    this.viewMode = false;
    setTimeout(() => {
      this.name.instance.focus();
    }, 50);
  }

  save() {
    this.isLoading = true;
    this.userService
      .updateProfile(this.user)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => { this.isLoading = false; this.saveBtn.finish() })
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.viewMode = true;
          this.userService.user = null;
          SnackBar.success(new SnackBarParameter(this, 'Cập nhật thông tin cá nhân thành công!', 'Bạn vừa hoàn tất quá trình cập nhật thông tin cá nhân tại Cánh Buồm Education. Chúng tôi sẵn sàng hỗ trợ bạn trong hành trình học tập của mình.'));
          this.load();
        }
      });
  }
}
