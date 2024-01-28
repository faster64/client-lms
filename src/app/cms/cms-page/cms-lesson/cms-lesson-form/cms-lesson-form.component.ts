import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { CmsFormComponent } from '../../cms-page-form.component';
import { FormMode } from 'src/app/shared/enums/form-mode.enum';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { LessonService } from 'src/app/shared/services/lesson/lesson.service';
import { Course } from 'src/app/shared/models/course/course';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { finalize, takeUntil } from 'rxjs';
import { BaseUploaderComponent } from 'src/app/shared/components/micro/uploader/uploader.component';
import { QuestionType } from 'src/app/shared/enums/question.enum';
import { Exercise } from 'src/app/shared/models/lesson/exercise';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';
import { StringHelper } from 'src/app/shared/helpers/string.helper';

@Component({
  selector: 'app-cms-lesson-form',
  templateUrl: './cms-lesson-form.component.html',
  styleUrls: ['./cms-lesson-form.component.scss']
})
export class CmsLessonFormComponent extends CmsFormComponent implements AfterViewInit {

  mode = 'exercise';

  courses: Course[] = [];

  fetchingCourse = false;

  LessonService = LessonService;

  QuestionType = QuestionType;

  @ViewChild("attachmentUploader")
  attachmentUploader: BaseUploaderComponent;

  constructor(
    injector: Injector,
    public courseService: CourseService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    if (this.formMode != FormMode.View) {
      this.data.exercises = [];
      this.addQuestion();
      this.data.name = 'Bài giảng về tình cảm';
      this.data.description = 'Bài giảng này đẳng cấp lắm, mua ngay!';
      this.data.testName = 'Bài kiểm tra về tình yêuuu';
      this.data.testDescription = 'tình yêuuu';
    }
  }

  override initConfig(): void {
    super.initConfig();
    this.path = Routing.CMS_LESSON.path;
    this.service = this.injector.get(LessonService);
  }

  override loaded = () => {
    for (let i = 0; i < this.data.exercises.length; i++) {
      this.data.exercises[i].anwsers = JSON.parse(this.data.exercises[i].anwserJson);
    }
    this.getCourses();
  }

  override beforeSave(): void {
    for (let i = 0; i < this.data.exercises.length; i++) {
      const ex = this.data.exercises[i] as Exercise;
      if (ex.type == QuestionType.DIEN_KHUYET || ex.type == QuestionType.SAP_XEP) {
        ex.anwsers = ex.anwsers.filter(x => !StringHelper.isNullOrEmpty(x));
      }
      ex.anwserJson = JSON.stringify(ex.anwsers);
    }

    console.log(this.data);
  }

  getCourses() {
    this.fetchingCourse = true;
    this.courseService
      .all()
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.fetchingCourse = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.courses = resp.data;
        }
      })
  }

  uploaded(event) {
    this.data.imageUrl = '';
    this.data.imageUrl = event.presignedUrls[0];
    this.data.image = event.fileNames[0];
  }

  removeImage() {
    this.data.imageUrl = '';
    this.data.image = '';
  }

  uploadedAttachment(event) {
    this.data.originFileName = event.files[0].name;
    this.data.fileUrl = event.presignedUrls[0];
    this.data.fileName = event.fileNames[0];
  }

  removeAttachment(event) {
    event.stopPropagation();
    event.preventDefault();

    this.data.originFileName = '';
    this.data.fileUrl = '';
    this.data.fileName = '';
    this.attachmentUploader.reset();
  }

  questionTypeChanged(exercise: Exercise) {
    if (exercise.type == QuestionType.GACH_DUOI || exercise.type == QuestionType.KHOANH_TRON) {
      exercise.anwsers = [{ text: '', value: false }, { text: '', value: false }, { text: '', value: false }, { text: '', value: false }];
    } else if (exercise.type == QuestionType.DIEN_KHUYET) {
      exercise.anwsers = [""];
    } else {
      exercise.anwsers = [""];
    }
  }

  addQuestion() {
    this.data.exercises.push(
      {
        type: QuestionType.DIEN_KHUYET,
        anwsers: [""]
      },
      {
        type: QuestionType.SAP_XEP,
        anwsers: [""]
      },
    );
    // setTimeout(() => {
    //   var content = document.querySelector('.cms-content-middle');
    //   content.scrollTo(0, (content as any).clientHeight);
    // }, 100);
  }

  removeQuestion(index) {
    this.data.exercises.splice(index, 1);
  }

  addAnwser(index) {
    this.data.exercises[index].anwsers.push("");
  }

  addTagAnwser(index) {
    this.data.exercises[index].anwsers.push("");
  }

  onAnsChanged(exercise: Exercise, index, event) {
    exercise.anwsers[index] = event.value;
    setTimeout(() => {
      exercise.anwsers.push("");
    }, 200);
  }

  removeAns(exercise: Exercise, index) {
    if (exercise.anwsers.length <= 1) {
      SnackBar.warning(new SnackBarParameter(this, 'Phải có ít nhất 1 đáp án'));
      return;
    }
    exercise.anwsers.splice(index, 1);
  }
}
