import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DxTextAreaModule, DxTextBoxModule } from 'devextreme-angular';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';
import { ClassSelectorModule } from 'src/app/shared/components/micro/class-selector/class-selector.module';
import { ContactComponent } from './contact.component';

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
    ClassSelectorModule
  ],
  exports: [ContactComponent]
})
export class ContactModule { }
