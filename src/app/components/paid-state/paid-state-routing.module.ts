import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaidStateComponent } from './paid-state.component';

const routes: Routes = [
  {
    path: '',
    component: PaidStateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaidStateRoutingModule { }
