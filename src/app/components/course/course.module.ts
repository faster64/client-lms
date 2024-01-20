import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    CourseComponent
  ],
  imports: [
    CommonModule,
    BaseButtonModule,
    TranslateModule
  ],
  exports: [CourseComponent]
})
export class CourseModule { }
