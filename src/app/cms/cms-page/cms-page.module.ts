import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { DxNumberBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';
import { BaseUploaderModule } from 'src/app/shared/components/micro/uploader/uploader.module';
import { CmsHeaderModule } from '../cms-header/cms-header.module';
import { CmsAdminComponent } from './cms-admin/cms-admin.component';
import { CmsBannerComponent } from './cms-banner/cms-banner.component';
import { CmsClassComponent } from './cms-class/cms-class.component';
import { CmsContactComponent } from './cms-contact/cms-contact.component';
import { CmsCourseComponent } from './cms-course/cms-course.component';
import { CmsGuideComponent } from './cms-guide/cms-guide.component';
import { CmsLessonComponent } from './cms-lesson/cms-lesson.component';
import { CmsOrderComponent } from './cms-order/cms-order.component';
import { CmsPageRoutingModule } from './cms-page-routing.module';
import { CmsReportComponent } from './cms-report/cms-report.component';
import { CmsSocialComponent } from './cms-social/cms-social.component';
import { CmsUserComponent } from './cms-user/cms-user.component';
import { GridModule } from 'src/app/shared/components/element/grid/grid.module';


@NgModule({
  declarations: [
    CmsBannerComponent,
    CmsCourseComponent,
    CmsContactComponent,
    CmsUserComponent,
    CmsAdminComponent,
    CmsClassComponent,
    CmsLessonComponent,
    CmsSocialComponent,
    CmsOrderComponent,
    CmsGuideComponent,
    CmsReportComponent
  ],
  imports: [
    CommonModule,
    CmsPageRoutingModule,
    TranslateModule,
    CmsHeaderModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    BaseButtonModule,
    BaseLoadingModule,
    BaseUploaderModule,
    GridModule
  ]
})
export class CmsPageModule { }
