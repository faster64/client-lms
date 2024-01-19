import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from './shared/constants/routing.constant';
import { BaseGuard } from './shared/guards/base.guard';
import { SignInUpGuard } from './shared/guards/sign-in-up.guard';
import { AnonymousResolver } from './shared/resolvers/anonymous.resolver';
import { BaseResolver } from './shared/resolvers/base.resolver';
import { RequiredTimeOptionsResolver } from './shared/resolvers/required-time-options.resolver';
const routes: Routes = [
  {
    path: '',
    redirectTo: `/${Routing.SIGN_IN.path}`,
    pathMatch: 'full'
  },
  {
    path: Routing.NOT_FOUND.path,
    loadChildren: () => import('./shared/components/element/not-found/not-found.module').then(m => m.NotFoundModule),
    runGuardsAndResolvers: 'always',
  },
  // {
  //   path: Routing.ACCESS_DENIED.path,
  //   loadChildren: () => import('./shared/components/element/access-denied/access-denied.module').then(m => m.AccessDeniedModule),
  // },
  {
    path: Routing.NOT_CONNECTED.path,
    loadChildren: () => import('./shared/components/element/not-connected/not-connected.module').then(m => m.NotConnectedModule),
  },
  {
    path: Routing.SIGN_IN.path,
    loadChildren: () => import('./auth-components/sign-in/sign-in.module').then(m => m.SignInModule),
    canActivate: [
      SignInUpGuard
    ],
    resolve: {
      resolver: AnonymousResolver,
    }
  },
  // {
  //   path: Routing.SIGN_UP.path,
  //   loadChildren: () => import('./auth-components/sign-up/sign-up.module').then(m => m.SignUpModule),
  // canActivate: [
  //   SignInUpGuard
  // ],
  //   data: {
  //     key: Routing.SIGN_UP.key,
  //   }
  // },
  {
    path: Routing.SESSION_LOG.path,
    loadChildren: () => import('./components/session-trace-log/session-trace-log.module').then(m => m.SessionTraceLogModule),
    resolve: {
      resolver: AnonymousResolver,
    }
  },
  {
    path: Routing.DASHBOARD.path,
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: RequiredTimeOptionsResolver,
    }
  },
  {
    path: 'icon',
    loadChildren: () => import('./components/icon/icon.module').then(m => m.IconModule),
    resolve: {
      resolver: AnonymousResolver
    }
  },
  {
    path: "**",
    redirectTo: `/${Routing.NOT_FOUND.path}`,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
