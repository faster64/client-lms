import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsBillStatesComponent } from './cms-bill-states.component';



@NgModule({
  declarations: [
    CmsBillStatesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CmsBillStatesComponent]
})
export class CmsBillStatesModule { }
