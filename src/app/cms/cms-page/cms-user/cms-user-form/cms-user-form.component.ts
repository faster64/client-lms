import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DxTextBoxComponent } from 'devextreme-angular';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { FormMode } from 'src/app/shared/enums/form-mode.enum';
import { UserService } from 'src/app/shared/services/user/user.service';
import { CmsFormComponent } from '../../cms-page-form.component';
import { ClassSelectorComponent } from 'src/app/shared/components/micro/class-selector/class-selector.component';
import { UserClientService } from 'src/app/shared/services/user/user-client.service';
import { UserState } from 'src/app/shared/enums/user-state.enum';

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
    this.data.isClient = true;
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    if (this.formMode != FormMode.View) {
      this.fullname.instance.focus();
    }
  }

  override loaded = () => {
    this.selector.value = this.data.classId;
    this.selector.getClassList();
  }

  override initConfig(): void {
    super.initConfig();
    this.path = Routing.CMS_USER.path;
    this.service = this.injector.get(UserClientService);
  }
}
