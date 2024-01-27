import { Directive, Injector, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component";
import { FormMode } from "src/app/shared/enums/form-mode.enum";
import { ColumnGrid } from "src/app/shared/models/grid/column-grid";
import { BaseService } from "src/app/shared/services/base/base.service";
import { CmsFeatureComponent } from "../cms-feature/cms-feature.component";
import { finalize, takeUntil } from "rxjs";
import { PublisherService } from "src/app/shared/services/base/publisher.service";
import { MessageBox } from "src/app/shared/message-box/message-box.component";
import { Message } from "src/app/shared/message-box/model/message";
import { TranslationService } from "src/app/shared/services/translation/translation.service";
import { SnackBar } from "src/app/shared/snackbar/snackbar.component";
import { SnackBarParameter } from "src/app/shared/snackbar/snackbar.param";
import { FormModeText } from "src/app/shared/constants/form-mode.constant";
import { BaseModel } from "src/app/shared/models/base/base-model";
import { ServiceResult } from "src/app/shared/models/base/service-result";

@Directive()
export class CmsFormComponent extends BaseComponent {

  FormMode = FormMode;

  displayColumns: ColumnGrid[] = [];

  formMode = FormMode.View;

  id = '';

  data: any = {};

  path = '';

  service: BaseService;

  router: Router;

  publisher: PublisherService;

  @ViewChild("cmsFeature")
  cmsFeature: CmsFeatureComponent;

  constructor(
    injector: Injector
  ) {
    super(injector);
  }


  override ngOnInit(): void {
    super.ngOnInit();
    this.initConfig();
    this.loadData();
  }

  override initServices(): void {
    super.initServices();
    this.router = this.injector.get(Router);
    this.publisher = this.injector.get(PublisherService);
  }

  initConfig() {
    this.service = this.injector.get(BaseService);
    this.formMode = this.activatedRoute.snapshot.data['formMode'];

    if (this.formMode == FormMode.Add) {
      this.publisher.updateCmsHeaderLabelEvent.emit('Thêm mới');
    } else if (this.formMode == FormMode.Update) {
      this.publisher.updateCmsHeaderLabelEvent.emit('Cập nhật thông tin');
    } else if (this.formMode == FormMode.View) {
      this.publisher.updateCmsHeaderLabelEvent.emit('Thông tin chi tiết');
    }
  }

  loadData() {
    if (this.formMode != FormMode.Add) {
      this.id = this.activatedRoute.snapshot.params['id'];
      this.isLoading = true;
      this.service
        .byId(this.id)
        .pipe(
          takeUntil(this._onDestroySub),
          finalize(() => this.isLoading = false)
        )
        .subscribe(resp => {
          if (resp.code == 'success') {
            resp.data = this.filterResponse(resp.data);
            this.data = resp.data ?? {};
          }
          this.loaded();
        });
    }
  }

  filterResponse = (data) => data;

  loaded = () => { };

  validate = () => true;

  cancel = () => this.router.navigateByUrl(this.path);

  update = () => this.router.navigateByUrl(`${this.path}/${FormModeText.UPDATE}/${this.id}`);

  beforeSave() { }

  afterSave(resp: ServiceResult) {
    if (resp.code == 'success') {
      const id = this.formMode == FormMode.Add ? resp.data : this.id;
      const message = TranslationService.VALUES['data_messages'][this.formMode == FormMode.Add ? 'save_success_msg' : 'update_success_msg'];
      SnackBar.success(new SnackBarParameter(this, message));

      this.router.navigateByUrl(`/${this.path}/${FormModeText.VIEW}/${id}`);
    }
  }

  save() {
    const valid = this.validate();
    if (!valid) {
      this.cmsFeature.saveBtn.finish();
      return;
    }

    this.beforeSave();

    this.isLoading = true;
    const api = this.formMode == FormMode.Add ? this.service.save(this.data) : this.service.update(this.data);

    api.pipe(
      takeUntil(this._onDestroySub),
      finalize(() => {
        this.isLoading = false;
        this.cmsFeature.saveBtn.finish();
      })
    ).subscribe(resp => {
      this.afterSave(resp);
    })
  }

  delete() {
    MessageBox.delete(new Message(this, { content: TranslationService.VALUES['warnings']['delete_warning_msg'] }, () => {
      this.isLoading = true;
      this.service
        .delete([this.id])
        .pipe(
          takeUntil(this._onDestroySub),
          finalize(() => this.isLoading = false)
        )
        .subscribe(resp => {
          if (resp.code == 'success') {
            SnackBar.success(new SnackBarParameter(this, TranslationService.VALUES['data_messages']['delete_success_msg']));
            this.cancel();
          }
        });
    }));
  }
}
