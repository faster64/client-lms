import { Component, Injector, ViewChild } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BaseButton } from 'src/app/shared/components/micro/button/button.component';
import { BaseUploaderComponent } from 'src/app/shared/components/micro/uploader/uploader.component';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { Guide } from 'src/app/shared/models/guide/guide';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { GuideService } from 'src/app/shared/services/guide/guide.service';
import { TranslationService } from 'src/app/shared/services/translation/translation.service';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';

@Component({
  selector: 'app-cms-guide',
  templateUrl: './cms-guide.component.html',
  styleUrls: ['./cms-guide.component.scss']
})
export class CmsGuideComponent extends BaseComponent {

  guide = new Guide();

  updateMode = false;

  @ViewChild("uploader")
  uploader: BaseUploaderComponent;

  @ViewChild("saveBtn")
  saveBtn!: BaseButton;

  constructor(
    injector: Injector,
    public publisher: PublisherService,
    public guideService: GuideService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.publisher.updateCmsHeaderLabelEvent.emit('Quản lý hướng dẫn sử dụng');
    super.ngOnInit();
    this.load();
  }

  uploaded(event) {
    this.guide.linkYoutube = '';
    setTimeout(() => {
      this.guide.originFileName = event.files[0].name;
      this.guide.fileUrl = event.presignedUrls[0];
      this.guide.fileName = event.fileNames[0];
    }, 100);
  }

  youtubeChanged() {
    this.guide.originFileName = '';
    this.guide.fileUrl = '';
    this.guide.fileName = '';
    this.uploader.reset();
  }

  removeFile(event) {
    event.stopPropagation();
    event.preventDefault();

    this.guide.originFileName = '';
    this.guide.fileUrl = '';
    this.guide.fileName = '';
    this.uploader.reset();
  }

  removeYoutube(event) {
    event.stopPropagation();
    event.preventDefault();
    this.guide.linkYoutube = '';
  }

  openPdf() {
    window.open(this.guide.fileUrl, '_blank');
  }

  load() {
    this.isLoading = true;
    this.guide = new Guide();
    this.guideService
      .information()
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success' && resp.data) {
          this.guide = resp.data;
        }
        if (StringHelper.isNullOrEmpty(this.guide.fileName) && StringHelper.isNullOrEmpty(this.guide.linkYoutube)
        ) {
          this.update();
        }
      });
  }

  update() {
    this.updateMode = true;
  }

  cancel() {
    this.updateMode = false;
    this.load();
  }

  save() {
    this.isLoading = true;
    this.guideService
      .updateInformation(this.guide)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => { this.isLoading = false; this.saveBtn.finish(); })
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          SnackBar.success(new SnackBarParameter(this, TranslationService.VALUES['data_messages']['save_success_msg']));
          this.updateMode = false;
          this.load();
        }
      });
  }
}
