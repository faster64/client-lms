import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from './password-input.component';
import { DxTextBoxModule } from 'devextreme-angular';



@NgModule({
  declarations: [
    PasswordInputComponent
  ],
  imports: [
    CommonModule,
    DxTextBoxModule
  ],
  exports: [PasswordInputComponent]
})
export class PasswordInputModule { }
