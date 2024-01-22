import { AfterViewInit, Directive, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { Subject } from "rxjs";
import { PaginationRequest } from "src/app/shared/models/base/pagination-request";
import { Utility } from "src/app/shared/utility/utility";

@Directive()
export class BaseGridComponent implements OnInit, OnDestroy, AfterViewInit {

  paginationRequest = new PaginationRequest();

  Utility = Utility;

  @Input()
  isLoading = true;

  @Output()
  rowClick = new EventEmitter();

  @Output()
  rowDblClick = new EventEmitter();

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
