import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSelectBoxModule } from 'devextreme-angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { BaseComboboxComponent } from './base-combobox.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [BaseComboboxComponent],
  imports: [
    CommonModule,
    DxSelectBoxModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [BaseComboboxComponent]
})
export class BaseComboboxModule { }
