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
import { KeoThaAnswerModel } from 'src/app/shared/models/lesson/exercise';
import { KeyValue } from 'src/app/shared/models/lesson/key-value';
import { Lesson } from 'src/app/shared/models/lesson/lesson';
import { SapXep } from 'src/app/shared/models/lesson/sap-xep';
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
      .getLessonById(this.lesson.id, this.course.id, true)
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
        let length = 0;

        switch (ex.type) {
          case ExerciseType.DIEN_KHUYET:
            length = ex.dienKhuyetAnswer.length;
            break;
          case ExerciseType.GACH_DUOI:
            length = ex.gachDuoiAnswer.length;
            break;
          case ExerciseType.KHOANH_TRON:
            length = ex.khoanhTronAnswer.length;
            break;
          case ExerciseType.SAP_XEP:
            length = ex.sapXepAnswer.length;
            ex.questionJson = 'Sắp xếp các từ sau thành câu hoàn chỉnh';
            break;
        }

        let array = this.initAnswerArray(ex.type, length);
        if (ex.type == ExerciseType.SAP_XEP) {
          array = Utility.shuffle([...ex.sapXepAnswer]).map((x, index) => {
            const item = new SapXep();
            item.index = index;
            item.value = x;
            item.disabled = false;
            return item;
          });
        }

        this.formData.exerciseWithAnswers.push({
          exercise: ex,
          answer: {
            exerciseId: ex.id,
            answerJson: '',
            dienKhuyetAnswerArray: ex.type == ExerciseType.DIEN_KHUYET ? array : [],
            gachDuoiAnswerArray: ex.type == ExerciseType.GACH_DUOI ? array : [],
            khoanhTronAnswerArray: ex.type == ExerciseType.KHOANH_TRON ? array : [],
            sapXepAnswerArray: ex.type == ExerciseType.SAP_XEP ? array : [],
            sapXepAnswerArray2: []
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
        const arr = Array<KeyValue>(length);
        for (let i = 0; i < arr.length; i++) {
          arr[i] = { text: '', value: false };
        }
        return arr;

      case ExerciseType.SAP_XEP:
        return Array(length).fill({});
      case ExerciseType.KEO_THA:
        return Array(length).fill(new KeoThaAnswerModel());
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

  dienKhuyetChanged(ewa: ExerciseWithAnswer, index: number) {
    if (ewa.answer.dienKhuyetAnswerArray.findIndex(s => !StringHelper.isNullOrEmpty(s)) == -1) {
      ewa.answer.answerJson = '';
    }
    else {
      const json = JSON.stringify(ewa.answer.dienKhuyetAnswerArray)
      ewa.answer.answerJson = json == '[]' ? '' : json;
    }
  }

  radioChanged(ewa: ExerciseWithAnswer, j: number) {
    if (ewa.exercise.type == ExerciseType.GACH_DUOI && !ewa.exercise.multiCorrectAnswers) {
      ewa.answer.gachDuoiAnswerArray = Array<KeyValue>(ewa.exercise.gachDuoiAnswer.length).fill({ text: '', value: false });
      ewa.answer.gachDuoiAnswerArray[j] = { text: '', value: true };

    } else if (ewa.exercise.type == ExerciseType.KHOANH_TRON && !ewa.exercise.multiCorrectAnswers) {
      ewa.answer.khoanhTronAnswerArray = Array<KeyValue>(ewa.exercise.khoanhTronAnswer.length).fill({ text: '', value: false });
      ewa.answer.khoanhTronAnswerArray[j] = { text: '', value: true };
    }
    this.buildOneAnswer(ewa);
  }

  sapxep_choose(ewa: ExerciseWithAnswer, j: number) {
    if (ewa.answer.sapXepAnswerArray[j].disabled) {
      return;
    }
    ewa.answer.sapXepAnswerArray[j].disabled = true;
    ewa.answer.sapXepAnswerArray2.push(ewa.answer.sapXepAnswerArray[j]);

    this.buildOneAnswer(ewa);
  }

  sapxep_remove(ewa: ExerciseWithAnswer, j: number) {
    const index = ewa.answer.sapXepAnswerArray2[j].index;
    ewa.answer.sapXepAnswerArray[index].disabled = false;
    ewa.answer.sapXepAnswerArray2.splice(j, 1);

    this.buildOneAnswer(ewa);
  }

  buildOneAnswer(ewa: ExerciseWithAnswer) {
    switch (ewa.exercise.type) {
      case ExerciseType.DIEN_KHUYET:
        if (ewa.answer.dienKhuyetAnswerArray.findIndex(s => !StringHelper.isNullOrEmpty(s)) == -1) {
          ewa.answer.answerJson = '';
        }
        else {
          const json = JSON.stringify(ewa.answer.dienKhuyetAnswerArray)
          ewa.answer.answerJson = json == '[]' ? '' : json;
        }
        break;
      case ExerciseType.GACH_DUOI:
        if (ewa.answer.gachDuoiAnswerArray.findIndex(e => e.value == true) == -1) {
          ewa.answer.answerJson = '';
        }
        else {
          ewa.answer.answerJson = JSON.stringify(ewa.answer.gachDuoiAnswerArray);
        }
        break;
      case ExerciseType.KHOANH_TRON:
        if (ewa.answer.khoanhTronAnswerArray.findIndex(e => e.value == true) == -1) {
          ewa.answer.answerJson = '';
        }
        else {
          ewa.answer.answerJson = JSON.stringify(ewa.answer.khoanhTronAnswerArray);
        }
        break;
      case ExerciseType.SAP_XEP:
        ewa.answer.answerJson = ewa.answer.sapXepAnswerArray2.map(e => e.value).join('@@@');
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
