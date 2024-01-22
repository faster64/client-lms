import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CmsFormComponent } from '../../cms-page-form.component';
import { Class } from 'src/app/shared/models/class/class';
import { DxTextBoxComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { ClassService } from 'src/app/shared/services/class/class.service';
import { finalize, takeUntil } from 'rxjs';
import { FormModeText } from 'src/app/shared/constants/form-mode.constant';
import { FormMode } from 'src/app/shared/enums/form-mode.enum';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';

@Component({
  selector: 'app-cms-class-form',
  templateUrl: './cms-class-form.component.html',
  styleUrls: ['./cms-class-form.component.scss']
})
export class CmsClassFormComponent extends CmsFormComponent implements AfterViewInit {
  @ViewChild("classInput")
  classInput!: DxTextBoxComponent;

  override ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    if (this.formMode != FormMode.View) {
      this.classInput.instance.focus();
    }
  }

  override initConfig(): void {
    super.initConfig();
    this.service = this.injector.get(ClassService);
  }

  override cancel = () => this.router.navigateByUrl(Routing.CMS_CLASS.path);

  override save(): void {
    this.isLoading = true;
    this.service
      .saveOne(this.data)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => {
          this.isLoading = false;
          this.cmsFeature.saveBtn.finish();
        })
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.router.navigateByUrl(`/${Routing.CMS_CLASS.path}/${FormModeText.VIEW}/${resp.data}`);
        }
      })
  }
}
