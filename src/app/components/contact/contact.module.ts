import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { DxTextAreaModule, DxTextBoxModule } from 'devextreme-angular';
import { TranslateModule } from '@ngx-translate/core';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';
import { SelectorModule } from 'src/app/shared/components/micro/selector/selector.module';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    DxTextBoxModule,
    DxTextAreaModule,
    BaseButtonModule,
    SelectorModule
  ],
  exports: [ContactComponent]
})
export class ContactModule { }
