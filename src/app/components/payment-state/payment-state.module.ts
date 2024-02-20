import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentStateRoutingModule } from './payment-state-routing.module';
import { PaymentStateComponent } from './payment-state.component';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';


@NgModule({
  declarations: [
    PaymentStateComponent
  ],
  imports: [
    CommonModule,
    PaymentStateRoutingModule,
    BaseLoadingModule
  ]
})
export class PaymentStateModule { }
