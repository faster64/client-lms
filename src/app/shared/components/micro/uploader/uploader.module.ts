import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DxFileUploaderModule, DxProgressBarModule } from 'devextreme-angular';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { BaseButtonModule } from '../button/button.module';
import { BaseLoadingModule } from '../loading/loading.module';
import { BaseUploaderComponent } from './uploader.component';

@NgModule({
  declarations: [BaseUploaderComponent],
  imports: [
    CommonModule,
    DxFileUploaderModule,
    DxProgressBarModule,
    TranslateModule,
    NgxDropzoneModule,
    BaseButtonModule,
    BaseLoadingModule
  ],
  exports: [BaseUploaderComponent]
})
export class BaseUploaderModule { }
