import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonLoading } from './skeleton-loading/skeleton-loading.component';
import { LoadingComponent } from './loading/loading.component';
import { ProgessSpinnerLoadingComponent } from './progess-spinner-loading/progess-spinner-loading.component';
import { OpenLoadingComponent } from './open-loading/open-loading.component';
import { TextLoadingComponent } from './text-loading/text-loading.component';

@NgModule({
  declarations: [LoadingComponent, SkeletonLoading, ProgessSpinnerLoadingComponent, OpenLoadingComponent, TextLoadingComponent],
  imports: [
    CommonModule,
  ],
  exports: [LoadingComponent, SkeletonLoading, ProgessSpinnerLoadingComponent, OpenLoadingComponent, TextLoadingComponent],
})
export class BaseLoadingModule { }
