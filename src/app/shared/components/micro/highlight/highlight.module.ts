import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightComponent } from './highlight.component';

@NgModule({
  declarations: [
    HighlightComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [HighlightComponent]
})
export class HighlightModule { }
