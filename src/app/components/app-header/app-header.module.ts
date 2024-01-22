import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './app-header.component';
import { TranslateModule } from '@ngx-translate/core';
import { AccountBoxModule } from 'src/app/shared/components/element/account-box/account-box.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountBoxModule
  ],
  exports: [AppHeaderComponent]
})
export class AppHeaderModule { }
