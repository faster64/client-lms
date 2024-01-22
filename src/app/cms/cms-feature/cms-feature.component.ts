import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BaseButton } from 'src/app/shared/components/micro/button/button.component';
import { FormMode } from 'src/app/shared/enums/form-mode.enum';

@Component({
  selector: 'app-cms-feature',
  templateUrl: './cms-feature.component.html',
  styleUrls: ['./cms-feature.component.scss']
})
export class CmsFeatureComponent extends BaseComponent {

  FormMode = FormMode;

  @Input()
  formMode = FormMode.None;

  @Output()
  cancel = new EventEmitter();

  @Output()
  save = new EventEmitter();

  @Output()
  update = new EventEmitter();

  @Output()
  delete = new EventEmitter();

  @ViewChild("cancelBtn")
  cancelBtn: BaseButton;

  @ViewChild("saveBtn")
  saveBtn: BaseButton;

  @ViewChild("updateBtn")
  updateBtn: BaseButton;

  @ViewChild("deleteBtn")
  deleteBtn: BaseButton;
}
