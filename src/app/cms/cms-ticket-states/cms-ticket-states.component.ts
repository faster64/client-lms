import { Component, Input } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { TicketStatus } from 'src/app/shared/enums/ticket-status.enum';
import { TicketService } from 'src/app/shared/services/ticket/ticket.service';

@Component({
  selector: 'app-cms-ticket-states',
  templateUrl: './cms-ticket-states.component.html',
  styleUrls: ['./cms-ticket-states.component.scss']
})
export class CmsTicketStatesComponent extends BaseComponent {

  @Input()
  state = TicketStatus.NotResponsed;

  @Input()
  disabled = false;

  @Input()
  showDropdown = true;

  states = TicketService.States;

  current: any = {};

  otherStates: any[] = [];

  override ngOnInit(): void {
    super.ngOnInit();
    this.current = this.states.find(x => x.id == this.state);
    this.otherStates = this.states.filter(x => x.id != this.state);
  }
}
