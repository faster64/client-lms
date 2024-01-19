import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorComponent } from './selector.component';
import { DxSelectBoxModule } from 'devextreme-angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    SelectorComponent
  ],
  imports: [
    CommonModule,
    DxSelectBoxModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [SelectorComponent]
})
export class SelectorModule { }
