import { Component, Injector } from '@angular/core';
import { finalize, switchMap, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { QuestionType } from 'src/app/shared/enums/question.enum';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { MessageBox } from 'src/app/shared/message-box/message-box.component';
import { Message } from 'src/app/shared/message-box/model/message';
import { Course } from 'src/app/shared/models/course/course';
import { Lesson } from 'src/app/shared/models/lesson/lesson';
import { PracticeTest } from 'src/app/shared/models/lesson/practice-test';
import { TestingDraft } from 'src/app/shared/models/lesson/testing-draft';
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

  practiceTests: PracticeTest[] = [];

  draft: TestingDraft = null;

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

    window.onbeforeunload = function () {
      return confirm("Confirm refresh");
    };
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    window.onbeforeunload = null;
  }

  load() {
    this.isLoading = true;
    // this.testingService
    //   .getDraft(this.lesson.id)
    //   .pipe(
    //     takeUntil(this._onDestroySub),
    //     switchMap(resp => {
    //       if (resp.code == 'success') {
    //         this.draft = resp.data;
    //       }
    //       return this.lessonClientService.getLessonById(this.lesson.id, this.course.id)
    //     }),
    //     finalize(() => this.isLoading = false)
    //   );
    this.lessonClientService
      .getLessonById(this.lesson.id, this.course.id)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.lesson = resp.data;
          this.setExercises();
          // this.saveDraftInterval();
        }
      })
  }

  saveDraftInterval() {
    setInterval(() => {
      console.log('saving draft...', this.practiceTests);
      this.testingService
        .saveDraft(this.lesson.id, { exerciseDrafts: this.practiceTests })
        .subscribe();
    }, 60000);
  }

  setExercises() {
    if (this.lesson && this.lesson.exercises && this.lesson.exercises.length) {
      for (let i = 0; i < this.lesson.exercises.length; i++) {
        const ex = this.lesson.exercises[i];
        const prac = new PracticeTest();
        prac.exerciseId = ex.id;
        prac.anwserJson = '';
        prac.anwsers = [];
        prac.index = i;

        switch (ex.type) {
          case QuestionType.DIEN_KHUYET:
            ex.anwsers = JSON.parse(ex.anwserJson);
            prac.anwsers = Array(ex.anwsers.length).fill('');
            break;
          case QuestionType.GACH_DUOI:
          case QuestionType.KHOANH_TRON:
            ex.anwsers = JSON.parse(ex.anwserJson);
            prac.anwsers = Array(ex.anwsers.length).fill(false);
            break;
          case QuestionType.SAP_XEP:
            ex.questionJson = 'Sắp xếp các từ sau thành câu hoàn chỉnh';
            break;
        }

        this.practiceTests.push(prac);
      }
    }
    // if (this.draft) {
    //   this.practiceTests = JSON.parse(JSON.stringify(this.draft));
    // }

    console.log(this.practiceTests);
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

    console.log(this.practiceTests);
  }

  buildAnswer(index) {
    const prac = this.practiceTests[index];
    switch (this.lesson.exercises[index].type) {
      case QuestionType.DIEN_KHUYET:
        if (prac.anwsers.findIndex(x => !StringHelper.isNullOrEmpty(x)) == -1) {
          prac.anwserJson = '';
        }
        else {
          prac.anwserJson = JSON.stringify(prac.anwsers);
        }
        break;
      case QuestionType.GACH_DUOI:
      case QuestionType.KHOANH_TRON:
        if (prac.anwsers.findIndex(x => x == true) == -1) {
          prac.anwserJson = '';
        }
        else {
          prac.anwserJson = JSON.stringify(prac.anwsers);
        }
        break;
      case QuestionType.SAP_XEP:
        break;
    }
    console.log(prac);
  }

  completed() {
    const possibleComplete = this.practiceTests.findIndex(x => !StringHelper.isNullOrEmpty(x.anwserJson)) != -1;
    if (!possibleComplete) {
      SnackBar.danger(new SnackBarParameter(this, 'Lỗi', 'Vui lòng làm bài trước khi kiểm tra kết quả'));
      return;
    }

    const uncompleted = this.practiceTests.findIndex(x => StringHelper.isNullOrEmpty(x.anwserJson)) != -1;
    if (uncompleted) {
      MessageBox.confirm(new Message(this, { content: 'Bạn chưa hoàn thành đầy đủ bài tập. Bạn có chắc chắn muốn kết thúc?' }, () => {
        console.log('confirm');
      }));
      return;
    }

    console.log(this.practiceTests);
    console.log(JSON.stringify(this.practiceTests));
  }
}
