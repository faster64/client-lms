import { Component, Injector } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { SortModel } from 'src/app/shared/models/base/sort-model';
import { CourseClientService } from 'src/app/shared/services/course/course-client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent {

  courses = [];

  current = 0;

  total = 0;

  count = 4;

  constructor(
    injector: Injector,
    public courseClientService: CourseClientService
  ) {
    super(injector);
  }

  override initData(): void {
    super.initData();

    this.paginationRequest.size = this.count;
    this.paginationRequest.sort = new SortModel('createdDate', false);
    this.loadCourses();
  }

  loadCourses() {
    this.isLoading = true;
    this.courseClientService
      .paging(this.paginationRequest)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.courses = this.courses.concat(resp.data);
          this.current = this.courses.length;
          this.total = resp.total;
        }
      })
  }

  viewMore() {
    this.paginationRequest.number++;
    this.loadCourses();
  }
}
