import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseLessonCongratulationComponent } from './course-lesson-congratulation.component';

const routes: Routes = [
  {
    path: ':courseId/:lessonId',
    component: CourseLessonCongratulationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseLessonCongratulationRoutingModule { }
