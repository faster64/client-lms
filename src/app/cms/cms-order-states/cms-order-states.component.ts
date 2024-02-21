import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { OrderStatus } from 'src/app/shared/enums/order-status.enum';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-cms-order-states',
  templateUrl: './cms-order-states.component.html',
  styleUrls: ['./cms-order-states.component.scss']
})
export class CmsOrderStatesComponent extends BaseComponent {

  @Input()
  state = OrderStatus.Unpaid;

  @Input()
  disabled = false;

  @Input()
  showDropdown = true;

  @Output()
  onChanged = new EventEmitter();

  states = OrderService.States;

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
