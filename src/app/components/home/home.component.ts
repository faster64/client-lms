import { Component, Injector } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { SortModel } from 'src/app/shared/models/base/sort-model';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { CourseClientService } from 'src/app/shared/services/course/course-client.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent {

  courses = [];

  current = 0;

  total = 0;

  viewMoreCount = 0;

  initCount = 0;

  rows = 0;

  isSearchMode = false;

  searchKey = '';

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
    this.loadCourses();

    this.publisher
      .searchCourseEvent
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(key => {
        this.paginationRequest.query = key;
        this.loadCourses(true);
      });

    if (environment.isDemo) {
      window.onresize = (e) => {
        clearTimeout(this.resizeId);
        this.resizeId = setTimeout(() => {
          this.calculateCount();
          this.paginationRequest.size = this.initCount;
          this.paginationRequest.sort = new SortModel('created', false);
          this.loadCourses();
        }, 500);
      }
    }
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
          this.rows = this.courses.length / this.viewMoreCount;
          console.log(this.rows)

          if (searchMode) {
            window.scrollTo(0, 0);
          }
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
