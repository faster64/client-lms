import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DxTextAreaModule, DxTextBoxModule } from 'devextreme-angular';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';
import { ClassSelectorModule } from 'src/app/shared/components/micro/class-selector/class-selector.module';
import { TicketComponent } from './ticket.component';

@NgModule({
  declarations: [
    TicketComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    DxTextBoxModule,
    DxTextAreaModule,
    BaseButtonModule,
    ClassSelectorModule,
  ],
  exports: [TicketComponent]
})
export class TicketModule { }
