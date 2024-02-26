import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseLessonTestRoutingModule } from './course-lesson-test-routing.module';
import { CourseLessonTestComponent } from './course-lesson-test.component';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';
import { DxCheckBoxModule, DxRadioGroupModule, DxTextBoxModule } from 'devextreme-angular';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CourseLessonTestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CourseLessonTestRoutingModule,
    BaseLoadingModule,
    BaseButtonModule,
    DxCheckBoxModule,
    DxRadioGroupModule,
    DxTextBoxModule
  ]
})
export class CourseLessonTestModule { }
