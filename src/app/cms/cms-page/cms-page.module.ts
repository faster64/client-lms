import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { DxCheckBoxModule, DxDateBoxModule, DxNumberBoxModule, DxSelectBoxModule, DxTextAreaModule, DxTextBoxModule } from 'devextreme-angular';
import { GridModule } from 'src/app/shared/components/element/grid/grid.module';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';
import { ClassSelectorModule } from 'src/app/shared/components/micro/class-selector/class-selector.module';
import { EditorModule } from 'src/app/shared/components/micro/editor/editor.module';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';
import { RoleSelectorModule } from 'src/app/shared/components/micro/role-selector/role-selector.module';
import { SelectorModule } from 'src/app/shared/components/micro/selector/selector.module';
import { BaseUploaderModule } from 'src/app/shared/components/micro/uploader/uploader.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { CmsFeatureModule } from '../cms-feature/cms-feature.module';
import { CmsHeaderModule } from '../cms-header/cms-header.module';
import { CmsOrderStatesModule } from '../cms-order-states/cms-order-states.module';
import { CmsPdfModule } from '../cms-pdf/cms-pdf.module';
import { CmsUploadCourseImageModule } from '../cms-upload-course-image/cms-upload-course-image.module';
import { CmsUserStatesModule } from '../cms-user-states/cms-user-states.module';
import { CmsAdminFormComponent } from './cms-admin/cms-admin-form/cms-admin-form.component';
import { CmsAdminComponent } from './cms-admin/cms-admin.component';
import { CmsBannerComponent } from './cms-banner/cms-banner.component';
import { CmsOrderViewComponent } from './cms-order/cms-order-view/cms-order-view.component';
import { CmsOrderComponent } from './cms-order/cms-order.component';
import { CmsClassFormComponent } from './cms-class/cms-class-form/cms-class-form.component';
import { CmsClassComponent } from './cms-class/cms-class.component';
import { CmsCourseFormComponent } from './cms-course/cms-course-form/cms-course-form.component';
import { CmsCourseComponent } from './cms-course/cms-course.component';
import { CmsGuideComponent } from './cms-guide/cms-guide.component';
import { CmsLessonFormComponent } from './cms-lesson/cms-lesson-form/cms-lesson-form.component';
import { CmsLessonComponent } from './cms-lesson/cms-lesson.component';
import { CmsPageRoutingModule } from './cms-page-routing.module';
import { CmsReportComponent } from './cms-report/cms-report.component';
import { CmsSocialComponent } from './cms-social/cms-social.component';
import { CmsTicketFormComponent } from './cms-ticket/cms-ticket-form/cms-ticket-form.component';
import { CmsTicketComponent } from './cms-ticket/cms-ticket.component';
import { CmsUserFormComponent } from './cms-user/cms-user-form/cms-user-form.component';
import { CmsUserComponent } from './cms-user/cms-user.component';


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
    CmsTicketFormComponent,
    CmsLessonFormComponent,
    CmsOrderViewComponent
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
    DxCheckBoxModule,
    BaseButtonModule,
    BaseLoadingModule,
    BaseUploaderModule,
    GridModule,
    ClassSelectorModule,
    RoleSelectorModule,
    SelectorModule,
    BaseUploaderModule,
    EditorModule,
    CmsUserStatesModule,
    CmsOrderStatesModule,
    CmsUploadCourseImageModule,
    CmsPdfModule,
    PipesModule,
    MatTooltipModule,
    EditorModule
  ]
})
export class CmsPageModule { }
