import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DxTextBoxComponent } from 'devextreme-angular';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { FormMode } from 'src/app/shared/enums/form-mode.enum';
import { UserState } from 'src/app/shared/enums/user-state.enum';
import { UserAdminService } from 'src/app/shared/services/user/user-admin.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { CmsFormComponent } from '../../cms-page-form.component';
import { RoleSelectorComponent } from 'src/app/shared/components/micro/role-selector/role-selector.component';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';

@Component({
  selector: 'app-cms-admin-form',
  templateUrl: './cms-admin-form.component.html',
  styleUrls: ['./cms-admin-form.component.scss']
})
export class CmsAdminFormComponent extends CmsFormComponent implements AfterViewInit {

  states = UserService.States;

  @ViewChild("fullname")
  fullname!: DxTextBoxComponent;

  @ViewChild("selector")
  selector!: RoleSelectorComponent;

  override ngOnInit(): void {
    this.data.state = UserState.Active;
    this.data.roles = [{ id: 0, roleId: 0 }];
    this.data.isClient = false;
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    if (this.formMode != FormMode.View) {
      this.fullname.instance.focus();
    }
  }

  override initConfig(): void {
    super.initConfig();
    this.path = Routing.CMS_ADMIN.path;
    this.service = this.injector.get(UserAdminService);
  }

  override loaded = () => {
    this.selector.value = (this.data.roles && this.data.roles.length) ? this.data.roles[0].roleId : '0';
    this.selector.get();
  }

  override validate = () => {
    if (StringHelper.isNullOrEmpty(this.data.password)) {
      SnackBar.danger(new SnackBarParameter(this, 'Lỗi', 'Mật khẩu không được để trống'));
      return false;
    }
    return true;
  };

  override beforeSave(): void {
    this.data.isClient = false;
  }
}
