import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassSelectorComponent } from './class-selector.component';
import { SelectorModule } from '../selector/selector.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    ClassSelectorComponent
  ],
  imports: [
    CommonModule,
    SelectorModule,
    TranslateModule
  ],
  exports: [ClassSelectorComponent]
})
export class ClassSelectorModule { }
