import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { TranslateModule } from '@ngx-translate/core';
import { DxTextBoxModule } from 'devextreme-angular';
import { BaseButton } from 'src/app/shared/components/micro/button/button.component';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';
import { FormsModule } from '@angular/forms';


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
    DxTextBoxModule
  ]
})
export class LoginModule { }
