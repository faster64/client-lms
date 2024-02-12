import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {

  @Input()
  valueContent = '';

  @Input()
  height = 400;

  @Input()
  disable = false;

  @Output()
  change = new EventEmitter();

  constructor() {
  }


  onValueChanged(event) {
    this.change.emit(event.value);
  }
}
