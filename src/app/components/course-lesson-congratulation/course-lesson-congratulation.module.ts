import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseLessonCongratulationRoutingModule } from './course-lesson-congratulation-routing.module';
import { CourseLessonCongratulationComponent } from './course-lesson-congratulation.component';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';


@NgModule({
  declarations: [
    CourseLessonCongratulationComponent
  ],
  imports: [
    CommonModule,
    CourseLessonCongratulationRoutingModule,
    BaseLoadingModule,
    BaseButtonModule
  ]
})
export class CourseLessonCongratulationModule { }
