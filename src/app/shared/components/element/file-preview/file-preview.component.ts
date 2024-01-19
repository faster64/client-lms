import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, Inject, Injector } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, finalize, takeUntil, throwError } from 'rxjs';
import { BaseComponent } from '../../base-component';
import { Filez } from 'src/app/models/cloud/file';
import { FileType } from 'src/app/shared/enumerations/file.enum';
import { Suppoter } from 'src/app/shared/constants/common.constant';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss']
})
export class FilePreviewComponent extends BaseComponent {

  private httpClient: HttpClient;

  error: any = null;;

  notsupported = false;

  constructor(
    injector: Injector,
    public handler: HttpBackend,
    @Inject(MAT_DIALOG_DATA) public file: Filez,
  ) {
    super(injector);
    this.httpClient = new HttpClient(handler);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    setTimeout(() => {
      this.get();
    }, 100);
  }

  get() {
    const ele = document.getElementById(`fpreview-${this.file.id}`);
    if (this.file.type == FileType.Image) {
      ele.innerHTML = `<img src="${this.file.presignedUrl}">`;
    } else if (this.file.type == FileType.Video) {
      ele.innerHTML = `<video controls="controls" preload="metadata" loop>
                          <source [src]="${this.file.presignedUrl}#t=0.1" type="video/mp4">
                       </video>`;
    } else {
      if (!Suppoter.PreviewExtensions.includes(this.file.extension)) {
        ele.style.display = 'none';
        this.notsupported = true;
        return;
      }


      this.isLoading = true;
      this.httpClient.get(this.file.presignedUrl, { responseType: 'text' })
        .pipe(
          takeUntil(this._onDestroySub),
          finalize(() => this.isLoading = false),
          catchError((e) => {
            this.error = e;
            return throwError(e);
          })
        )
        .subscribe(resp => {
          setTimeout(() => {
            ele.innerText += resp;
          }, 100);
        });
    }
  }
}