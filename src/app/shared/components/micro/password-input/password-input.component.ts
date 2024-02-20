import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DxTextBoxComponent } from 'devextreme-angular';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent {

  hidden = true;

  @Input()
  value = '';

  @Input()
  placeholder = '';

  @Input()
  height = 40;

  @Output()
  onEnterKey = new EventEmitter();

  @Output()
  onValueChanged = new EventEmitter();

  @ViewChild("password")
  password: DxTextBoxComponent;
}
