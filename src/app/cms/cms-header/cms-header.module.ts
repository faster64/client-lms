import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsHeaderComponent } from './cms-header.component';
import { AccountBoxModule } from 'src/app/shared/components/element/account-box/account-box.module';



@NgModule({
  declarations: [
    CmsHeaderComponent,
  ],
  imports: [
    CommonModule,
    AccountBoxModule
  ],
  exports: [CmsHeaderComponent]
})
export class CmsHeaderModule { }
