import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { UserState } from 'src/app/shared/enums/user-state.enum';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-cms-user-states',
  templateUrl: './cms-user-states.component.html',
  styleUrls: ['./cms-user-states.component.scss']
})
export class CmsUserStatesComponent extends BaseComponent {

  @Input()
  state = UserState.Active;

  @Input()
  disabled = false;

  @Input()
  showDropdown = true;

  @Output()
  onChanged = new EventEmitter();

  states = UserService.States;

  current: any = {};

  otherStates: any[] = [];

  show = false;

  override ngOnInit(): void {
    super.ngOnInit();
    this.current = this.states.find(x => x.id == this.state);
    this.otherStates = this.states.filter(x => x.id != this.state);
  }

  click(event) {
    if (this.disabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    this.show = !this.show;
  }

  change(item, event) {
    this.current = item;
    this.otherStates = this.states.filter(x => x.id != this.current.id);
    this.state = this.current.id;
    this.onChanged.emit(this.current);
  }
}
