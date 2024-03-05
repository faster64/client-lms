import { AfterViewInit, Component, ElementRef, Injector, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { FieldType } from 'src/app/shared/enums/field-type.enum';
import { Class } from 'src/app/shared/models/class/class';
import { ColumnGrid } from 'src/app/shared/models/grid/column-grid';
import { ReportStudentByLessonModel } from 'src/app/shared/models/report/report-studen-by-lesson-model';
import { User } from 'src/app/shared/models/user/user';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { ClassService } from 'src/app/shared/services/class/class.service';
import { ReportService } from 'src/app/shared/services/report/report.service';

@Component({
  selector: 'app-student-grid-by-lesson-report',
  templateUrl: './student-grid-by-lesson-report.component.html',
  styleUrls: ['./student-grid-by-lesson-report.component.scss']
})
export class StudentGridByLessonReportComponent extends BaseComponent implements AfterViewInit, OnChanges {

  FieldType = FieldType;

  displayColumns: ColumnGrid[] = [];

  offset = 0;

  timer: any;

  current = 0;

  total = 0;

  data: ReportStudentByLessonModel[] = [];

  classes: Class[] = [];

  selectedClass = '0';

  menuData = { field: '', filters: [] };

  menuDataIndex = -1;

  typeValue = 'Thống kê số lượng học sinh theo bài học';

  @ViewChild('gridContentBody')
  gridContentBody!: ElementRef;

  @ViewChild('table')
  table!: ElementRef;

  constructor(
    injector: Injector,
    public reportService: ReportService,
    public classService: ClassService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.injector.get(PublisherService).updateCmsHeaderLabelEvent.emit('Báo cáo thống kê');
    this.initColumns();
    this.loadClasses();
  }

  ngAfterViewInit(): void {
    window.addEventListener('resize', () => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.adjustGrid();
      }, 50);
    });

    setTimeout(() => {
      this.adjustGrid();
    }, 100);
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
    this.displayColumns.push({ column: 'name', displayText: 'Họ và tên', width: 382 });
    this.displayColumns.push({ column: 'phoneNumber', displayText: 'Số điện thoại', width: 382 });
    this.displayColumns.push({ column: 'email', displayText: 'Email', width: 382 });
    this.displayColumns.push({
      column: 'className',
      displayText: 'Lớp',
      width: 382,
      filters: [],
    });
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

  loadClasses() {
    this.isLoading = true;
    this.classService.all()
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.classes = resp.data;
          this.displayColumns[3].filters = this.classes.map(x => { return { id: x.id, text: x.name }; });
          this.load();
        }
      });
  }

  load() {
    this.isLoading = true;
    this.reportService
      .getStudentByLesson(this.selectedClass)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false),
      )
      .subscribe(resp => {
        if (resp.code == 'success' && resp.data) {
          this.data = resp.data;
          this.total = resp.total;
          if (this.data && this.data.length) {
            this.data[0].collapse = false;
            for (let i = 1; i < this.data.length; i++) {
              this.data[i].collapse = true;
            }
          }
        }
      })
  }

  mapFilter(col: ColumnGrid) {
    this.menuData = {
      field: col.column,
      filters: col.filters
    }
  }

  fieldFilter(field, item, index: number) {
    console.log(field, item, index);
    if (this.menuDataIndex == index) {
      this.menuDataIndex = -1;
      this.selectedClass = '0';
    }
    else {
      this.menuDataIndex = index;
      this.selectedClass = item.id;
    }
    this.load();
  }

  navigate() {
    this.injector.get(Router).navigateByUrl(`/${Routing.CMS_REPORT.path}`);
  }
}
