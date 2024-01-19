import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseGuard } from './shared/guards/base.guard';
import { BaseResolver } from './shared/resolvers/base.resolver';
import { Routing } from './shared/constants/routing.constant';

const routes: Routes = [
  {
    path: '',
    redirectTo: `/${Routing.HOME.path}`,
    pathMatch: 'full'
  },
  {
    path: Routing.HOME.path,
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    }
  },
  // {
  //   path: "**",
  //   redirectTo: `/${Routing.NOT_FOUND.path}`,
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
