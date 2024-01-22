import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CmsFormComponent } from '../../cms-page-form.component';
import { FormMode } from 'src/app/shared/enums/form-mode.enum';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { FormModeText } from 'src/app/shared/constants/form-mode.constant';
import { MessageBox } from 'src/app/shared/message-box/message-box.component';
import { Message } from 'src/app/shared/message-box/model/message';
import { TranslationService } from 'src/app/shared/services/translation/translation.service';
import { finalize, takeUntil } from 'rxjs';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';
import { DxNumberBoxComponent, DxTextAreaComponent, DxTextBoxComponent } from 'devextreme-angular';
import { CourseService } from 'src/app/shared/services/course/course.service';

@Component({
  selector: 'app-cms-course-form',
  templateUrl: './cms-course-form.component.html',
  styleUrls: ['./cms-course-form.component.scss']
})
export class CmsCourseFormComponent extends CmsFormComponent implements AfterViewInit {

  @ViewChild("name")
  name!: DxTextBoxComponent;

  @ViewChild("shortDescription")
  shortDescription!: DxTextBoxComponent;

  @ViewChild("price")
  price!: DxNumberBoxComponent;

  @ViewChild("description")
  description!: DxTextAreaComponent;

  override ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    if (this.formMode != FormMode.View) {
      this.name.instance.focus();
    }
  }

  override initConfig(): void {
    super.initConfig();
    this.path = Routing.CMS_COURSE.path;
    this.service = this.injector.get(CourseService);
  }
}
