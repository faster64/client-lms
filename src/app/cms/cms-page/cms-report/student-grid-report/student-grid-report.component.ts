import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { FieldType } from 'src/app/shared/enums/field-type.enum';
import { ColumnGrid } from 'src/app/shared/models/grid/column-grid';

@Component({
  selector: 'app-student-grid-report',
  templateUrl: './student-grid-report.component.html',
  styleUrls: ['./student-grid-report.component.scss']
})
export class StudentGridReportComponent extends BaseComponent implements AfterViewInit, OnChanges {

  FieldType = FieldType;

  displayColumns: ColumnGrid[] = [];

  offset = 0;

  timer: any;

  current = 0;

  total = 0;

  data: any[] = [];

  @ViewChild('gridContentBody')
  gridContentBody!: ElementRef;

  @ViewChild('table')
  table!: ElementRef;

  override ngOnInit(): void {
    super.ngOnInit();
    this.initColumns();
  }

  ngAfterViewInit(): void {
    this.adjustGrid();
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

  initColumns() {
    this.displayColumns = [];
    this.displayColumns.push({ column: 'fullName', displayText: 'Họ và tên', width: 350 });
    this.displayColumns.push({ column: 'phoneNumber', displayText: 'Số điện thoại', width: 200 });
    this.displayColumns.push({ column: 'email', displayText: 'Email', width: 240 });
    this.displayColumns.push({ column: 'className', displayText: 'Lớp', width: 140 });
  }

  getOffset(): void {
    const columns = document.querySelectorAll('.column-header:not(.column-feature');
    let sumWidth = 0;

    columns.forEach((col) => {
      sumWidth += (col as HTMLElement).offsetWidth;
    });

    const offsetRemain = (this.gridContentBody.nativeElement as any).offsetWidth - sumWidth - 8;
    if (sumWidth > 0 && offsetRemain > 0) {
      this.offset =
        (columns[columns.length - 1] as HTMLElement).offsetWidth + offsetRemain;
    }
  }

  adjustGrid() {
    this.getOffset();
    if (this.offset === 0)
      return;

    const length = this.displayColumns.length;
    if (length > 0) {
      this.displayColumns[length - 1].width = this.offset;
    }
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
}
