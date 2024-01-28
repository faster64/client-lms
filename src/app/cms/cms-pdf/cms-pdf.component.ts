import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cms-pdf',
  templateUrl: './cms-pdf.component.html',
  styleUrls: ['./cms-pdf.component.scss']
})
export class CmsPdfComponent {

  @Input()
  name = '';

  @Input()
  url = '';

  @Input()
  readOnly = false;

  @Output()
  remove = new EventEmitter();

  removeAttachment(event) {
    event.stopPropagation();
    event.preventDefault();

    this.name = '';
    this.remove.emit(event);
  }

  openPdf() {
    window.open(this.url, '_blank');
  }
}
