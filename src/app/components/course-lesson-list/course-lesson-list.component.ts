import { Component, Injector } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { SortModel } from 'src/app/shared/models/base/sort-model';
import { Course } from 'src/app/shared/models/course/course';
import { Lesson } from 'src/app/shared/models/lesson/lesson';
import { CourseClientService } from 'src/app/shared/services/course/course-client.service';
import { LessonClientService } from 'src/app/shared/services/lesson/lesson-client.service';
import { LessonService } from 'src/app/shared/services/lesson/lesson.service';

@Component({
  selector: 'app-course-lesson-list',
  templateUrl: './course-lesson-list.component.html',
  styleUrls: ['./course-lesson-list.component.scss']
})
export class CourseLessonListComponent extends BaseComponent {

  course = new Course();

  lessons: Lesson[] = [];

  current = 0;

  total = 0;

  count = 4;

  isLoadingCourse = false;

  constructor(
    injector: Injector,
    public courseClientService: CourseClientService,
    public lessonClientService: LessonClientService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.paginationRequest.size = this.count;
    this.paginationRequest.sort = new SortModel('name', true);
    this.course.id = this.activatedRoute.snapshot.params['courseId'];
    this.loadCourse();
    this.load();
  }

  loadCourse() {
    this.courseClientService
      .byId(this.course.id)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoadingCourse = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.course = resp.data;
        }
      });
  }

  load() {
    this.isLoading = true;
    this.courseClientService
      .getListLessonsPaging(this.course.id, this.paginationRequest)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.lessons = this.lessons.concat(resp.data);
          this.current = this.lessons.length;
          this.total = resp.total;
        }
      })
  }

  viewMore() {
    this.paginationRequest.number++;
    this.load();
  }
}
