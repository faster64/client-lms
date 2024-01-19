import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Message } from 'src/app/models/message';
import { FileType } from 'src/app/shared/enumerations/file.enum';
import { MessageBox } from '../../element/message-box/message-box.component';
import { NumberFormatPipe } from 'src/app/shared/pipes/number-format.pipe';
import { FileHelper } from 'src/app/shared/helpers/file.helper';

@Component({
  selector: 'folder-picker',
  templateUrl: './folder-picker.component.html',
  styleUrls: ['./folder-picker.component.scss']
})
export class FolderPickerComponent {

  FileType = FileType;

  files = [];
  isUploading = false;

  @Input()
  maxFileSize = 25 * 1024 * 1024; // bytes

  @Output()
  selected = new EventEmitter();

  @Output()
  reseted = new EventEmitter();

  @ViewChild("uploadInput")
  uploadInput: ElementRef;


  checkFile(file: any) {
    if (file.size > this.maxFileSize) {
      const html = `<div class='over-file-size'>
                      <div class='error'>Lỗi: Kích cỡ mỗi tệp tối đa là ${FileHelper.Format(this.maxFileSize)}</div>
                      <div class='item'> <span class='title'>Tên tệp:</span> <strong>${file.name}</strong></div>
                      <div class='item'> <span class='title'>Kích cỡ:</span> <strong>${FileHelper.Format(file.size)}</strong></div>
                      <div class='item'> <span class='title'>Đường dẫn:</span> <strong>${file.webkitRelativePath}</strong></div>
                    </div>
                    `;
      MessageBox.html(new Message(this, { content: html }));
      return false;
    }
    return true;
  }

  onFolderSelected(event) {
    this.files = this.files.concat([...event.target.files]);
    for (var i = 0; i < this.files.length; ++i) {
      const file = this.files[i];
      if (!this.checkFile(file)) {
        this.reset(false);
        return;
      }

      this.addInfo(file, i + 1);
    }
    this.selected.emit(this.files);
  }

  addInfo(file: any, id: number) {
    file.id = id;
    file.srcUrl = URL.createObjectURL(file);
    if (file.type.startsWith('image')) {
      file.fileType = FileType.Image;
    } else if (file.type.startsWith('video')) {
      file.fileType = FileType.Video;
    } else {
      file.fileType = FileType.Other;
    }
  }

  remove(id) {
    const index = this.files.findIndex(f => f.id == id);
    this.files.splice(index, 1);
    this.files = [...this.files];
    this.uploadInput.nativeElement.type = '';
    this.uploadInput.nativeElement.type = 'file';
  }

  reset(isConfirm?: boolean) {
    if (isConfirm) {
      MessageBox.confirm(new Message(this, { content: 'Tải lại sẽ xóa hết tệp hiện tại. Bạn có chắc chắn không?' }, () => {
        this.files = [];
        this.uploadInput.nativeElement.type = '';
        this.uploadInput.nativeElement.type = 'file';
        this.reseted.emit();
      }));
    }
    else {
      this.files = [];
      this.uploadInput.nativeElement.type = '';
      this.uploadInput.nativeElement.type = 'file';
    }
  }
}
