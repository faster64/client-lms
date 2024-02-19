import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaidStateRoutingModule } from './paid-state-routing.module';
import { PaidStateComponent } from './paid-state.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';


@NgModule({
  declarations: [
    PaidStateComponent
  ],
  imports: [
    CommonModule,
    PaidStateRoutingModule,
    PipesModule
  ],
  exports: [PaidStateComponent]
})
export class PaidStateModule { }
