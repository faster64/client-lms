import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { TranslateModule } from '@ngx-translate/core';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';
import { DxNumberBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { SelectorModule } from 'src/app/shared/components/micro/selector/selector.module';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    TranslateModule,
    BaseButtonModule,
    SelectorModule,
    DxTextBoxModule,
    DxNumberBoxModule
  ]
})
export class RegisterModule { }
