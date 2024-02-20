import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentStateComponent } from './payment-state.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentStateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentStateRoutingModule { }
