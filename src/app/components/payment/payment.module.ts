import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';


@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    TranslateModule,
    PipesModule,
    BaseLoadingModule,
    BaseButtonModule
  ]
})
export class PaymentModule { }
