import { Component, Injector, ViewChild } from '@angular/core';
import { delay, finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { ClassSelectorComponent } from 'src/app/shared/components/micro/class-selector/class-selector.component';
import { User } from 'src/app/shared/models/user/user';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent extends BaseComponent {

  user = new User();

  viewMode = true;

  @ViewChild("selector")
  selector: ClassSelectorComponent;

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
      .information()
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.user = resp.data;
          this.selector.getClassList();
        }
      })
  }
}
