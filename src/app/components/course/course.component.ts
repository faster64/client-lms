import { Component, Injector, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/auth-components/login/login.component';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { ButtonColor, ButtonType } from 'src/app/shared/constants/button.constant';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent extends BaseComponent {

  @Input()
  course: any = {};

  constructor(
    injector: Injector,
    public authService: AuthService,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {
    super(injector);
  }

  buy() {
    this.authService.authenticate(() => this.dialogRef.close());
  }
}
