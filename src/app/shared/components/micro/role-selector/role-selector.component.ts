import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { Class } from 'src/app/shared/models/class/class';
import { Role } from 'src/app/shared/models/auth/role';
import { ClassService } from 'src/app/shared/services/class/class.service';
import { RoleService } from 'src/app/shared/services/auth/role.service';
import { finalize, takeUntil } from 'rxjs';

@Component({
  selector: 'app-role-selector',
  templateUrl: './role-selector.component.html',
  styleUrls: ['./role-selector.component.scss']
})
export class RoleSelectorComponent extends BaseComponent {

  fetching = false;

  roles: Role[] = [];

  @Input()
  value = '';

  @Input()
  readOnly = false;

  @Input()
  height = -1;

  @Output()
  onValueChanged = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public classService: RoleService
  ) {
    super(injector)
  }

  get() {
    this.fetching = true;
    this.classService.all()
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.fetching = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.roles = [];
          for (let i = 0; i < resp.data.length; i++) {
            this.roles = resp.data.filter(x => x.code != 'STUDENT');
          }
        }
      })
  }

  emit(event) {
    this.value = event.value;
    this.onValueChanged.emit({
      source: this.roles,
      current: event.value
    })
  }
}
