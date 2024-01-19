import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseModuleComponent } from 'src/app/shared/components/base-module-component';
import { CommonRedirect } from 'src/app/shared/constants/routing.constant';
import { SessionStorageKey } from 'src/app/shared/constants/sessionstorage.key';

@Component({
  selector: 'app-session-trace-log',
  templateUrl: './session-trace-log.component.html',
  styleUrls: ['./session-trace-log.component.scss']
})
export class SessionTraceLogComponent extends BaseModuleComponent {

  logs: string[];

  tooltip = "Một phiên làm việc sẽ kết thúc khi bạn đóng tab hoặc trình duyệt"

  constructor(
    public override injector: Injector,
    public router: Router
  ) {
    super(injector);
  }

  override initData(): void {
    super.initData();
    const json = sessionStorage.getItem(SessionStorageKey.SESSION_LOG);
    if (json) {
      this.isLoading = true;
      setTimeout(() => {
        this.logs = JSON.parse(json);
      }, 300);
      setTimeout(() => {
        this.isLoading = false;
        setTimeout(() => {
          const element = document.querySelector('.session-trace-log .virtual-scroll');
          element.scrollTo(0, element.scrollHeight);
        }, 300);
      }, 500);
    }
  }

  back() {
    this.router.navigateByUrl(`/${CommonRedirect}`);
  }
}
