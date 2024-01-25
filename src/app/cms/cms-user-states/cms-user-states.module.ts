import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsUserStatesComponent } from './cms-user-states.component';



@NgModule({
  declarations: [
    CmsUserStatesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CmsUserStatesComponent]
})
export class CmsUserStatesModule { }
