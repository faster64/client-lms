import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFooterComponent } from './app-footer.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    AppFooterComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [AppFooterComponent]
})
export class AppFooterModule { }
