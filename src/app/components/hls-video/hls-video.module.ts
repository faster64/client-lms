import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HlsVideoRoutingModule } from './hls-video-routing.module';
import { HlsVideoComponent } from './hls-video.component';


@NgModule({
  declarations: [
    HlsVideoComponent
  ],
  imports: [
    CommonModule,
    HlsVideoRoutingModule
  ],
  exports: [
    HlsVideoComponent
  ]
})
export class HlsVideoModule { }
