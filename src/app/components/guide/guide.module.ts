import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuideRoutingModule } from './guide-routing.module';
import { GuideComponent } from './guide.component';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [
    GuideComponent
  ],
  imports: [
    CommonModule,
    GuideRoutingModule,
    BaseLoadingModule,
    PipesModule,
  ]
})
export class GuideModule { }
