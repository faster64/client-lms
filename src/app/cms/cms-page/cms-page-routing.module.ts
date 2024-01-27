import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsBannerComponent } from './cms-banner/cms-banner.component';
import { CmsCourseComponent } from './cms-course/cms-course.component';
import { CmsUserComponent } from './cms-user/cms-user.component';
import { CmsAdminComponent } from './cms-admin/cms-admin.component';
import { CmsClassComponent } from './cms-class/cms-class.component';
import { CmsLessonComponent } from './cms-lesson/cms-lesson.component';
import { CmsSocialComponent } from './cms-social/cms-social.component';
import { CmsOrderComponent } from './cms-order/cms-order.component';
import { CmsGuideComponent } from './cms-guide/cms-guide.component';
import { CmsReportComponent } from './cms-report/cms-report.component';
import { FormModeText } from 'src/app/shared/constants/form-mode.constant';
import { CmsClassFormComponent } from './cms-class/cms-class-form/cms-class-form.component';
import { FormMode } from 'src/app/shared/enums/form-mode.enum';
import { CmsCourseFormComponent } from './cms-course/cms-course-form/cms-course-form.component';
import { CmsUserFormComponent } from './cms-user/cms-user-form/cms-user-form.component';
import { CmsAdminFormComponent } from './cms-admin/cms-admin-form/cms-admin-form.component';
import { CmsTicketComponent } from './cms-ticket/cms-ticket.component';
import { CmsTicketFormComponent } from './cms-ticket/cms-ticket-form/cms-ticket-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'banner',
    pathMatch: 'full'
  },
  {
    path: 'banner',
    component: CmsBannerComponent
  },

  //#region  Course
  {
    path: 'khoa-hoc',
    component: CmsCourseComponent
  },
  {
    path: `khoa-hoc/${FormModeText.ADD}`,
    component: CmsCourseFormComponent,
    data: {
      formMode: FormMode.Add
    }
  },
  {
    path: `khoa-hoc/${FormModeText.UPDATE}/:id`,
    component: CmsCourseFormComponent,
    data: {
      formMode: FormMode.Update
    }
  },
  {
    path: `khoa-hoc/${FormModeText.VIEW}/:id`,
    component: CmsCourseFormComponent,
    data: {
      formMode: FormMode.View
    }
  },
  //#endregion

  //#region  Ticket
  {
    path: 'lien-he',
    component: CmsTicketComponent
  },
  {
    path: `lien-he/${FormModeText.VIEW}/:id`,
    component: CmsTicketFormComponent,
    data: {
      formMode: FormMode.View
    }
  },
  //#endregion ticket

  //#region User
  {
    path: 'quan-ly-tai-khoan-nguoi-dung',
    component: CmsUserComponent
  },
  {
    path: `quan-ly-tai-khoan-nguoi-dung/${FormModeText.ADD}`,
    component: CmsUserFormComponent,
    data: {
      formMode: FormMode.Add
    }
  },
  {
    path: `quan-ly-tai-khoan-nguoi-dung/${FormModeText.UPDATE}/:id`,
    component: CmsUserFormComponent,
    data: {
      formMode: FormMode.Update
    }
  },
  {
    path: `quan-ly-tai-khoan-nguoi-dung/${FormModeText.VIEW}/:id`,
    component: CmsUserFormComponent,
    data: {
      formMode: FormMode.View
    }
  },
  //#endregion

  //#region  Admin
  {
    path: 'quan-ly-tai-khoan-quan-tri',
    component: CmsAdminComponent
  },
  {
    path: `quan-ly-tai-khoan-quan-tri/${FormModeText.ADD}`,
    component: CmsAdminFormComponent,
    data: {
      formMode: FormMode.Add
    }
  },
  {
    path: `quan-ly-tai-khoan-quan-tri/${FormModeText.UPDATE}/:id`,
    component: CmsAdminFormComponent,
    data: {
      formMode: FormMode.Update
    }
  },
  {
    path: `quan-ly-tai-khoan-quan-tri/${FormModeText.VIEW}/:id`,
    component: CmsAdminFormComponent,
    data: {
      formMode: FormMode.View
    }
  },
  //#endregion

  //#region  Class
  {
    path: 'lop-hoc',
    component: CmsClassComponent
  },
  {
    path: `lop-hoc/${FormModeText.ADD}`,
    component: CmsClassFormComponent,
    data: {
      formMode: FormMode.Add
    }
  },
  {
    path: `lop-hoc/${FormModeText.UPDATE}/:id`,
    component: CmsClassFormComponent,
    data: {
      formMode: FormMode.Update
    }
  },
  {
    path: `lop-hoc/${FormModeText.VIEW}/:id`,
    component: CmsClassFormComponent,
    data: {
      formMode: FormMode.View
    }
  },
  //#endregion

  {
    path: 'bai-giang',
    component: CmsLessonComponent
  },
  {
    path: 'mang-xa-hoi',
    component: CmsSocialComponent
  },
  {
    path: 'don-mua-hang',
    component: CmsOrderComponent
  },
  {
    path: 'huong-dan-su-dung',
    component: CmsGuideComponent
  },
  {
    path: 'bao-cao-thong-ke',
    component: CmsReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsPageRoutingModule { }
