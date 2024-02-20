import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpBoxComponent } from './otp-box.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { BaseButtonModule } from '../button/button.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [
    OtpBoxComponent
  ],
  imports: [
    CommonModule,
    NgOtpInputModule,
    BaseButtonModule,
    PipesModule
  ],
  exports: [OtpBoxComponent]
})
export class OtpBoxModule { }
