import { Component, Injector } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { QuestionType } from 'src/app/shared/enums/question.enum';
import { MessageBox } from 'src/app/shared/message-box/message-box.component';
import { Message } from 'src/app/shared/message-box/model/message';
import { Course } from 'src/app/shared/models/course/course';
import { Lesson } from 'src/app/shared/models/lesson/lesson';
import { TestingFormData } from 'src/app/shared/models/lesson/testing-form-data';
import { LessonClientService } from 'src/app/shared/services/lesson/lesson-client.service';
import { TestingService } from 'src/app/shared/services/lesson/testing-service';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';

@Component({
  selector: 'app-course-lesson-test',
  templateUrl: './course-lesson-test.component.html',
  styleUrls: ['./course-lesson-test.component.scss']
})
export class CourseLessonTestComponent extends BaseComponent {

  QuestionType = QuestionType;

  course = new Course();

  lesson = new Lesson();

  formData = new TestingFormData();

  currentExerciseIndex = 0;

  showAudio = true;

  constructor(
    injector: Injector,
    public lessonClientService: LessonClientService,
    public testingService: TestingService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.course.id = this.activatedRoute.snapshot.params['courseId'];
    this.lesson.id = this.activatedRoute.snapshot.params['lessonId'];
    this.load();

    // window.onbeforeunload = function () {
    //   return confirm("Confirm refresh");
    // };
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    window.onbeforeunload = null;
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
          this.setupFormData();
        }
      })
  }

  setupFormData() {
    this.formData.lessonId = this.lesson.id;
    this.formData.exerciseWithAnswers = [];

    if (this.lesson && this.lesson.exercises && this.lesson.exercises.length) {
      for (let i = 0; i < this.lesson.exercises.length; i++) {
        const ex = this.lesson.exercises[i];
        switch (ex.type) {
          case QuestionType.DIEN_KHUYET:
            break;
          case QuestionType.GACH_DUOI:
          case QuestionType.KHOANH_TRON:
            break;
          case QuestionType.SAP_XEP:
            ex.questionJson = 'Sắp xếp các từ sau thành câu hoàn chỉnh';
            break;
        }

        this.formData.exerciseWithAnswers.push({
          exercise: ex,
          answer: {
            answerJson: '',
            answerArray: Array(ex.answers.length),
            exerciseId: ex.id
          },
        });
      }
    }
  }

  changeExercise(index) {
    if (index < 0 || index >= this.lesson.exercises.length) {
      return;
    }

    this.currentExerciseIndex = index;
    this.showAudio = false;
    setTimeout(() => {
      this.showAudio = true;
      window.scrollTo(0, 0);
    }, 100);
  }

  validateBeforeCompleted(): boolean {
    const possibleComplete = false;
    if (!possibleComplete) {
      SnackBar.danger(new SnackBarParameter(this, 'Lỗi', 'Vui lòng làm bài trước khi kiểm tra kết quả'));
      return false;
    }
    return true;
  }

  completed() {
    if (!this.validateBeforeCompleted()) {
      return;
    }

    const uncompleteds = [];
    if (uncompleteds.length > 0) {
      MessageBox.confirm(new Message(this, { content: `Vẫn còn ${uncompleteds.length} câu bạn chưa làm. Bạn có chắc chắn muốn kết thúc?` }, () => {
        console.log('confirm');
      }));
      return;
    }
  }

  answerChanged(index, event) {
    console.log(index, event);
  }
}
