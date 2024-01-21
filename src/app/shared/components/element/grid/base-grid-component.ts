import { AfterViewInit, Directive, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { Subject } from "rxjs";
import { PaginationRequest } from "src/app/shared/models/base/pagination-request";

@Directive()
export class BaseGridComponent implements OnInit, OnDestroy, AfterViewInit {

  paginationRequest = new PaginationRequest();

  @Input()
  isLoading = true;

  @Output()
  rowClick = new EventEmitter();

  @Output()
  rowDblClick = new EventEmitter();

  @Output()
  onEdit = new EventEmitter();

  public _onDestroySub: Subject<void> = new Subject<void>();

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    // unsubscribe khi destroy
    if (this._onDestroySub) {
      this._onDestroySub.next();
      this._onDestroySub.complete();
      this._onDestroySub.unsubscribe();
    }
  }
}
