import { Directive, Injector, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component";
import { FormMode } from "src/app/shared/enums/form-mode.enum";
import { ColumnGrid } from "src/app/shared/models/grid/column-grid";
import { BaseService } from "src/app/shared/services/base/base.service";
import { CmsFeatureComponent } from "../cms-feature/cms-feature.component";
import { finalize, takeUntil } from "rxjs";
import { PublisherService } from "src/app/shared/services/base/publisher.service";

@Directive()
export class CmsFormComponent extends BaseComponent {

    FormMode = FormMode;

    displayColumns: ColumnGrid[] = [];

    formMode = FormMode.View;

    id = '';

    data: any = {};

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
            this.service
                .getById(this.id)
                .pipe(
                    takeUntil(this._onDestroySub),
                    finalize(() => this.isLoading = false)
                )
                .subscribe(resp => {
                    if (resp.code == 'success') {
                        this.data = resp.data ?? {};
                    }
                })
        }
    }

    cancel() {
        throw new Error('Method not implemented.');
    }

    save() {
        throw new Error('Method not implemented.');
    }
}
