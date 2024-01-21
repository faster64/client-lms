import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsBannerComponent } from './cms-banner/cms-banner.component';
import { CmsCourseComponent } from './cms-course/cms-course.component';
import { CmsContactComponent } from './cms-contact/cms-contact.component';
import { CmsUserComponent } from './cms-user/cms-user.component';
import { CmsAdminComponent } from './cms-admin/cms-admin.component';
import { CmsClassComponent } from './cms-class/cms-class.component';
import { CmsLessonComponent } from './cms-lesson/cms-lesson.component';
import { CmsSocialComponent } from './cms-social/cms-social.component';
import { CmsOrderComponent } from './cms-order/cms-order.component';
import { CmsGuideComponent } from './cms-guide/cms-guide.component';
import { CmsReportComponent } from './cms-report/cms-report.component';

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
  {
    path: 'khoa-hoc',
    component: CmsCourseComponent
  },
  {
    path: 'lien-he',
    component: CmsContactComponent
  },
  {
    path: 'quan-ly-tai-khoan-nguoi-dung',
    component: CmsUserComponent
  },
  {
    path: 'quan-ly-tai-khoan-quan-tri',
    component: CmsAdminComponent
  },
  {
    path: 'lop-hoc',
    component: CmsClassComponent
  },
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
