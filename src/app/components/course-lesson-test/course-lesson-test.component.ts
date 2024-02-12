import { Component, Injector } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { Course } from 'src/app/shared/models/course/course';
import { Lesson } from 'src/app/shared/models/lesson/lesson';
import { LessonClientService } from 'src/app/shared/services/lesson/lesson-client.service';

@Component({
  selector: 'app-course-lesson-test',
  templateUrl: './course-lesson-test.component.html',
  styleUrls: ['./course-lesson-test.component.scss']
})
export class CourseLessonTestComponent extends BaseComponent {

  course = new Course();

  lesson = new Lesson();

  constructor(
    injector: Injector,
    public lessonClientService: LessonClientService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.course.id = this.activatedRoute.snapshot.params['courseId'];
    this.lesson.id = this.activatedRoute.snapshot.params['lessonId'];
    this.load();
  }

  load() {
    this.isLoading = true;
    this.lessonClientService
      .getLessonById(this.lesson.id, this.course.id)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.lesson = resp.data;
        }
      })
  }
}
