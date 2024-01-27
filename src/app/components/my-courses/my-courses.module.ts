import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCoursesRoutingModule } from './my-courses-routing.module';
import { MyCoursesComponent } from './my-courses.component';


@NgModule({
  declarations: [
    MyCoursesComponent
  ],
  imports: [
    CommonModule,
    MyCoursesRoutingModule
  ]
})
export class MyCoursesModule { }
