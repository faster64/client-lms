import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DxTextBoxComponent } from 'devextreme-angular';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { FormMode } from 'src/app/shared/enums/form-mode.enum';
import { ClassService } from 'src/app/shared/services/class/class.service';
import { CmsFormComponent } from '../../cms-page-form.component';
import { Class } from 'src/app/shared/models/class/class';

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
      this.data.order = 1;
    }
  }

  override initConfig(): void {
    super.initConfig();
    this.path = Routing.CMS_CLASS.path;
    this.service = this.injector.get(ClassService);
  }
}
