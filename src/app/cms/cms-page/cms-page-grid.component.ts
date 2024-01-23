import { Directive, Injector, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize, takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base-component";
import { BaseGridComponent } from "src/app/shared/components/element/grid/base-grid-component";
import { GirdComponent } from "src/app/shared/components/element/grid/gird.component";
import { FormModeText } from "src/app/shared/constants/form-mode.constant";
import { MessageBox } from "src/app/shared/message-box/message-box.component";
import { Message } from "src/app/shared/message-box/model/message";
import { ServiceResult } from "src/app/shared/models/base/service-result";
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
  searchKeys = [];

  service: BaseService;

  router: Router;

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
    this.filterable();
    this.loadData();
  }

  override initServices(): void {
    super.initServices();
    this.router = this.injector.get(Router);
  }

  initConfig() {
    this.service = this.injector.get(BaseService);
  }

  initColumns() {
    throw new Error('Method not implemented.');
  }

  filterable() {
    this.service.http
      .get<ServiceResult>(this.service.url() + '/filterable')
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.searchKeys = resp.data;
          setTimeout(() => {
            this.grid.setSearchPlaceholder();
          }, 100);
        }
      })
  }

  filterResponse = (data) => data;

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
          resp.data = this.filterResponse(resp.data);
          this.dataSource = resp.data;
          this.current = this.dataSource.length;
          this.total = resp.total;
        }
      });
  }

  search(event) {
    this.paginationRequest.query = event;
    this.loadData();
  }

  sort(event) {
    console.log(event);
    this.paginationRequest.sort = event;
    this.loadData();
  }

  changePage(event) {
    if (event.pageSize != this.paginationRequest.size) {
      this.paginationRequest.size = event.pageSize;
      this.paginationRequest.number = 0;
    } else {
      this.paginationRequest.number = event.pageIndex;
    }

    this.loadData();
  }

  add() {
    this.router.navigate([FormModeText.ADD], { relativeTo: this.activatedRoute });
  }

  view(item) {
    this.router.navigate([FormModeText.VIEW, item.id], { relativeTo: this.activatedRoute });
  }

  update(item) {
    this.router.navigate([FormModeText.UPDATE, item.id], { relativeTo: this.activatedRoute });
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
            this.grid.uncheckAll();
            this.loadData();
          }
        });
    }));
  }
}
