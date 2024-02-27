import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { ExerciseType } from 'src/app/shared/enums/exercise.enum';
import { Course } from 'src/app/shared/models/course/course';
import { Lesson } from 'src/app/shared/models/lesson/lesson';
import { TestingResult } from 'src/app/shared/models/lesson/tesing-result';
import { LessonClientService } from 'src/app/shared/services/lesson/lesson-client.service';
import { TestingService } from 'src/app/shared/services/lesson/testing-service';

@Component({
  selector: 'app-course-lesson-result',
  templateUrl: './course-lesson-result.component.html',
  styleUrls: ['./course-lesson-result.component.scss']
})
export class CourseLessonResultComponent extends BaseComponent {

  ExerciseType = ExerciseType;

  course = new Course();

  lesson = new Lesson();

  result = new TestingResult();

  isLoadingLesson = false;

  constructor(
    injector: Injector,
    public testingService: TestingService,
    public lessonClientService: LessonClientService,
    public router: Router
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.course.id = this.activatedRoute.snapshot.params['courseId'];
    this.lesson.id = this.activatedRoute.snapshot.params['lessonId'];
    this.loadLesson();
    this.getResult();
  }

  getResult() {
    this.isLoading = true;
    this.testingService
      .getTesting(this.lesson.id)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          if (resp.data) {
            this.result = resp.data;
          }
          else {
            this.router.navigateByUrl(`/${Routing.COURSE_LESSON_TEST.path}/${this.course.id}/${this.lesson.id}`);
          }
        }
      });
  }

  loadLesson() {
    this.isLoadingLesson = true;
    this.lessonClientService
      .getLessonById(this.lesson.id, this.course.id)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoadingLesson = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.lesson = resp.data;
        }
      })
  }

}
