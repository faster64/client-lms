import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ButtonColor, ButtonType, IconButtonType } from 'src/app/shared/constants/button.constant';
import { ActionExponent } from 'src/app/shared/enums/exponent.enum';
import { TranslationService } from 'src/app/shared/services/translation/translation.service';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';
import { AuthUtility } from 'src/app/shared/utility/auth-utility';

@Component({
  selector: 'base-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class BaseButton implements OnInit, AfterViewInit, OnDestroy {
  IconButtonType = IconButtonType;

  ButtonType = ButtonType;

  private _isFinished = true;
  get isFinished(): boolean {
    return this._isFinished;
  }

  set isFinished(value: boolean) {
    this._isFinished = value;
    this.disabled = !value;
  }

  //#region Input
  @Input()
  buttonType: ButtonType = ButtonType.RAISED;

  @Input()
  actionExponents: ActionExponent[] = [ActionExponent.None];

  @Input()
  color: ButtonColor = ButtonColor.PRIMARY;

  @Input()
  disabled = false;

  private _text = "Please set button's text";
  @Input()
  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  @Input()
  class = "";

  @Input()
  style = {};

  @Input()
  draggable = false;

  @Input()
  autofocus = false;

  @Input()
  name = "";

  @Input()
  value: any;

  @Input()
  hidden = false;

  @Input()
  width = 0;

  @Input()
  height = 0;

  @Input()
  iconButtonType: IconButtonType = IconButtonType.NONE;

  @Input()
  finishImmediately = false;

  //#endregion

  //#region Output
  @Output()
  onClick = new EventEmitter<any>();

  @Output()
  onDblclick = new EventEmitter<any>();
  //#endregion

  @ViewChild("baseBtn")
  btn!: ElementRef;

  userPermission = '0';

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setSize();
  }

  ngOnDestroy(): void {
    this.isFinished = true;
  }

  getButtonWidth() {
    return this.btn.nativeElement.offsetWidth;
  }

  setSize() {
    if (this.width !== 0) {
      this.btn.nativeElement.style.width = this.width + "px";
    }

    if (this.height !== 0) {
      this.btn.nativeElement.style.height = this.height + "px";
    }
  }

  /**
   * Execute when click button
   */
  clickExecute(e: any) {
    if (!this.isFinished || this.disabled)
      return;

    const hasPermission = AuthUtility.checkPermission(this.actionExponents);
    if (hasPermission) {
      this.isFinished = false;
      this.onClick.emit(e);

      if (this.finishImmediately) {
        this.isFinished = true;
      }
    } else {
      this.notPermissionNotify();
    }
  }

  /**
   * Execute when dblclick button
   */
  dlclickExecute(e: any) {
    // if (!this.isFinished)
    //   return;

    // const hasPermission = this.checkPermission();
    // if (hasPermission) {
    //   this.isFinished = false;
    //   this.onDblclick.emit(e);

    //   if (this.finishImmediately) {
    //     this.isFinished = true;
    //   }
    // } else {
    //   this.notPermissionNotify();
    // }
  }

  /**
   * Bắn noti khi không có quyền
   */
  notPermissionNotify() {
    const snackBarParameter = new SnackBarParameter();
    snackBarParameter.message = TranslationService.VALUES['errors']['not_permission'];
    snackBarParameter.duration = 2000;

    SnackBar.warning(snackBarParameter);
  }

  finish() {
    this.isFinished = true;
  }
}
