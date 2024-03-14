import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { Routing } from 'src/app/shared/constants/routing.constant';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: Routing.CONTACT.path,
    component: HomeComponent
  },
  {
    path: 'tim-kiem-khoa-hoc/:q',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
