import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';
import { DxTextBoxModule } from 'devextreme-angular';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';
import { TranslateModule } from '@ngx-translate/core';
import { PasswordInputModule } from 'src/app/shared/components/micro/password-input/password-input.module';


@NgModule({
  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    TranslateModule,
    BaseButtonModule,
    DxTextBoxModule,
    BaseLoadingModule,
    PipesModule,
    PasswordInputModule
  ]
})
export class ChangePasswordModule { }
