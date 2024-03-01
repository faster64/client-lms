import { Component } from '@angular/core';
import { GirdComponent } from 'src/app/shared/components/element/grid/gird.component';

@Component({
  selector: 'app-student-grid-report',
  templateUrl: './student-grid-report.component.html',
  styleUrls: ['./student-grid-report.component.scss']
})
export class StudentGridReportComponent extends GirdComponent {


  override setPaginator(): void {
  }

  override setSearchPlaceholder(): void {
  }

  override getOffset(): void {
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
}
