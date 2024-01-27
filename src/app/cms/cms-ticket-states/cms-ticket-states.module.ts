import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsTicketStatesComponent } from './cms-ticket-states.component';



@NgModule({
  declarations: [
    CmsTicketStatesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CmsTicketStatesComponent]
})
export class CmsTicketStatesModule { }
