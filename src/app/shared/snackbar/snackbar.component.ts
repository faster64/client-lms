import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { SnackBarParameter } from './snackbar.param';

export class NotificationMessageElement {
  public title: HTMLElement;
  public text: HTMLElement;
}

@Component({
  selector: 'snackbar',
  template: '',
  styleUrls: []
})
export class SnackBar implements OnInit, OnDestroy {

  private _onDestroySub: Subject<void> = new Subject<void>();

  public static snackBar: MatSnackBar;
  public static forever: number = 999999999;
  public static timeoutId: any;

  constructor(private _snackBar: MatSnackBar) {
    SnackBar.snackBar = this._snackBar;
  }

  ngOnInit(): void {
  }

  private static getHook() {
    return document.getElementById("notification-hook");
  }

  private static getMessageBox(): NotificationMessageElement {
    const title = (document.querySelector("#notification-hook .message .title") as HTMLElement);
    const text = (document.querySelector("#notification-hook .message .text") as HTMLElement);
    return {
      title: title,
      text: text
    }
  }

  private static openMessage(parameter: SnackBarParameter, className: string) {
    clearTimeout(this.timeoutId);

    const hook = SnackBar.getHook();
    const messageBox = SnackBar.getMessageBox();
    let timeout = 0;

    if (hook.classList.contains("opened")) {
      hook.style.opacity = "0";
      (hook as any).removeAllListeners();
      timeout = 200;
    }

    this.timeoutId = setTimeout(() => {
      this.open(hook, messageBox, parameter, className);

      this.timeoutId = setTimeout(() => {
        this.internalClose(hook, messageBox, parameter, className);
      }, parameter.duration);
    }, timeout);
  }

  private static open(hook: HTMLElement, box: NotificationMessageElement, parameter: SnackBarParameter, className: string) {
    hook.style.visibility = "visible";
    hook.style.right = "40px";
    hook.style.opacity = "1";
    hook.classList.remove("success");
    hook.classList.remove("warning");
    hook.classList.remove("danger");
    hook.classList.remove("in-progress");
    hook.classList.add(className);
    hook.classList.add("opened");


    box.title.innerText = parameter.title;
    box.text.innerText = parameter.message;

    if (parameter.callback) {
      hook.addEventListener("click", () => parameter.callback());
    } else {
      hook.addEventListener("click", () => {
        this.internalClose(hook, box, parameter, className);
      });
    }
  }

  private static internalClose(hook: HTMLElement, box: NotificationMessageElement, parameter: SnackBarParameter, className: string) {
    hook.style.visibility = "hidden";
    hook.style.right = "-400px";
    hook.classList.remove(className);
    hook.classList.remove("opened");

    box.title.innerText = "";
    box.text.innerText = "";

    if (parameter.callback) {
      (hook as any).removeAllListeners();
    }
  }

  public static close() {
    const hook = SnackBar.getHook();
    const messageBox = SnackBar.getMessageBox();

    this.internalClose(hook, messageBox, new SnackBarParameter(null, '', ''), "success");
    this.internalClose(hook, messageBox, new SnackBarParameter(null, '', ''), "warning");
    this.internalClose(hook, messageBox, new SnackBarParameter(null, '', ''), "danger");
    this.internalClose(hook, messageBox, new SnackBarParameter(null, '', ''), "in-progress");
  }

  public static closeSuccess() {
    const hook = SnackBar.getHook();
    const messageBox = SnackBar.getMessageBox();

    this.internalClose(hook, messageBox, new SnackBarParameter(null, ""), "success");
  }

  public static closeWarning() {
    const hook = SnackBar.getHook();
    const messageBox = SnackBar.getMessageBox();

    this.internalClose(hook, messageBox, new SnackBarParameter(null, ""), "warning");
  }

  public static closeDanger() {
    const hook = SnackBar.getHook();
    const messageBox = SnackBar.getMessageBox();

    this.internalClose(hook, messageBox, new SnackBarParameter(null, ""), "danger");
  }

  public static closeInProgress() {
    const hook = SnackBar.getHook();
    const messageBox = SnackBar.getMessageBox();

    this.internalClose(hook, messageBox, new SnackBarParameter(null, ""), "in-progress");
  }

  public static success(parameter: SnackBarParameter) {
    this.openMessage(parameter, "success");
  }

  public static warning(parameter: SnackBarParameter) {
    this.openMessage(parameter, "warning");
  }

  public static danger(parameter: SnackBarParameter) {
    this.openMessage(parameter, "danger");
  }

  public static progress(parameter: SnackBarParameter) {
    this.openMessage(parameter, "in-progress");
  }

  /**
   * Dismiss
   */
  public static dismiss() {
    SnackBar.snackBar.dismiss();
  }

  ngOnDestroy(): void {
    // unsubscribe khi destroy
    if (this._onDestroySub) {
      this._onDestroySub.next();
      this._onDestroySub.complete();
      this._onDestroySub.unsubscribe();
    }
  }
}
