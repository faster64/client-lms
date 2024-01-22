import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsSidebarComponent } from './cms-sidebar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CmsSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTooltipModule
  ],
  exports: [CmsSidebarComponent]
})
export class CmsSidebarModule { }
