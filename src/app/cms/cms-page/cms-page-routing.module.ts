import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormModeText } from 'src/app/shared/constants/form-mode.constant';
import { FormMode } from 'src/app/shared/enums/form-mode.enum';
import { CmsAdminFormComponent } from './cms-admin/cms-admin-form/cms-admin-form.component';
import { CmsAdminComponent } from './cms-admin/cms-admin.component';
import { CmsBannerComponent } from './cms-banner/cms-banner.component';
import { CmsClassFormComponent } from './cms-class/cms-class-form/cms-class-form.component';
import { CmsClassComponent } from './cms-class/cms-class.component';
import { CmsCourseFormComponent } from './cms-course/cms-course-form/cms-course-form.component';
import { CmsCourseComponent } from './cms-course/cms-course.component';
import { CmsGuideComponent } from './cms-guide/cms-guide.component';
import { CmsLessonFormComponent } from './cms-lesson/cms-lesson-form/cms-lesson-form.component';
import { CmsLessonComponent } from './cms-lesson/cms-lesson.component';
import { CmsOrderViewComponent } from './cms-order/cms-order-view/cms-order-view.component';
import { CmsOrderComponent } from './cms-order/cms-order.component';
import { CmsSocialComponent } from './cms-social/cms-social.component';
import { CmsTicketFormComponent } from './cms-ticket/cms-ticket-form/cms-ticket-form.component';
import { CmsTicketComponent } from './cms-ticket/cms-ticket.component';
import { CmsUserFormComponent } from './cms-user/cms-user-form/cms-user-form.component';
import { CmsUserComponent } from './cms-user/cms-user.component';
import { StudentGridReportComponent } from './cms-report/student-grid-report/student-grid-report.component';
import { StudentGridByLessonReportComponent } from './cms-report/student-grid-by-lesson-report/student-grid-by-lesson-report.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'banner',
    pathMatch: 'full'
  },

  //#region  Banner
  {
    path: 'banner',
    component: CmsBannerComponent
  },
  //#endregion

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

  //#region  Lesson
  {
    path: 'bai-giang',
    component: CmsLessonComponent
  },
  {
    path: `bai-giang/${FormModeText.ADD}`,
    component: CmsLessonFormComponent,
    data: {
      formMode: FormMode.Add
    }
  },
  {
    path: `bai-giang/${FormModeText.UPDATE}/:id`,
    component: CmsLessonFormComponent,
    data: {
      formMode: FormMode.Update
    }
  },
  {
    path: `bai-giang/${FormModeText.VIEW}/:id`,
    component: CmsLessonFormComponent,
    data: {
      formMode: FormMode.View
    }
  },
  //#endregion

  //#region  Social
  {
    path: 'mang-xa-hoi',
    component: CmsSocialComponent
  },
  //#endregion

  //#region  Order
  {
    path: 'don-mua-hang',
    component: CmsOrderComponent
  },
  {
    path: `don-mua-hang/${FormModeText.VIEW}/:id`,
    component: CmsOrderViewComponent,
    data: {
      formMode: FormMode.View
    }
  },
  //#endregion

  //#region  Guide
  {
    path: 'huong-dan-su-dung',
    component: CmsGuideComponent
  },
  //#endregion

  {
    path: 'bao-cao-thong-ke',
    component: StudentGridReportComponent
  },
  {
    path: 'bao-cao-thong-ke-theo-bai-hoc',
    component: StudentGridByLessonReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsPageRoutingModule { }
