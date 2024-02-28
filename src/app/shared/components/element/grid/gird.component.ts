import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DxCheckBoxComponent } from 'devextreme-angular';
import { BreakPoint } from 'src/app/shared/constants/break-point.constant';
import { IconButtonType } from 'src/app/shared/constants/button.constant';
import { FieldType } from 'src/app/shared/enums/field-type.enum';
import { ColumnGrid } from 'src/app/shared/models/grid/column-grid';
import { BaseGridComponent } from './base-grid-component';

@Component({
  selector: 'app-gird',
  templateUrl: './gird.component.html',
  styleUrls: ['./gird.component.scss']
})
export class GirdComponent extends BaseGridComponent implements OnChanges {

  FieldType = FieldType;

  IconButtonType = IconButtonType;

  searchValue = '';

  searchWidth = window.innerWidth >= BreakPoint.LG ? 320 : 200;

  searchPlaceholder = '';

  sortValue = 'Mặc định';

  checkedCount = 0;

  menuData = { field: '', filters: [] };

  menuDataIndex = -1;

  @Input()
  displayColumn: ColumnGrid[] = [];

  @Input()
  data: any[] = [];

  @Input()
  pageIndex = 0;

  @Input()
  pageSize = 0;

  @Input()
  pageSizeOptions = [20, 50, 100];

  @Input()
  current = 0;

  @Input()
  total = 0;

  @Input()
  autoAdjust = true;

  @Input()
  enabledAdd = true;

  @Input()
  enabledUpdate = true;

  @Input()
  enabledDelete = true;

  @Input()
  searchKeys = [];

  @Output()
  checkedEvent = new EventEmitter();

  @Output()
  changePageEvent = new EventEmitter();

  @Output()
  rowChange = new EventEmitter();

  @Output()
  sort = new EventEmitter();

  @Output()
  onView = new EventEmitter();

  @Output()
  onAdd = new EventEmitter();

  @Output()
  onUpdate = new EventEmitter();

  @Output()
  onDelete = new EventEmitter();

  @Output()
  onDeleteMulti = new EventEmitter();

  @Output()
  onSearch = new EventEmitter();

  @Output()
  onFieldFilter = new EventEmitter();

  @ViewChild('gridContentBody')
  gridContentBody!: ElementRef;

  @ViewChild('table')
  table!: ElementRef;

  @ViewChild("checkAll")
  checkAllInstance!: DxCheckBoxComponent;

  @ViewChild("matPaginator")
  paginator: MatPaginator;

  checkedList: boolean[] = Array(200).fill(false);

  offset = 0;

  timer: any;

  sortAscendingValue: SortValue[] = [];

  constructor(
    public cdr: ChangeDetectorRef,
  ) {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    for (let i = 0; i <= 100; i++) {
      this.sortAscendingValue[i] = new SortValue();
    };
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.setPaginator();

    window.addEventListener('resize', () => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.adjustGrid();
      }, 50);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"]) {
      setTimeout(() => {
        this.adjustGrid();
      }, 1);
    }
  }

  setSearchPlaceholder() {
    if (this.searchKeys.length) {
      this.searchPlaceholder = 'Tìm theo ' + this.searchKeys.map(x => x.text.toLowerCase()).join(', ');
    } else {
      this.searchPlaceholder = 'Tìm kiếm không khả dụng';
    }
  }

  setPaginator() {
    this.paginator._intl.itemsPerPageLabel = 'Số bản ghi mỗi trang';
  }

  setWidth(column: ColumnGrid) {
    if (!column.width || column.width < 0) {
      return {
        width: 'calc(100% - 40px)',
        minWidth: 'calc(100% - 40px)',
        maxWidth: 'calc(100% - 40px)',
      };
    }

    return {
      width: column.width + 'px',
      minWidth: column.width + 'px',
      maxWidth: column.width + 'px',
    };
  }

  /**
   * Tính toán lại width, nếu chưa full màn hình set last column dài phần còn dư
   */
  getOffset() {
    const columns = document.querySelectorAll('.column-header:not(.column-feature');
    let sumWidth = 0;

    columns.forEach((col) => {
      sumWidth += (col as HTMLElement).offsetWidth;
    });

    const offsetRemain = (this.gridContentBody.nativeElement as any).offsetWidth - sumWidth - 132;
    if (sumWidth > 0 && offsetRemain > 0) {
      this.offset =
        (columns[columns.length - 1] as HTMLElement).offsetWidth + offsetRemain;
    }
  }

  adjustGrid() {
    if (this.autoAdjust) {
      this.getOffset();
      if (this.offset === 0)
        return;

      const length = this.displayColumn.length;
      if (length > 0) {
        this.displayColumn[length - 1].width = this.offset;
      }
    }
  }


  onCheck(e: any, index: number) {
    this.checkedList[index] = e.value;
    if (e.value === false) {
      (this.checkAllInstance as any)["value"] = false;
    } else {
      (this.checkAllInstance as any)["value"] = this.isCheckedAll();
    }
    this.checkedEvent.emit();

    this.checkedCount = this.getCheckedItems().length;
  }

  onCheckAll(e: any) {
    setTimeout(() => {
      if ((this.checkAllInstance as any)["value"]) {
        for (let i = 0; i < this.checkedList.length; i++) {
          this.checkedList[i] = true;
        }
      } else {
        for (let i = 0; i < this.checkedList.length; i++) {
          this.checkedList[i] = false;
        }
      }
      this.checkedEvent.emit();
    });
  }

  private changeAllCheckBox(value: boolean) {
    if (value) {
      for (let i = 0; i < this.checkedList.length; i++) {
        this.checkedList[i] = true;
      }
    } else {
      for (let i = 0; i < this.checkedList.length; i++) {
        this.checkedList[i] = false;
      }
    }
    (this.checkAllInstance as any)["value"] = value;
    this.checkedEvent.emit();
    this.checkedCount = this.getCheckedItems().length;
  }

  checkAll = () => this.changeAllCheckBox(true);

  uncheckAll = () => this.changeAllCheckBox(false);

  isCheckedAll() {
    for (let i = 0; i < this.data.length; i++) {
      if (this.checkedList[i] === false)
        return false;
    }
    return true;
  }

  hasCheckedItem() {
    for (let i = 0; i < this.data.length; i++) {
      if (this.checkedList[i] === true)
        return true;
    }
    return false;
  }

  getCheckedItems() {
    const result = [];
    const length = this.checkedList.length < this.data.length ? this.checkedList.length : this.data.length;
    for (let i = 0; i < length; i++) {
      if (this.checkedList[i]) {
        result.push(this.data[i]);
      }
    }
    return result;
  }

  sortGrid(asc: boolean) {
    this.sort.emit({
      fieldName: 'created',
      asc: asc
    });
  }

  changePage(event: any) {
    this.changePageEvent.emit(event);
  }

  fieldFilter(field, item, index: number) {
    if (this.menuDataIndex == index) {
      this.menuDataIndex = -1;
      this.onFieldFilter.emit({ field: '' });
    }
    else {
      this.menuDataIndex = index;
      this.onFieldFilter.emit({ field: field, id: item.id, text: item.text });
    }
  }

  mapFilter(col: ColumnGrid) {
    this.menuData = {
      field: col.column,
      filters: col.filters
    }
  }

  removeDiacritics(str: string) {
    return str.trim().normalize("NFD").replace('Đ', 'D').replace('đ', 'd').replace(/[\u0300-\u036f]/g, "");
  }

  onRowChange(event) {
    this.rowChange.emit(event);
  }

  deleteMulti() {
    this.onDeleteMulti.emit();
  }
}

export class SortValue {
  public firstClick = true;
  public sortAscending = true;
}
