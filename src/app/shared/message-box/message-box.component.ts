import { Component, OnInit } from '@angular/core';
import { DialogPosition, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NotiBoxComponent } from './noti-box/noti-box.component';
import { Message } from './model/message';
import { MessageData } from './model/message-data';
import { MessageBoxType } from './enum/message.enum';
import { BreakPoint } from '../constants/break-point.constant';


@Component({
  selector: 'message-box',
  template: '',
  styles: [],
})
export class MessageBox implements OnInit {
  private static _dialog: MatDialog;
  private static _config: MatDialogConfig;
  private static dialogRef: MatDialogRef<NotiBoxComponent>;

  constructor(
    public dialog: MatDialog
  ) {
    MessageBox._dialog = dialog;
  }

  ngOnInit(): void {
    // MessageBox.initConfig(MessageBoxType.None);
  }

  /**
   * Khởi tạo common config
   */
  private static initConfig(boxType: MessageBoxType) {
    const isLms = [MessageBoxType.LmsFailed, MessageBoxType.LmsSuccess].includes(boxType);
    console.log(isLms, isLms ? 640 : 440)

    const width = Math.min(isLms ? 640 : 440, window.innerWidth * 0.8) + 'px';

    this._config = new MatDialogConfig();
    this._config.minWidth = this._config.maxWidth = this._config.width = width;
    this._config.minHeight = '120px';
    this._config.maxHeight = window.innerHeight * 0.8 + 'px';
    this._config.position = { top: '50px' };
    this._config.panelClass = ['message-box'];
  }

  /**
   * Chuẩn bị config để open dialog
   */
  private static prepareConfig(message: Message, boxType: MessageBoxType) {
    if (!this._config) {
      MessageBox.initConfig(boxType);
    }
    const config = this._config;

    if (!message.data) {
      message.data = new MessageData();
    }
    message.data.boxType = boxType;
    config.data = message;

    return config;
  }

  public static confirm(message: Message) {
    const config = this.prepareConfig(message, MessageBoxType.Confirm);
    if (MessageBox.dialogRef && MessageBox.dialogRef._containerInstance) {
      const configInstance = MessageBox.dialogRef._containerInstance._config;
      const messageInstance = configInstance?.data?.data?.content;
      if (message.data.content == messageInstance) {
        console.log("blocked 1 pop-up with the same message");
        return MessageBox.dialogRef.afterClosed();
      }
    }

    MessageBox.dialogRef?.close();
    MessageBox.dialogRef = MessageBox._dialog.open(NotiBoxComponent, config);
    MessageBox.dialogRef.afterClosed().subscribe(resp => {
      MessageBox.dialogRef = null;
    });
    return MessageBox.dialogRef.afterClosed();
  }

  public static delete(message: Message) {
    const config = this.prepareConfig(message, MessageBoxType.ConfirmDelete);
    if (MessageBox.dialogRef && MessageBox.dialogRef._containerInstance) {
      const configInstance = MessageBox.dialogRef._containerInstance._config;
      const messageInstance = configInstance?.data?.data?.content;
      if (message.data.content == messageInstance) {
        console.log("blocked 1 pop-up with the same message");
        return MessageBox.dialogRef.afterClosed();
      }
    }

    MessageBox.dialogRef?.close();
    MessageBox.dialogRef = MessageBox._dialog.open(NotiBoxComponent, config);
    MessageBox.dialogRef.afterClosed().subscribe(resp => {
      MessageBox.dialogRef = null;
    });
    return MessageBox.dialogRef.afterClosed();
  }

  public static information(message: Message) {
    const config = this.prepareConfig(message, MessageBoxType.Information);
    if (MessageBox.dialogRef && MessageBox.dialogRef._containerInstance) {
      const configInstance = MessageBox.dialogRef._containerInstance._config;
      const messageInstance = configInstance?.data?.data?.content;
      if (message.data.content == messageInstance) {
        console.log("blocked 1 pop-up with the same message");
        return of(false);
      }
    }

    MessageBox.dialogRef?.close();
    MessageBox.dialogRef = MessageBox._dialog.open(NotiBoxComponent, config);
    MessageBox.dialogRef.afterClosed().subscribe(resp => {
      MessageBox.dialogRef = null;
    });
    return MessageBox.dialogRef.afterClosed();
  }

  public static openCustom(component: any, message: Message) {
    const config = this.prepareConfig(message, MessageBoxType.None);
    if (MessageBox.dialogRef && MessageBox.dialogRef._containerInstance) {
      const configInstance = MessageBox.dialogRef._containerInstance._config;
      const messageInstance = configInstance?.data?.data?.content;
      if (message.data.content == messageInstance) {
        console.log("blocked 1 pop-up with the same message");
        return MessageBox.dialogRef.afterClosed();
      }
    }

    MessageBox.dialogRef?.close();
    MessageBox.dialogRef = MessageBox._dialog.open(component, config);
    MessageBox.dialogRef.afterClosed().subscribe(resp => {
      MessageBox.dialogRef = null;
    });
    return MessageBox.dialogRef.afterClosed();
  }

  public static html(message: Message) {
    const config = this.prepareConfig(message, MessageBoxType.Html);
    if (MessageBox.dialogRef && MessageBox.dialogRef._containerInstance) {
      const configInstance = MessageBox.dialogRef._containerInstance._config;
      const messageInstance = configInstance?.data?.data?.content;
      if (message.data.content == messageInstance) {
        console.log("blocked 1 pop-up with the same message");
        return of(false);
      }
    }

    MessageBox.dialogRef?.close();
    MessageBox.dialogRef = MessageBox._dialog.open(NotiBoxComponent, config);
    MessageBox.dialogRef.afterClosed().subscribe(resp => {
      MessageBox.dialogRef = null;
    });
    return MessageBox.dialogRef.afterClosed();
  }

  public static lms(message: Message, success?: boolean) {
    const config = this.prepareConfig(message, success ? MessageBoxType.LmsSuccess : MessageBoxType.LmsFailed);
    if (MessageBox.dialogRef && MessageBox.dialogRef._containerInstance) {
      const configInstance = MessageBox.dialogRef._containerInstance._config;
      const messageInstance = configInstance?.data?.data?.content;
      if (message.data.content == messageInstance) {
        console.log("blocked 1 pop-up with the same message");
        return of(false);
      }
    }

    MessageBox.dialogRef?.close();
    MessageBox.dialogRef = MessageBox._dialog.open(NotiBoxComponent, config);
    MessageBox.dialogRef.afterClosed().subscribe(resp => {
      MessageBox.dialogRef = null;
    });
    return MessageBox.dialogRef.afterClosed();
  }


  public static close() {
    MessageBox.dialogRef?.close();
  }
}
