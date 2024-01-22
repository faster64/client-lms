import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { DxNumberBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';
import { ClassSelectorModule } from 'src/app/shared/components/micro/class-selector/class-selector.module';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    TranslateModule,
    BaseButtonModule,
    ClassSelectorModule,
    DxTextBoxModule,
    DxNumberBoxModule
  ]
})
export class RegisterModule { }
