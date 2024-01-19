import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './app-header.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    AppHeaderComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [AppHeaderComponent]
})
export class AppHeaderModule { }
