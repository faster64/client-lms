import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsOrderStatesComponent } from './cms-order-states.component';



@NgModule({
  declarations: [
    CmsOrderStatesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CmsOrderStatesComponent]
})
export class CmsOrderStatesModule { }
