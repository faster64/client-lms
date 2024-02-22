import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerComponent } from './pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    PdfViewerComponent
  ],
  imports: [
    CommonModule,
    PdfViewerModule
  ],
  exports: [PdfViewerComponent]
})
export class PdfViewerCpnModule { }
