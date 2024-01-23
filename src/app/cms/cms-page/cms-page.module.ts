import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { DxDateBoxModule, DxNumberBoxModule, DxTextAreaModule, DxTextBoxModule } from 'devextreme-angular';
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
import { CmsClassFormComponent } from './cms-class/cms-class-form/cms-class-form.component';
import { CmsFeatureModule } from '../cms-feature/cms-feature.module';
import { CmsCourseFormComponent } from './cms-course/cms-course-form/cms-course-form.component';
import { ClassSelectorModule } from 'src/app/shared/components/micro/class-selector/class-selector.module';


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
    CmsReportComponent,
    CmsClassFormComponent,
    CmsCourseFormComponent
  ],
  imports: [
    CommonModule,
    CmsPageRoutingModule,
    TranslateModule,
    CmsHeaderModule,
    CmsFeatureModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    BaseButtonModule,
    BaseLoadingModule,
    BaseUploaderModule,
    GridModule,
    ClassSelectorModule,
    BaseUploaderModule
  ]
})
export class CmsPageModule { }
