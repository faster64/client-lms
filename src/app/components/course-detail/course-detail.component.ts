import { Component, Injector } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { Course } from 'src/app/shared/models/course/course';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CourseClientService } from 'src/app/shared/services/course/course-client.service';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { TinyEditorService } from 'src/app/shared/services/tiny-editor/tiny-editor.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent extends BaseComponent {

  TinyEditorService = TinyEditorService;

  course = new Course();

  config = this.tinyEditorService.autoResizeConfig();

  constructor(
    injector: Injector,
    public courseClientService: CourseClientService,
    public authService: AuthService,
    public tinyEditorService: TinyEditorService
  ) {
    super(injector);
  }

  override initData(): void {
    super.initData();
    this.course.id = this.activatedRoute.snapshot.params['id'];
    this.load();
  }

  load() {
    this.isLoading = true;
    this.courseClientService
      .byId(this.course.id)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.course = resp.data;
        }
        window.scrollTo(0, 0);
      })
  }

  buy() {
    this.authService.authenticate(this.loginCallback);
  }

  loginCallback() {
    console.log('clicked');
  }
}
