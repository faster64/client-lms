import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgxDropzoneComponent } from 'ngx-dropzone';
import { forkJoin, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Utility } from 'src/app/shared/utility/utility';
import { BaseButton } from '../button/button.component';
import { FileHandlingStatus, UploadEvent } from 'src/app/shared/interfaces/upload-event.interface';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { FileEvent } from 'src/app/shared/interfaces/file-event.interface';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class BaseUploaderComponent {

  formData = new FormData();

  maxFileSize = 1024 * 1024 * 50;

  events: UploadEvent[] = [];

  presignedUrls: any[] = [];

  isGettingPresignedUrl = false;

  @Input()
  allowedFileExtensions = Utility.videoExtensions.map(i => `.${i}`).concat(Utility.imageExtensions.map(i => `.${i}`)).join(",");

  @Input()
  disabled = false;

  @Input()
  multiple = true;

  @Input()
  uploadUrl = '';

  @Input()
  showUploadButton = true;

  @Input()
  files: File[] = [];

  @Input()
  usePresignedUrl = false;

  @Output()
  onChanged = new EventEmitter();

  @Output()
  onGetPresignedUrlStarted = new EventEmitter();

  @Output()
  onRemoved = new EventEmitter();

  @ViewChild("uploadBtn")
  uploadBtn!: BaseButton;

  @ViewChild("dropzone")
  dropzone!: NgxDropzoneComponent;

  constructor(
    public utilsService: UtilsService
  ) { }

  selected(fileEvent: FileEvent) {
    const files = [...fileEvent.addedFiles].filter(x => !this.files.find(f => f.name == x.name));

    if (!this.multiple) {
      this.files = [];
      this.files = files;
    } else {
      this.files.push(...files);
    }

    if (!this.showUploadButton) {
      this.upload();
    }
    this.handle(fileEvent);
  }

  removed(file: any) {
    if (!this.multiple) {
      this.files = [];
      this.presignedUrls = [];
      this.events = [];
    }
    else {
      // Xóa file
      this.files.splice(this.files.indexOf(file), 1);

      // Xóa event
      const eventIndex = this.events.findIndex(e => e.file.name == file.name);
      this.events.splice(eventIndex, 1);

      // Xóa presigned url
      if (this.usePresignedUrl) {
        const presignedIndex = this.presignedUrls.findIndex(x => x.originFileName == file.name);
        this.presignedUrls.splice(presignedIndex, 1);
      }
    }

    this.onRemoved.emit({
      files: this.files,
      presignedUrls: this.presignedUrls
    });
  }

  upload() {
    if (this.usePresignedUrl && this.isGettingPresignedUrl) {
      SnackBar.warning(new SnackBarParameter(this, 'File đang được tải lên, vui lòng đợi'));
      return;
    }

    this.onChanged.emit({
      files: this.files,
      presignedUrls: this.presignedUrls
    });
  }

  appendEvents(files: Array<File>) {
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      if (!this.events.find(e => e.file.name == file.name)) {
        const formData = new FormData();
        formData.append('file', file, file.name);

        this.events.push({
          id: index,
          ob: this.utilsService.uploadImage(formData),
          file: file,
          status: 0
        });
      }
    }
  }

  handle(fileEvent: FileEvent) {
    if (!this.usePresignedUrl) {
      return;
    }

    this.onGetPresignedUrlStarted.emit();
    this.isGettingPresignedUrl = true;
    if (!this.events.length) {
      this.appendEvents(this.files);
    } else {
      this.appendEvents(fileEvent.addedFiles);
    }

    const batchSize = 3;
    const events = [...this.events].filter(e => !this.presignedUrls.find(x => x.originFileName == e.file.name));
    const remain = events.length;
    if (remain == 0) {
      this.isGettingPresignedUrl = false;
      return;
    }

    this.next(events, batchSize, remain, () => {
      this.isGettingPresignedUrl = false;
      this.presignedUrls = this.events.map(e => e.response.data);
      this.upload();
    });
  }

  next(events: UploadEvent[], batchSize: number, remain: number, completedCallback?: Function) {
    if (!events.length) {
      if (completedCallback) {
        completedCallback();
      }
      return;
    }

    const localEvents = events.splice(0, batchSize);
    const obs = localEvents.map(x => x.ob
      .pipe(
        catchError(error => {
          x.status = FileHandlingStatus.Failed;
          x.message = JSON.stringify(error);
          return throwError(error);
        })
      )
    );
    forkJoin(obs)
      .subscribe(resps => {
        resps.forEach((resp, idx) => {
          localEvents[idx].response = resp;
          if (resp.code == 'success') {
            localEvents[idx].status = FileHandlingStatus.Success;
          } else {
            localEvents[idx].status = FileHandlingStatus.Failed;
            localEvents[idx].message = resp.message;
          }

        });
        remain -= batchSize;
        console.log(`uploaded ${localEvents.length} files, remain ${Math.max(0, remain)} files, process will continue after 0.3s...`);
        setTimeout(() => {
          this.next(events, batchSize, remain, completedCallback);
        }, 300);
      }
      );
  }

  prevent(event) {
    if (this.isGettingPresignedUrl) {
      event.stopPropagation();
      event.preventDefault();
    }
  }
}
