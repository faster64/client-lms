import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { CmsFormComponent } from '../cms-page-form.component';
import { FormMode } from 'src/app/shared/enums/form-mode.enum';
import { DxTextBoxComponent } from 'devextreme-angular';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { SocialService } from 'src/app/shared/services/social/social.service';
import { finalize, takeUntil } from 'rxjs';
import { TranslationService } from 'src/app/shared/services/translation/translation.service';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';
import { BaseButton } from 'src/app/shared/components/micro/button/button.component';
import { StringHelper } from 'src/app/shared/helpers/string.helper';

@Component({
  selector: 'app-cms-social',
  templateUrl: './cms-social.component.html',
  styleUrls: ['./cms-social.component.scss']
})
export class CmsSocialComponent extends BaseComponent implements AfterViewInit {

  FormMode = FormMode;

  data: any = {};

  updateMode = false;

  @ViewChild("phone")
  phone!: DxTextBoxComponent;

  @ViewChild("saveBtn")
  saveBtn!: BaseButton;

  constructor(
    injector: Injector,
    public publisher: PublisherService,
    public socialService: SocialService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.publisher.updateCmsHeaderLabelEvent.emit('Quản lý mạng xã hội');
    super.ngOnInit();
    this.load(true);
  }

  ngAfterViewInit(): void {
  }

  load(autoFocus: boolean) {
    this.isLoading = true;
    this.socialService
      .information()
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success' && resp.data) {
          this.data = resp.data;
        }
        if (StringHelper.isNullOrEmpty(this.data.phoneNumber) &&
          StringHelper.isNullOrEmpty(this.data.email) &&
          StringHelper.isNullOrEmpty(this.data.zalo) &&
          StringHelper.isNullOrEmpty(this.data.youtube) &&
          StringHelper.isNullOrEmpty(this.data.facebook)
        ) {
          if (autoFocus) {
            this.update();
          }
        }
      });
  }

  update() {
    this.updateMode = true;
    this.phone.instance.focus();
  }

  cancel() {
    this.updateMode = false;
    this.load(false);
  }

  save() {
    this.isLoading = true;
    this.socialService
      .updateInformation(this.data)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => { this.isLoading = false; this.saveBtn.finish(); })
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          SnackBar.success(new SnackBarParameter(this, TranslationService.VALUES['data_messages']['save_success_msg']));
          this.updateMode = false;
          this.load(false);
        }
      });
  }
}
