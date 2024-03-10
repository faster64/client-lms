import { Component, Injector } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MessageBox } from 'src/app/shared/message-box/message-box.component';
import { Message } from 'src/app/shared/message-box/model/message';
import { ServiceResult } from 'src/app/shared/models/base/service-result';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { HubConnectionService } from 'src/app/shared/services/socket/hub-connection.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent extends BaseComponent {

  constructor(
    injector: Injector,
    public hubService: HubConnectionService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  send() {
    const service = this.injector.get(BaseService);
    service.http.post<ServiceResult>('https://localhost:7296/api/v1/conversation/send-to-admin', { content: 'to admin ' + this.Utility.randomText() })
      .subscribe(resp => {
        MessageBox.information(new Message(this, { content: resp.code }));
      });
  }

  send2() {
    const service = this.injector.get(BaseService);
    service.http.post<ServiceResult>('https://localhost:7296/api/v1/conversation/send-to-user?receiverId=123456', { content: 'to user ' + this.Utility.randomText() })
      .subscribe(resp => {
        MessageBox.information(new Message(this, { content: resp.code }));
      });
  }
}
