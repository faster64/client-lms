import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { DxNumberBoxComponent, DxTextAreaComponent, DxTextBoxComponent } from 'devextreme-angular';
import { ClassSelectorComponent } from 'src/app/shared/components/micro/class-selector/class-selector.component';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { FormMode } from 'src/app/shared/enums/form-mode.enum';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';
import { CmsFormComponent } from '../../cms-page-form.component';
import { CourseStatus } from 'src/app/shared/enums/course-status.enum';
import { TinyEditorService } from 'src/app/shared/services/tiny-editor/tiny-editor.service';

@Component({
  selector: 'app-cms-course-form',
  templateUrl: './cms-course-form.component.html',
  styleUrls: ['./cms-course-form.component.scss']
})
export class CmsCourseFormComponent extends CmsFormComponent implements AfterViewInit {

  statuses = CourseService.Statuses;

  TinyEditorService = TinyEditorService;

  CourseStatus = CourseStatus;

  isLoadingEditor = true;

  config = this.tinyEditorService.autoResizeConfig(() => this.isLoadingEditor = false);

  @ViewChild("code")
  code!: DxTextBoxComponent;

  @ViewChild("name")
  name!: DxTextBoxComponent;

  @ViewChild("shortDescription")
  shortDescription!: DxTextBoxComponent;

  @ViewChild("price")
  price!: DxNumberBoxComponent;

  @ViewChild("description")
  description!: DxTextAreaComponent;

  @ViewChild("selector")
  selector!: ClassSelectorComponent;

  constructor(
    injector: Injector,
    public tinyEditorService: TinyEditorService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    if (this.formMode != FormMode.View) {
      this.code.instance.focus();
    }
  }

  override initConfig(): void {
    super.initConfig();
    this.path = Routing.CMS_COURSE.path;
    this.data.status = CourseStatus.CommingSoon;
    this.service = this.injector.get(CourseService);
    this.data.name = 'Khóa học ok';
    this.data.price = 12000000;
    this.data.shortDescription = '1';
    this.data.description = '1';
  }

  override loaded = () => {
    this.selector.value = this.data.classId;
    this.selector.getClassList();
  }

  override validate = () => {
    if (!this.data.image || this.data.image == '') {
      SnackBar.warning(new SnackBarParameter(this, 'Vui lòng chọn hình ảnh khóa học'));
      return false;
    }

    if (StringHelper.isNullOrEmpty(this.data.name)) {
      SnackBar.warning(new SnackBarParameter(this, 'Vui lòng nhập tên khóa học'));
      return false;
    }

    if (StringHelper.isNullOrEmpty(this.data.shortDescription)) {
      SnackBar.warning(new SnackBarParameter(this, 'Vui lòng nhập mô tả ngắn'));
      return false;
    }

    if (StringHelper.isNullOrEmpty(this.data.description)) {
      SnackBar.warning(new SnackBarParameter(this, 'Vui lòng nhập mô tả'));
      return false;
    }

    if (StringHelper.isNullOrEmpty(this.data.price)) {
      SnackBar.warning(new SnackBarParameter(this, 'Vui lòng nhập giá khóa học'));
      return false;
    }

    if (StringHelper.isNullOrEmpty(this.data.classId)) {
      SnackBar.warning(new SnackBarParameter(this, 'Vui lòng nhập lớp'));
      return false;
    }

    return true;
  };

  uploaded(event) {
    this.data.imageUrl = '';
    this.data.imageUrl = event.presignedUrls[0];
    this.data.image = event.fileNames[0];
  }

  removeImage() {
    this.data.imageUrl = '';
    this.data.image = '';
  }
}
