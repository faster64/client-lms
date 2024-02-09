import { Component, Injector } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { Class } from 'src/app/shared/models/class/class';
import { Course } from 'src/app/shared/models/course/course';
import { ClassService } from 'src/app/shared/services/class/class.service';
import { CourseClientService } from 'src/app/shared/services/course/course-client.service';
import { CourseService } from 'src/app/shared/services/course/course.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent extends BaseComponent {

  classes: Class[] = [];

  loadingClass = false;

  selectedClassId = "0";

  courses: Course[] = [];

  current = 0;

  total = 0;

  count = 4;

  constructor(
    injector: Injector,
    public classService: ClassService,
    public courseClientService: CourseClientService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.calculateCount();
    this.paginationRequest.size = this.count;

    this.loadClasses();
    this.loadCourses();
  }

  calculateCount() {
    if (window.innerWidth > 1600) {
      this.count = 4;
    }
    else if (window.innerWidth > 992 && window.innerWidth <= 1600) {
      this.count = 3;
    }
  }

  filterClass(c: Class) {
    if (this.selectedClassId == c.id) {
      return;
    }

    this.selectedClassId = c.id;
    this.courses = [];
    this.current = 0;
    this.total = 0;
    this.paginationRequest.number = 0;

    this.loadCourses();
  }

  loadClasses() {
    this.loadingClass = true;
    this.classService
      .all()
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.loadingClass = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          const all = new Class();
          all.id = '0';
          all.name = 'Tất cả';

          this.classes = [all].concat(resp.data);
        }
      });
  }

  loadCourses() {
    this.isLoading = true;
    this.courseClientService
      .getMyCoursesPaging(this.selectedClassId, this.paginationRequest)
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
      });
  }

  viewMore() {
    this.paginationRequest.number++;
    this.loadCourses();
  }
}
