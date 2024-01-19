import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: `/${Routing.SIGN_IN.path}`,
  //   pathMatch: 'full'
  // },
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
