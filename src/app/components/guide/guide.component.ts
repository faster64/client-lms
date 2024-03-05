import { Component, Injector } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { DeviceType } from 'src/app/shared/enums/device.enum';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { MessageBox } from 'src/app/shared/message-box/message-box.component';
import { Message } from 'src/app/shared/message-box/model/message';
import { Guide } from 'src/app/shared/models/guide/guide';
import { SharedService } from 'src/app/shared/services/base/shared.service';
import { GuideService } from 'src/app/shared/services/guide/guide.service';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent extends BaseComponent {

  guide = new Guide();

  constructor(
    injector: Injector,
    public guideService: GuideService
  ) {
    super(injector);
  }

  override initData(): void {
    super.initData();
    this.load();
  }

  load() {
    this.isLoading = true;
    this.guideService
      .information()
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.guide = resp.data;
          if (SharedService.DeviceType == DeviceType.Mobile && !StringHelper.isNullOrEmpty(this.guide.fileName)) {
            window.location.href = this.guide.fileUrl;
          }
        }
      })
  }
}
