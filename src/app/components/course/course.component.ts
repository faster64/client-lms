import { Component, Injector, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/auth-components/login/login.component';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { ButtonColor, ButtonType } from 'src/app/shared/constants/button.constant';
import { LocalStorageKey } from 'src/app/shared/constants/localstorage-key.constant';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { Course } from 'src/app/shared/models/course/course';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent extends BaseComponent {

  @Input()
  course = new Course();

  @Input()
  includeBtn = true;

  @Input()
  toLesson = false;

  @Input()
  highlightWord = '';

  @Input()
  showPrice = true;

  constructor(
    injector: Injector,
    public publisher: PublisherService,
    public authService: AuthService,
    public dialogRef: MatDialogRef<LoginComponent>,
    public router: Router
  ) {
    super(injector);
    // this.loginCallback = this.loginCallback.bind(this);
  }

  buy(event) {
    event?.stopPropagation();
    event?.preventDefault();

    this.authService.authenticate(() => this.loginCallback());
  }

  addToCart(event, noti: boolean) {
    event?.stopPropagation();
    event?.preventDefault();

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

  loginCallback() {
    this.addToCart(null, false);
    this.router.navigateByUrl(this.Routing.CART.path);
  }

  access(event) {
    event?.stopPropagation();
    event?.preventDefault();
    this.router.navigateByUrl('/' + Routing.COURSE_LESSON_LIST.path + '/' + this.course.id);
  }
}
