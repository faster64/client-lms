import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseLessonTestRoutingModule } from './course-lesson-test-routing.module';
import { CourseLessonTestComponent } from './course-lesson-test.component';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';
import { DxCheckBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';


@NgModule({
  declarations: [
    CourseLessonTestComponent
  ],
  imports: [
    CommonModule,
    CourseLessonTestRoutingModule,
    BaseLoadingModule,
    BaseButtonModule,
    DxCheckBoxModule,
    DxTextBoxModule
  ]
})
export class CourseLessonTestModule { }
