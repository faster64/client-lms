import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { ExerciseType } from 'src/app/shared/enums/exercise.enum';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { MessageBox } from 'src/app/shared/message-box/message-box.component';
import { Message } from 'src/app/shared/message-box/model/message';
import { Course } from 'src/app/shared/models/course/course';
import { Lesson } from 'src/app/shared/models/lesson/lesson';
import { ExerciseWithAnswer, TestingFormData } from 'src/app/shared/models/lesson/testing-form-data';
import { LessonClientService } from 'src/app/shared/services/lesson/lesson-client.service';
import { TestingService } from 'src/app/shared/services/lesson/testing-service';
import { Utility } from 'src/app/shared/utility/utility';

@Component({
  selector: 'app-course-lesson-test',
  templateUrl: './course-lesson-test.component.html',
  styleUrls: ['./course-lesson-test.component.scss']
})
export class CourseLessonTestComponent extends BaseComponent {

  ExerciseType = ExerciseType;

  course = new Course();

  lesson = new Lesson();

  formData = new TestingFormData();

  currentExerciseIndex = 0;

  showAudio = true;

  constructor(
    injector: Injector,
    public router: Router,
    public lessonClientService: LessonClientService,
    public testingService: TestingService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.course.id = this.activatedRoute.snapshot.params['courseId'];
    this.lesson.id = this.activatedRoute.snapshot.params['lessonId'];
    this.check();

    window.onbeforeunload = function () {
      return confirm("Confirm refresh");
    };
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    window.onbeforeunload = null;
  }

  check() {
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
            console.log(resp.data);
            this.router.navigateByUrl(`/${Routing.COURSE_LESSON_RESULT.path}/${this.course.id}/${this.lesson.id}`);
          }
          else {
            this.load();
          }
        }
      });
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
          case ExerciseType.DIEN_KHUYET:
            break;
          case ExerciseType.GACH_DUOI:
          case ExerciseType.KHOANH_TRON:
            break;
          case ExerciseType.SAP_XEP:
            ex.questionJson = 'Sắp xếp các từ sau thành câu hoàn chỉnh';
            break;
        }

        let array = this.initAnswerArray(ex.type, ex.answers.length);
        if (ex.type == ExerciseType.SAP_XEP) {
          array = Utility.shuffle([...ex.answers]).map((x, index) => {
            return {
              index: index,
              value: x,
              disabled: false
            };
          });
        }

        console.log(array);
        this.formData.exerciseWithAnswers.push({
          exercise: ex,
          answer: {
            answerJson: '',
            answerArray: array,
            studentAnswerArray: [],
            exerciseId: ex.id
          },
        });
      }
    }
  }

  initAnswerArray(type: ExerciseType, length: number) {
    switch (type) {
      case ExerciseType.DIEN_KHUYET:
        return Array(length).fill('');

      case ExerciseType.GACH_DUOI:
      case ExerciseType.KHOANH_TRON:
        return Array(length).fill(false);

      case ExerciseType.SAP_XEP:
        return Array(length).fill({});
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

  radioChanged(ewa: ExerciseWithAnswer, j: number) {
    if ([ExerciseType.GACH_DUOI, ExerciseType.KHOANH_TRON].includes(ewa.exercise.type) && !ewa.exercise.multiCorrectAnswers) {
      ewa.answer.answerArray = Array(ewa.exercise.answers.length).fill(false);
      ewa.answer.answerArray[j] = true;
    }
    this.buildOneAnswer(ewa);
  }

  sapxep_choose(ewa: ExerciseWithAnswer, j: number) {
    ewa.answer.answerArray[j].disabled = true;
    ewa.answer.studentAnswerArray.push(ewa.answer.answerArray[j]);

    this.buildOneAnswer(ewa);
  }

  sapxep_remove(ewa: ExerciseWithAnswer, j: number) {
    const index = ewa.answer.studentAnswerArray[j].index;
    ewa.answer.answerArray[index].disabled = false;
    ewa.answer.studentAnswerArray.splice(j, 1);

    this.buildOneAnswer(ewa);
  }

  buildOneAnswer(ewa: ExerciseWithAnswer) {
    switch (ewa.exercise.type) {
      case ExerciseType.DIEN_KHUYET:
        if (ewa.answer.answerArray.findIndex(e => !StringHelper.isNullOrEmpty(e)) == -1) {
          ewa.answer.answerJson = '';
        }
        else {
          const json = JSON.stringify(ewa.answer.answerArray)
          ewa.answer.answerJson = json == '[]' ? '' : json;
        }
        break;
      case ExerciseType.GACH_DUOI:
      case ExerciseType.KHOANH_TRON:
        if (ewa.answer.answerArray.findIndex(e => e == true) == -1) {
          ewa.answer.answerJson = '';
        }
        else {
          ewa.answer.answerJson = JSON.stringify(ewa.answer.answerArray);
        }
        break;
      case ExerciseType.SAP_XEP:
        ewa.answer.answerJson = ewa.answer.studentAnswerArray.map(e => e.value).join('@@@');
        break;
      default:
        ewa.answer.answerJson = '';
    }
  }

  buildAllAnswer() {
    for (let i = 0; i < this.formData.exerciseWithAnswers.length; i++) {
      const ewa = this.formData.exerciseWithAnswers[i];
      this.buildOneAnswer(ewa);
    }
    console.log(this.formData);
  }

  submit() {
    this.buildAllAnswer();

    const uncompleteds = this.formData.exerciseWithAnswers.filter(x => StringHelper.isNullOrEmpty(x.answer.answerJson));
    if (uncompleteds.length > 0) {
      MessageBox.confirm(new Message(this, { content: `Vẫn còn ${uncompleteds.length} câu bạn chưa làm. Bạn có chắc chắn muốn kết thúc?` }, () => {
        this.send();
      }));
      return;
    }
    this.send();
  }

  send() {
    this.isLoading = true;
    this.testingService
      .submit(this.formData)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.router.navigateByUrl(`/${Routing.COURSE_LESSON_CONGRATULATION.path}/${this.course.id}/${this.lesson.id}`);
        }
      });
  }
}
