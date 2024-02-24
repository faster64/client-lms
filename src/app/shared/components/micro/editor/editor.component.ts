import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DxHtmlEditorComponent } from 'devextreme-angular';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {

  @Input()
  valueContent = '';

  @Input()
  placeholder = '';

  @Input()
  height = 400;

  @Input()
  readonly = false;

  @Input()
  disable = false;

  @Output()
  change = new EventEmitter();

  @ViewChild("editor")
  editor: DxHtmlEditorComponent;

  onValueChanged(event) {
    this.change.emit(event.value);
  }
}
