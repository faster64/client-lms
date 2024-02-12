import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseLessonTestComponent } from './course-lesson-test.component';

const routes: Routes = [
  {
    path: ':courseId/:lessonId',
    component: CourseLessonTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseLessonTestRoutingModule { }
