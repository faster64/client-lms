import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseLessonLearningRoutingModule } from './course-lesson-learning-routing.module';
import { CourseLessonLearningComponent } from './course-lesson-learning.component';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';


@NgModule({
  declarations: [
    CourseLessonLearningComponent
  ],
  imports: [
    CommonModule,
    CourseLessonLearningRoutingModule,
    BaseLoadingModule,
    PipesModule
  ]
})
export class CourseLessonLearningModule { }
