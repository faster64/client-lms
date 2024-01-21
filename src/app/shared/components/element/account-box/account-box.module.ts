import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountBoxComponent } from './account-box.component';
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TranslateModule } from "@ngx-translate/core";
import { BaseLoadingModule } from '../../micro/loading/loading.module';
import { BaseButtonModule } from '../../micro/button/button.module';

@NgModule({
  declarations: [
    AccountBoxComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatTooltipModule,
    TranslateModule,
    BaseLoadingModule,
    BaseButtonModule
  ],
  exports: [AccountBoxComponent]
})
export class AccountBoxModule { }
