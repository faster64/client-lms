import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';

@Component({
  selector: 'app-cms-banner',
  templateUrl: './cms-banner.component.html',
  styleUrls: ['./cms-banner.component.scss']
})
export class CmsBannerComponent extends BaseComponent {

  override ngOnInit(): void {
    this.injector.get(PublisherService).updateCmsHeaderLabelEvent.emit('Quản lý Banner trang chủ');
    super.ngOnInit();
  }

}
