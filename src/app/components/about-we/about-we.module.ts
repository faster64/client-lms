import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutWeComponent } from './about-we.component';



@NgModule({
  declarations: [
    AboutWeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [AboutWeComponent]
})
export class AboutWeModule { }
