import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseGuard } from './shared/guards/base.guard';
import { BaseResolver } from './shared/resolvers/base.resolver';
import { Routing } from './shared/constants/routing.constant';
import { UnauthenticatedOnlyGuard } from './shared/guards/unauthenticated-only.guard';
import { CmsGuard } from './shared/guards/cms.guard';
import { BannerComponent } from './components/banner/banner.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: `/${Routing.HOME.path}`,
    pathMatch: 'full'
  },
  {
    path: Routing.LOGIN.path,
    loadChildren: () => import('./auth-components/login/login.module').then(m => m.LoginModule),
    canActivate: [
      UnauthenticatedOnlyGuard
    ],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.REGISTER.path,
    loadChildren: () => import('./auth-components/register/register.module').then(m => m.RegisterModule),
    canActivate: [
      UnauthenticatedOnlyGuard
    ],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.FORGOT_PASSWORD.path,
    loadChildren: () => import('./auth-components/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    canActivate: [
      UnauthenticatedOnlyGuard
    ],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.CMS.path,
    loadChildren: () => import('./cms/cms-page/cms-page.module').then(m => m.CmsPageModule),
    canActivate: [CmsGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.HOME.path,
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.GUIDE.path,
    loadChildren: () => import('./components/guide/guide.module').then(m => m.GuideModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.CONTACT.path,
    loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.MY_COURES.path,
    loadChildren: () => import('./components/my-courses/my-courses.module').then(m => m.MyCoursesModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: Routing.COURSE_DETAIL.path,
    loadChildren: () => import('./components/course-detail/course-detail.module').then(m => m.CourseDetailModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  {
    path: "**",
    redirectTo: `/${Routing.HOME.path}`,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
