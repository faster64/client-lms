import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { LocalStorageKey } from 'src/app/shared/constants/localstorage-key.constant';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { Course } from 'src/app/shared/models/course/course';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { CourseClientService } from 'src/app/shared/services/course/course-client.service';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent extends BaseComponent {

  course = new Course();

  constructor(
    injector: Injector,
    public courseClientService: CourseClientService,
    public authService: AuthService,
    public publisher: PublisherService,
    public router: Router
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

  addToCart(noti: boolean) {
    let items: Course[] = [];

    try {
      const local = JSON.parse(localStorage.getItem(LocalStorageKey.CART_ITEMS));
      items = local ? local : [];
    } catch (error) {
      localStorage.removeItem(LocalStorageKey.CART_ITEMS);
      items = [];
    }

    items = items.concat(this.course);
    localStorage.setItem(LocalStorageKey.CART_ITEMS, JSON.stringify(items));
    this.publisher.updateCartEvent.emit();

    if (noti) {
      SnackBar.success(new SnackBarParameter(this, 'Thông báo', 'Thêm vào giỏ thành công'));
    }
  }

  buy() {
    this.authService.authenticate(() => this.loginCallback());
  }

  access(event) {
    event?.stopPropagation();
    event?.preventDefault();
    this.authService.authenticate(() => {
      if (this.course.purchased) {
        this.router.navigateByUrl('/' + Routing.COURSE_LESSON_LIST.path + '/' + this.course.id);
      }
      else if (this.course.price == 0) {
        this.isLoading = true;
        this.courseClientService
          .takeFreeCourse(this.course.id)
          .pipe(
            takeUntil(this._onDestroySub),
            finalize(() => this.isLoading = false)
          )
          .subscribe(resp => {
            if (resp.code == 'success') {
              this.router.navigateByUrl('/' + Routing.COURSE_LESSON_LIST.path + '/' + this.course.id);
            }
          });
      }
    });
  }

  loginCallback() {
    this.addToCart(false);
    this.router.navigateByUrl(this.Routing.CART.path);
  }
}
