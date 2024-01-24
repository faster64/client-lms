import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFooterComponent } from './app-footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';



@NgModule({
  declarations: [
    AppFooterComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    BaseLoadingModule
  ],
  exports: [AppFooterComponent]
})
export class AppFooterModule { }
