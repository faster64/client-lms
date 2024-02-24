import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseLessonListComponent } from './course-lesson-list.component';

const routes: Routes = [
  {
    path: ':courseId',
    component: CourseLessonListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseLessonRoutingModule { }
