import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotConnectedRoutingModule } from './not-connected-routing.module';
import { NotConnectedComponent } from './not-connected.component';


@NgModule({
  declarations: [
    NotConnectedComponent
  ],
  imports: [
    CommonModule,
    NotConnectedRoutingModule
  ]
})
export class NotConnectedModule { }
