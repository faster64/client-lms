import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { ServerInfoService } from 'src/app/shared/services/base/server-info.service';
import { SharedService } from 'src/app/shared/services/base/shared.service';

@Component({
  selector: 'app-not-connected',
  templateUrl: './not-connected.component.html',
  styleUrls: ['./not-connected.component.scss']
})
export class NotConnectedComponent {

  continue = '';

  constructor(
    public service: ServerInfoService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {

    SharedService.UnderMaintenanceMode = true;
    this.continue = this.activatedRoute.snapshot.queryParams['continue'];
    this.reconnect();
  }

  reconnect() {
    const id = setInterval(() => {
      this.service.checkConnect()
        .subscribe(resp => {
          clearInterval(id);
          SharedService.UnderMaintenanceMode = false;
          if (!StringHelper.isNullOrEmpty(this.continue)) {
            window.location.href = this.continue;
          }
          this.router.navigateByUrl('/');
        })
    }, 4000);
  }
}
