import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';
import { CourseModule } from '../course/course.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule,
    CourseModule,
    BaseLoadingModule
  ]
})
export class HomeModule { }
