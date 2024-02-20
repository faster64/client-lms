import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DxTextBoxModule } from 'devextreme-angular';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { PasswordInputModule } from 'src/app/shared/components/micro/password-input/password-input.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    TranslateModule,
    BaseButtonModule,
    DxTextBoxModule,
    PasswordInputModule
  ]
})
export class LoginModule { }
