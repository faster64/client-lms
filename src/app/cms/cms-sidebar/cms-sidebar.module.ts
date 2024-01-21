import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsSidebarComponent } from './cms-sidebar.component';



@NgModule({
  declarations: [
    CmsSidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CmsSidebarComponent]
})
export class CmsSidebarModule { }
