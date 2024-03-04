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
import { Lesson } from 'src/app/shared/models/lesson/lesson';

@Component({
  selector: 'app-cms-lesson-form',
  templateUrl: './cms-lesson-form.component.html',
  styleUrls: ['./cms-lesson-form.component.scss']
})
export class CmsLessonFormComponent extends CmsFormComponent implements AfterViewInit {

  LessonService = LessonService;

  ExerciseType = ExerciseType;

  mode = 'docs';

  override data: Lesson;

  courses: Course[] = [];

  fetchingCourse = false;

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
      // this.data.name = 'Bài giảng về tình cảm';
      // this.data.description = 'Bài giảng này đẳng cấp lắm, mua ngay!';
      // this.data.testName = 'Bài kiểm tra về tình yêuuu';
      // this.data.testDescription = 'tình yêuuu';
    }
  }

  override initConfig(): void {
    super.initConfig();
    this.path = Routing.CMS_LESSON.path;
    this.service = this.injector.get(LessonService);
  }

  override loaded = () => {
    this.getCourses();
  }

  // override validate = () => {
  //   this.data.docsInvalid = '';
  //   if (StringHelper.isNullOrEmpty(this.data.courseId)) {
  //     this.mode = 'docs';
  //     this.data.docsInvalid = 'courseId';
  //     SnackBar.danger(new SnackBarParameter(this, 'Lỗi dữ liệu', 'Bạn chưa chọn khóa học'));
  //   }
  //   if (StringHelper.isNullOrEmpty(this.data.image)) {
  //     this.mode = 'docs';
  //     SnackBar.danger(new SnackBarParameter(this, 'Lỗi dữ liệu', 'Bạn chưa chọn hình ảnh khóa học'));
  //   }

  //   return false;
  // }

  override validate = () => {
    this.data.testIsValid = true;

    if (StringHelper.isNullOrEmpty(this.data.courseId)) {
      this.mode = 'docs';
      SnackBar.danger(new SnackBarParameter(this, 'Lỗi dữ liệu', 'Bạn chưa chọn khóa học'));
      return false;
    }

    if (StringHelper.isNullOrEmpty(this.data.image)) {
      this.mode = 'docs';
      SnackBar.danger(new SnackBarParameter(this, 'Lỗi dữ liệu', 'Bạn chưa chọn hình ảnh khóa học'));
      return false;
    }

    if (StringHelper.isNullOrEmpty(this.data.name)) {
      this.mode = 'docs';
      SnackBar.danger(new SnackBarParameter(this, 'Lỗi dữ liệu', 'Bạn chưa nhập tên bài giảng'));
      return false;
    }

    if (StringHelper.isNullOrEmpty(this.data.description)) {
      this.mode = 'docs';
      SnackBar.danger(new SnackBarParameter(this, 'Lỗi dữ liệu', 'Bạn chưa nhập mô tả bài giảng'));
      return false;
    }

    if (StringHelper.isNullOrEmpty(this.data.fileName)) {
      this.mode = 'docs';
      SnackBar.danger(new SnackBarParameter(this, 'Lỗi dữ liệu', 'Bạn chưa chọn file đính kèm'));
      return false;
    }

    if (StringHelper.isNullOrEmpty(this.data.testName)) {
      this.mode = 'exercise';
      // this.data.testIsValid = false;
      SnackBar.danger(new SnackBarParameter(this, 'Lỗi dữ liệu', 'Bạn chưa nhập tên bài kiểm tra'));
      return false;
    }

    if (StringHelper.isNullOrEmpty(this.data.testDescription)) {
      this.mode = 'exercise';
      // this.data.testIsValid = false;
      SnackBar.danger(new SnackBarParameter(this, 'Lỗi dữ liệu', 'Bạn chưa nhập mô tả bài kiểm tra'));
      return false;
    }
    return true;
  }

  override beforeSave(): void {
    for (let i = 0; i < this.data.exercises.length; i++) {
      const ex = this.data.exercises[i] as Exercise;
      if (ex.type == ExerciseType.DIEN_KHUYET) {
        ex.answerJson = JSON.stringify(ex.dienKhuyetAnswer);
      }
      else if (ex.type == ExerciseType.GACH_DUOI) {
        ex.answerJson = JSON.stringify(ex.gachDuoiAnswer);
      }
      else if (ex.type == ExerciseType.KHOANH_TRON) {
        ex.answerJson = JSON.stringify(ex.khoanhTronAnswer);
      }
      else if (ex.type == ExerciseType.SAP_XEP) {
        ex.answerJson = JSON.stringify(ex.sapXepAnswer);
      }
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
    if (exercise.type == ExerciseType.GACH_DUOI) {
      exercise.gachDuoiAnswer = [{ text: '', value: false }, { text: '', value: false }, { text: '', value: false }, { text: '', value: false }];
    }
    else if (exercise.type == ExerciseType.KHOANH_TRON) {
      exercise.khoanhTronAnswer = [{ text: '', value: false }, { text: '', value: false }, { text: '', value: false }, { text: '', value: false }];
    }
    else if (exercise.type == ExerciseType.DIEN_KHUYET) {
      exercise.dienKhuyetAnswer = [""];
    }
    else if (exercise.type == ExerciseType.SAP_XEP) {
      exercise.sapXepAnswer = [""];
    }
  }

  addQuestion() {
    const ex = new Exercise();
    ex.type = ExerciseType.DIEN_KHUYET;
    ex.dienKhuyetAnswer = [""];
    // ex.gachDuoiAnswer = [];
    // ex.khoanhTronAnswer = [];
    // ex.sapXepAnswer = [];

    this.data.exercises.push(ex);
    setTimeout(() => {
      var content = document.querySelector('.cms-content-middle');
      window.scrollTo(0, 0);
    }, 100);
  }

  removeQuestion(index) {
    this.data.exercises.splice(index, 1);
  }

  addDienKhuyetAnswer(index) {
    const length = this.data.exercises[index].dienKhuyetAnswer.length;
    if (length > 0 && StringHelper.isNullOrEmpty(this.data.exercises[index].dienKhuyetAnswer[length - 1])) {
      return;
    }
    this.data.exercises[index].dienKhuyetAnswer.push("");
  }

  addSapXepAnswer(index) {
    const length = this.data.exercises[index].sapXepAnswer.length;
    if (length > 0 && StringHelper.isNullOrEmpty(this.data.exercises[index].sapXepAnswer[length - 1])) {
      return;
    }
    this.data.exercises[index].sapXepAnswer.push("");
  }

  removeAns(exercise: Exercise, index) {
    if (exercise.type == ExerciseType.GACH_DUOI) {
      if (exercise.gachDuoiAnswer.length <= 1) {
        SnackBar.warning(new SnackBarParameter(this, 'Cảnh báo', 'Phải có ít nhất 1 đáp án'));
      }
      else {
        exercise.gachDuoiAnswer.splice(index, 1);
      }
    }
    else if (exercise.type == ExerciseType.KHOANH_TRON) {
      if (exercise.khoanhTronAnswer.length <= 1) {
        SnackBar.warning(new SnackBarParameter(this, 'Cảnh báo', 'Phải có ít nhất 1 đáp án'));
      }
      else {
        exercise.khoanhTronAnswer.splice(index, 1);
      }
    }
    else if (exercise.type == ExerciseType.DIEN_KHUYET) {
      if (exercise.dienKhuyetAnswer.length <= 1) {
        SnackBar.warning(new SnackBarParameter(this, 'Cảnh báo', 'Phải có ít nhất 1 đáp án'));
      }
      else {
        exercise.dienKhuyetAnswer.splice(index, 1);
      }
    }
    else if (exercise.type == ExerciseType.SAP_XEP) {
      if (exercise.sapXepAnswer.length <= 1) {
        SnackBar.warning(new SnackBarParameter(this, 'Cảnh báo', 'Phải có ít nhất 1 đáp án'));
      }
      else {
        exercise.sapXepAnswer.splice(index, 1);
      }
    }
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
