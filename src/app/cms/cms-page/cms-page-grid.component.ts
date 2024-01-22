import { Directive, Injector, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize, takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base-component";
import { BaseGridComponent } from "src/app/shared/components/element/grid/base-grid-component";
import { GirdComponent } from "src/app/shared/components/element/grid/gird.component";
import { FormModeText } from "src/app/shared/constants/form-mode.constant";
import { MessageBox } from "src/app/shared/message-box/message-box.component";
import { Message } from "src/app/shared/message-box/model/message";
import { ColumnGrid } from "src/app/shared/models/grid/column-grid";
import { BaseService } from "src/app/shared/services/base/base.service";
import { PublisherService } from "src/app/shared/services/base/publisher.service";
import { TranslationService } from "src/app/shared/services/translation/translation.service";
import { SnackBar } from "src/app/shared/snackbar/snackbar.component";
import { SnackBarParameter } from "src/app/shared/snackbar/snackbar.param";

@Directive()
export class CmsGridComponent extends BaseComponent {

    displayColumns: ColumnGrid[] = [];
    dataSource = [];
    current = 0;
    total = 0;
    pagingUrl = '';
    service: BaseService;

    @ViewChild("grid")
    grid: GirdComponent;

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.initConfig();
        this.initColumns();
        this.loadData();
    }

    initConfig() {
        this.service = this.injector.get(BaseService);
    }

    initColumns() {
        throw new Error('Method not implemented.');
    }

    loadData() {
        this.isLoading = true;
        this.service
            .paging(this.paginationRequest)
            .pipe(
                takeUntil(this._onDestroySub),
                finalize(() => this.isLoading = false)
            )
            .subscribe(resp => {
                if (resp.code == 'success') {
                    this.dataSource = resp.data;
                    this.current = this.dataSource.length;
                    this.total = resp.total;
                }
            });
    }

    add() {
        const router = this.injector.get(Router);
        const route = this.injector.get(ActivatedRoute);

        router.navigateByUrl(`${FormModeText.ADD}`);
        router.navigate([FormModeText.ADD], { relativeTo: route });
    }

    view(item) {
        console.log(item);
    }

    update(item) {
        console.log(item)
    }

    delete(item) {
        item = item ? [item] : this.grid.getCheckedItems();
        MessageBox.delete(new Message(this, { content: TranslationService.VALUES['warnings']['delete_warning_msg'] }, () => {
            const ids = item.map(x => x.id);

            this.isLoading = true;
            this.service
                .delete(ids)
                .pipe(
                    takeUntil(this._onDestroySub),
                    finalize(() => this.isLoading = false)
                )
                .subscribe(resp => {
                    if (resp.code == 'success') {
                        SnackBar.success(new SnackBarParameter(this, TranslationService.VALUES['data_messages']['delete_success_msg']));
                        this.loadData();
                    }
                });
        }));
    }
}
