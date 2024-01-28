import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgxDropzoneComponent } from 'ngx-dropzone';
import { forkJoin, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Utility } from 'src/app/shared/utility/utility';
import { BaseButton } from '../button/button.component';
import { FileHandlingStatus, UploadEvent } from 'src/app/shared/interfaces/upload-event.interface';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { FileEvent } from 'src/app/shared/interfaces/file-event.interface';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class BaseUploaderComponent {

  formData = new FormData();

  events: UploadEvent[] = [];

  urls: any[] = [];

  isFetching = false;

  @Input()
  label = 'Hoặc click để chọn hình ảnh tải lên tại đây';

  @Input()
  mode = '';

  @Input()
  maxFileSize = 1024 * 1024 * 50;

  @Input()
  maxCount = 0;

  @Input()
  allowedFileExtensions = Utility.imageExtensions.map(i => `.${i}`).join(",");

  //@Input()
  //=allowedFileExtensions = Utility.videoExtensions.map(i => `.${i}`).concat(Utility.imageExtensions.map(i => `.${i}`)).join(",");

  @Input()
  disabled = false;

  @Input()
  multiple = true;

  @Input()
  url = '';

  @Input()
  files: File[] = [];

  @Input()
  auto = false;


  @Output()
  onChanged = new EventEmitter();

  @Output()
  onAutoFetchStarted = new EventEmitter();

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
    console.log(fileEvent)
    const files = [...fileEvent.addedFiles].filter(x => !this.files.find(f => f.name == x.name));

    this.events = [];
    if (!this.multiple) {
      this.files = [];
      this.files = files;
    } else {
      this.files.push(...files);
    }

    this.handle(fileEvent);
  }

  removed(file: any) {
    if (!this.multiple) {
      this.files = [];
      this.urls = [];
      this.events = [];
    }
    else {
      // Xóa file
      this.files.splice(this.files.indexOf(file), 1);

      // Xóa event
      const eventIndex = this.events.findIndex(e => e.file.name == file.name);
      this.events.splice(eventIndex, 1);

      // Xóa presigned url
      if (this.auto) {
        const presignedIndex = this.urls.findIndex(x => x.originFileName == file.name);
        this.urls.splice(presignedIndex, 1);
      }
    }

    this.onRemoved.emit({
      files: this.files,
      presignedUrls: this.urls
    });
  }

  upload(fileNames: string[]) {
    if (this.auto && this.isFetching) {
      SnackBar.warning(new SnackBarParameter(this, 'File đang được tải lên, vui lòng đợi'));
      return;
    }

    this.onChanged.emit({
      files: this.files,
      presignedUrls: this.urls,
      fileNames: fileNames
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
    if (this.maxCount > 0) {
      this.files = this.files.splice(0, this.maxCount);
    }

    if (!this.auto) {
      this.upload([]);
      return;
    }

    this.onAutoFetchStarted.emit();
    this.isFetching = true;
    if (!this.events.length) {
      this.appendEvents(this.files);
    } else {
      this.appendEvents(fileEvent.addedFiles);
    }

    const batchSize = 3;
    const events = [...this.events].filter(e => !this.urls.find(x => x.originFileName == e.file.name));
    const remain = events.length;
    if (remain == 0) {
      this.isFetching = false;
      return;
    }

    this.next(events, batchSize, remain, () => {
      this.urls = this.events.map(e => environment.upload_url + '/public/content/' + e.response.data);
      this.upload(this.events.map(e => e.response.data));
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
      .pipe(finalize(() => this.isFetching = false))
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
    if (this.isFetching) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  reset() {
    this.files = [];
    this.events = [];
    this.isFetching = false;
    this.formData = new FormData();
  }
}
