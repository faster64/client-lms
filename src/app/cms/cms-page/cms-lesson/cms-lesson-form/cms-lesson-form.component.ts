import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { BaseUploaderComponent } from 'src/app/shared/components/micro/uploader/uploader.component';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { FormMode } from 'src/app/shared/enums/form-mode.enum';
import { ExerciseType } from 'src/app/shared/enums/exercise.enum';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { Course } from 'src/app/shared/models/course/course';
import { Exercise } from 'src/app/shared/models/lesson/exercise';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { LessonService } from 'src/app/shared/services/lesson/lesson.service';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';
import { CmsFormComponent } from '../../cms-page-form.component';

@Component({
  selector: 'app-cms-lesson-form',
  templateUrl: './cms-lesson-form.component.html',
  styleUrls: ['./cms-lesson-form.component.scss']
})
export class CmsLessonFormComponent extends CmsFormComponent implements AfterViewInit {

  mode = 'docs';

  courses: Course[] = [];

  fetchingCourse = false;

  LessonService = LessonService;

  QuestionType = ExerciseType;

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
      this.data.exercises[i].answers = JSON.parse(this.data.exercises[i].answerJson);
    }
    this.getCourses();
  }

  override beforeSave(): void {
    for (let i = 0; i < this.data.exercises.length; i++) {
      const ex = this.data.exercises[i] as Exercise;
      if (ex.type == ExerciseType.DIEN_KHUYET || ex.type == ExerciseType.SAP_XEP) {
        ex.answers = ex.answers.filter(x => !StringHelper.isNullOrEmpty(x));
      }
      ex.answerJson = JSON.stringify(ex.answers);
    }
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
    if (exercise.type == ExerciseType.GACH_DUOI || exercise.type == ExerciseType.KHOANH_TRON) {
      exercise.answers = [{ text: '', value: false }, { text: '', value: false }, { text: '', value: false }, { text: '', value: false }];
    } else if (exercise.type == ExerciseType.DIEN_KHUYET) {
      exercise.answers = [""];
    } else {
      exercise.answers = [""];
    }
  }

  addQuestion() {
    this.data.exercises.push(
      {
        type: ExerciseType.DIEN_KHUYET,
        answers: [""]
      },
    );
    setTimeout(() => {
      var content = document.querySelector('.cms-content-middle');
      window.scrollTo(0, 0);
    }, 100);
  }

  removeQuestion(index) {
    this.data.exercises.splice(index, 1);
  }

  addanswer(index) {
    this.data.exercises[index].answers.push("");
  }

  addTaganswer(index) {
    this.data.exercises[index].answers.push("");
  }

  onAnsChanged(exercise: Exercise, index, event) {
    exercise.answers[index] = event.value;
    setTimeout(() => {
      exercise.answers.push("");
    }, 200);
  }

  removeAns(exercise: Exercise, index) {
    if (exercise.answers.length <= 1) {
      SnackBar.warning(new SnackBarParameter(this, 'Cảnh báo', 'Phải có ít nhất 1 đáp án'));
      return;
    }
    exercise.answers.splice(index, 1);
  }

  imageSelected(event, exercise: Exercise) {
    exercise.image = event.fileNames[0];
  }

  removeImageAttachment(event, exercise: Exercise) {
    event.stopPropagation();
    event.preventDefault();

    exercise.image = '';
    exercise.imageUrl = '';
  }

  audioSelected(event, exercise: Exercise) {
    exercise.audio = event.fileNames[0];
  }

  removeAudioAttachment(event, exercise: Exercise) {
    event.stopPropagation();
    event.preventDefault();

    exercise.audio = '';
    exercise.audioUrl = '';
  }

  openAttachment(url) {
    window.open(url, '_blank');
  }

}
