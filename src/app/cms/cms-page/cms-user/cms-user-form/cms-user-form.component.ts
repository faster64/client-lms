import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DxTextBoxComponent } from 'devextreme-angular';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { FormMode } from 'src/app/shared/enums/form-mode.enum';
import { UserService } from 'src/app/shared/services/user/user.service';
import { CmsFormComponent } from '../../cms-page-form.component';
import { ClassSelectorComponent } from 'src/app/shared/components/micro/class-selector/class-selector.component';
import { UserClientService } from 'src/app/shared/services/user/user-client.service';
import { UserState } from 'src/app/shared/enums/user-state.enum';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';

@Component({
  selector: 'app-cms-user-form',
  templateUrl: './cms-user-form.component.html',
  styleUrls: ['./cms-user-form.component.scss']
})
export class CmsUserFormComponent extends CmsFormComponent implements AfterViewInit {

  states = UserService.States;

  @ViewChild("fullname")
  fullname!: DxTextBoxComponent;

  @ViewChild("selector")
  selector!: ClassSelectorComponent;

  override ngOnInit(): void {
    this.data.state = UserState.Active;
    this.data.class = {};
    this.data.isClient = true;
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    if (this.formMode != FormMode.View) {
      this.fullname.instance.focus();
    }
  }

  override initConfig(): void {
    super.initConfig();
    this.path = Routing.CMS_USER.path;
    this.service = this.injector.get(UserClientService);
  }

  override loaded = () => {
    this.selector.value = this.data.classId;
    this.selector.getClassList();
  }

  override filterResponse = (data: any) => {
    if (data.class) {
      data['className'] = data.class.name;
    } else {
      data.class = {};
    }
    return data;
  }

  override validate = () => {
    if (StringHelper.isNullOrEmpty(this.data.password)) {
      SnackBar.danger(new SnackBarParameter(this, 'Lỗi', 'Mật khẩu không được để trống'));
      return false;
    }
    return true;
  };

  override beforeSave(): void {
    this.data.isClient = true;
  }
}
