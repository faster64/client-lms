import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BillStatus } from 'src/app/shared/enums/bill-status.enum';
import { BillService } from 'src/app/shared/services/bill/bill.service';

@Component({
  selector: 'app-cms-bill-states',
  templateUrl: './cms-bill-states.component.html',
  styleUrls: ['./cms-bill-states.component.scss']
})
export class CmsBillStatesComponent extends BaseComponent {

  @Input()
  state = BillStatus.Unpaid;

  @Input()
  disabled = false;

  @Input()
  showDropdown = true;

  @Output()
  onChanged = new EventEmitter();

  states = BillService.States;

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
