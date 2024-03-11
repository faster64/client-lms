import { Component, Injector } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { SortModel } from 'src/app/shared/models/base/sort-model';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { CourseClientService } from 'src/app/shared/services/course/course-client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent {

  Math = Math;

  courses = [];

  current = 0;

  total = 0;

  viewMoreCount = 0;

  initCount = 0;

  resizeId: any;

  constructor(
    injector: Injector,
    public courseClientService: CourseClientService,
    public publisher: PublisherService
  ) {
    super(injector);
  }

  override initData(): void {
    super.initData();

    this.calculateCount();
    this.paginationRequest.size = this.initCount;
    this.paginationRequest.sort = new SortModel('created', false);
    this.paginationRequest.query = this.activatedRoute.snapshot.params['q'] || '';

    if (!StringHelper.isNullOrEmpty(this.paginationRequest.query)) {
      this.publisher.searchCourseEvent.emit();
    }
    this.loadCourses();
  }

  calculateCount() {
    if (window.innerWidth > 1200) {
      this.initCount = 8;
      this.viewMoreCount = 4;
    }
    else if (window.innerWidth > 992 && window.innerWidth <= 1200) {
      this.initCount = 6;
      this.viewMoreCount = 3;
    }
    else {
      this.initCount = 4;
      this.viewMoreCount = 2;
    }
  }

  loadCourses() {
    this.isLoading = true;
    this.current = 0;
    this.total = 0;
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
    this.paginationRequest.size = this.viewMoreCount;

    if ((this.paginationRequest.number + 1) * this.paginationRequest.size <= this.courses.length) {
      this.paginationRequest.number++;
    }
    this.loadCourses();
  }
}
