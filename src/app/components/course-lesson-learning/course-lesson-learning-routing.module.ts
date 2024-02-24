import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseLessonLearningComponent } from './course-lesson-learning.component';

const routes: Routes = [
  {
    path: ':courseId/:lessonId',
    component: CourseLessonLearningComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseLessonLearningRoutingModule { }
