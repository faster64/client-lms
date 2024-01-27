import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DxDateBoxModule, DxNumberBoxModule, DxSelectBoxModule, DxTextAreaModule, DxTextBoxModule } from 'devextreme-angular';
import { GridModule } from 'src/app/shared/components/element/grid/grid.module';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';
import { ClassSelectorModule } from 'src/app/shared/components/micro/class-selector/class-selector.module';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';
import { RoleSelectorModule } from 'src/app/shared/components/micro/role-selector/role-selector.module';
import { BaseUploaderModule } from 'src/app/shared/components/micro/uploader/uploader.module';
import { CmsFeatureModule } from '../cms-feature/cms-feature.module';
import { CmsHeaderModule } from '../cms-header/cms-header.module';
import { CmsUserStatesModule } from '../cms-user-states/cms-user-states.module';
import { CmsAdminFormComponent } from './cms-admin/cms-admin-form/cms-admin-form.component';
import { CmsAdminComponent } from './cms-admin/cms-admin.component';
import { CmsBannerComponent } from './cms-banner/cms-banner.component';
import { CmsClassFormComponent } from './cms-class/cms-class-form/cms-class-form.component';
import { CmsClassComponent } from './cms-class/cms-class.component';
import { CmsCourseFormComponent } from './cms-course/cms-course-form/cms-course-form.component';
import { CmsCourseComponent } from './cms-course/cms-course.component';
import { CmsGuideComponent } from './cms-guide/cms-guide.component';
import { CmsLessonComponent } from './cms-lesson/cms-lesson.component';
import { CmsOrderComponent } from './cms-order/cms-order.component';
import { CmsPageRoutingModule } from './cms-page-routing.module';
import { CmsReportComponent } from './cms-report/cms-report.component';
import { CmsSocialComponent } from './cms-social/cms-social.component';
import { CmsTicketComponent } from './cms-ticket/cms-ticket.component';
import { CmsUserFormComponent } from './cms-user/cms-user-form/cms-user-form.component';
import { CmsUserComponent } from './cms-user/cms-user.component';
import { CmsTicketFormComponent } from './cms-ticket/cms-ticket-form/cms-ticket-form.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    CmsBannerComponent,
    CmsCourseComponent,
    CmsTicketComponent,
    CmsUserComponent,
    CmsAdminComponent,
    CmsClassComponent,
    CmsLessonComponent,
    CmsSocialComponent,
    CmsOrderComponent,
    CmsGuideComponent,
    CmsReportComponent,
    CmsClassFormComponent,
    CmsCourseFormComponent,
    CmsUserFormComponent,
    CmsAdminFormComponent,
    CmsTicketFormComponent
  ],
  imports: [
    CommonModule,
    CmsPageRoutingModule,
    FormsModule,
    TranslateModule,
    CmsHeaderModule,
    CmsFeatureModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    BaseButtonModule,
    BaseLoadingModule,
    BaseUploaderModule,
    GridModule,
    ClassSelectorModule,
    RoleSelectorModule,
    BaseUploaderModule,
    EditorModule,
    CmsUserStatesModule,
    PipesModule,
    MatTooltipModule
  ]
})
export class CmsPageModule { }
