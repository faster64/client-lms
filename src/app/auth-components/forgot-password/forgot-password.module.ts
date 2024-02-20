import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { TranslateModule } from '@ngx-translate/core';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';
import { DxTextBoxModule } from 'devextreme-angular';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';
import { OtpBoxModule } from 'src/app/shared/components/micro/otp-box/otp-box.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';


@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    TranslateModule,
    BaseButtonModule,
    DxTextBoxModule,
    BaseLoadingModule,
    OtpBoxModule,
    PipesModule
  ]
})
export class ForgotPasswordModule { }
