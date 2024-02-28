import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { HighlightModule } from 'src/app/shared/components/micro/highlight/highlight.module';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';

@NgModule({
  declarations: [
    CourseComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BaseButtonModule,
    TranslateModule,
    PipesModule,
    HighlightModule,
    BaseLoadingModule
  ],
  exports: [CourseComponent]
})
export class CourseModule { }
