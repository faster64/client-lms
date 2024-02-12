import { Component, Injector } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { SortModel } from 'src/app/shared/models/base/sort-model';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
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

  count = 2;

  initCount = 4;

  isSearchMode = false;

  searchKey = '';

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
    this.paginationRequest.sort = new SortModel('createdDate', false);
    this.loadCourses();

    this.publisher
      .searchCourseEvent
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(key => {
        this.paginationRequest.query = key;
        this.loadCourses(true);
      });
  }

  calculateCount() {
    if (window.innerWidth > 1600) {
      this.initCount = 8;
      this.count = 4;
    }
    else if (window.innerWidth > 992 && window.innerWidth <= 1600) {
      this.initCount = 6;
      this.count = 3;
    }
  }

  loadCourses(searchMode?: boolean) {
    if (searchMode) {
      this.isSearchMode = true;
      this.courses = [];
      this.paginationRequest.number = 0;
    }

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

          if (searchMode) {
            window.scrollTo(0, 0);
          }
        }
      })
  }

  viewMore() {
    this.paginationRequest.number++;
    if (this.initCount >= (this.paginationRequest.number + 1) * this.count) {
      this.paginationRequest.size = this.count;
      this.paginationRequest.number++;
    }
    this.loadCourses();
  }
}
