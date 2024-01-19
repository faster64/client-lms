import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotConnectedComponent } from './not-connected.component';

const routes: Routes = [
  {
    path: '',
    component: NotConnectedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotConnectedRoutingModule { }
