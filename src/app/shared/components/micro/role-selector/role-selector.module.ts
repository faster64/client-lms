import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleSelectorComponent } from './role-selector.component';
import { SelectorModule } from '../selector/selector.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    RoleSelectorComponent
  ],
  imports: [
    CommonModule,
    SelectorModule,
    TranslateModule
  ],
  exports: [RoleSelectorComponent]
})
export class RoleSelectorModule { }
