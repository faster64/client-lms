import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxFileUploaderModule, DxProgressBarModule } from 'devextreme-angular';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { BaseUploaderComponent } from './uploader.component';
import { BaseButtonModule } from '../button/button.module';
import { TranslateModule } from '@ngx-translate/core';
import { BaseLoadingModule } from '../loading/loading.module';

@NgModule({
  declarations: [BaseUploaderComponent],
  imports: [
    CommonModule,
    DxFileUploaderModule,
    DxProgressBarModule,
    NgxDropzoneModule,
    BaseButtonModule,
    TranslateModule,
    BaseLoadingModule
  ],
  exports: [BaseUploaderComponent]
})
export class BaseUploaderModule { }
