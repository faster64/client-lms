import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDetailRoutingModule } from './course-detail-routing.module';
import { CourseDetailComponent } from './course-detail.component';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';
import { TranslateModule } from '@ngx-translate/core';
import { EditorModule } from 'src/app/shared/components/micro/editor/editor.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    CourseDetailRoutingModule,
    EditorModule,
    BaseLoadingModule,
    BaseButtonModule,
    TranslateModule,
    PipesModule
  ]
})
export class CourseDetailModule { }
