import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsSidebarComponent } from './cms-sidebar.component';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    CmsSidebarComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule
  ],
  exports: [CmsSidebarComponent]
})
export class CmsSidebarModule { }
