import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsFeatureComponent } from './cms-feature.component';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    CmsFeatureComponent
  ],
  imports: [
    CommonModule,
    BaseButtonModule,
    TranslateModule
  ],
  exports: [CmsFeatureComponent]
})
export class CmsFeatureModule { }
