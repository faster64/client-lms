import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HlsVideoComponent } from './hls-video.component';

const routes: Routes = [
  {
    path: '',
    component: HlsVideoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HlsVideoRoutingModule { }
