import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { DxTextBoxComponent } from 'devextreme-angular';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BaseButton } from 'src/app/shared/components/micro/button/button.component';
import { BaseUploaderComponent } from 'src/app/shared/components/micro/uploader/uploader.component';
import { Banner } from 'src/app/shared/models/banner/banner';
import { BannerService } from 'src/app/shared/services/banner/banner.service';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { TranslationService } from 'src/app/shared/services/translation/translation.service';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';

@Component({
  selector: 'app-cms-banner',
  templateUrl: './cms-banner.component.html',
  styleUrls: ['./cms-banner.component.scss']
})
export class CmsBannerComponent extends BaseComponent implements AfterViewInit {

  data = new Banner();

  updateMode = false;

  maxCount = 3;

  @ViewChild("title")
  title!: DxTextBoxComponent;

  @ViewChild("saveBtn")
  saveBtn!: BaseButton;

  @ViewChild("uploader")
  uploader: BaseUploaderComponent;

  constructor(
    injector: Injector,
    public publisher: PublisherService,
    public bannerService: BannerService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.publisher.updateCmsHeaderLabelEvent.emit('Quản lý Banner trang chủ');
    super.ngOnInit();
    this.load(true);
  }

  ngAfterViewInit(): void {
  }

  load(autoFocus: boolean) {
    this.isLoading = true;
    this.bannerService
      .information()
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success' && resp.data) {
          this.data = resp.data;
        }
      });
  }

  update() {
    this.updateMode = true;
    this.title.instance.focus();
  }

  cancel() {
    this.updateMode = false;
    this.load(false);
  }

  save() {
    this.isLoading = true;
    this.bannerService
      .updateInformation(this.data)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => { this.isLoading = false; this.saveBtn.finish(); })
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          SnackBar.success(new SnackBarParameter(this, 'Thông báo', TranslationService.VALUES['data_messages']['save_success_msg']));
          this.updateMode = false;
          this.load(false);
        }
      });
  }

  uploaded(event) {
    if (this.data && this.data.images && this.data.images.length) {
      this.data.images = this.data.images.concat(event.fileNames);
      this.data.imageUrls = this.data.imageUrls.concat(event.presignedUrls);

      if (this.data.images.length > 3) {
        const index = this.data.images.length - 3;
        this.data.images = this.data.images.splice(index, this.maxCount);
        this.data.imageUrls = this.data.imageUrls.splice(index, this.maxCount);
      }
    }
    else {
      this.data.images = event.fileNames;
      this.data.imageUrls = event.presignedUrls;
    }
  }

  remove(index) {
    this.data.images.splice(index, 1);
    this.data.imageUrls.splice(index, 1);
  }
}
