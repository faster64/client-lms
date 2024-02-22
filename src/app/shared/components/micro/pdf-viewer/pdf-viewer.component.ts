import { Component, Input } from '@angular/core';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent {

  totalPages = 0;

  @Input()
  src = '';

  afterLoadComplete(pdf: PDFDocumentProxy) { this.totalPages = pdf.numPages; }


}
