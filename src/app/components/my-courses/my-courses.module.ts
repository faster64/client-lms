import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCoursesRoutingModule } from './my-courses-routing.module';
import { MyCoursesComponent } from './my-courses.component';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';


@NgModule({
  declarations: [
    MyCoursesComponent
  ],
  imports: [
    CommonModule,
    MyCoursesRoutingModule,
    BaseLoadingModule,
    PipesModule
  ]
})
export class MyCoursesModule { }
