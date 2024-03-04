import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  initValue: any;

  @Input()
  dataSource: any[] = [];

  @Input()
  displayExpr = "name";

  @Input()
  valueExpr = "id";

  @Input()
  placeholder = "";

  @Input()
  noDataText = "Không có dữ liệu";

  @Input()
  isValid = true;

  @Input()
  disabled = false;

  @Input()
  readOnly = false;

  @Input()
  width = undefined;

  @Input()
  height = undefined;

  @Input()
  label = "";

  @Input()
  hint = "";

  @Input()
  name = "";

  @Input()
  value: any;

  @Input()
  isFetching = false;

  @Input()
  enabledAdd = false;

  @Input()
  enabledClear = false;

  @Output()
  onOpened = new EventEmitter();

  @Output()
  onValueChanged = new EventEmitter();

  @Output()
  onEnterKey = new EventEmitter();

  @Output()
  onBlur = new EventEmitter();

  @Output()
  onAdd = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    if (this.value != null && this.value != undefined) {
      this.initValue = JSON.parse(JSON.stringify(this.value));
    }
  }


  public onOpenedFunc(e: any) {
    this.onOpened.emit(e);
  }
  public onValueChangedFunc(e: any) {
    if (e.value == null && this.initValue) {
      e.value = this.initValue;
    }
    this.onValueChanged.emit(e);
  }

  public onEnterKeyFunc(e: any) {
    this.onEnterKey.emit(e);
  }

  public onBlurFunc(e: any) {
    this.onBlur.emit(e);
  }

  public onAddFunc(e: any) {
    this.onAdd.emit(e);
  }

}
