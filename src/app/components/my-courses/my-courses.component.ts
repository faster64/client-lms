import { Component, Injector } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { CourseService } from 'src/app/shared/services/course/course.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent extends BaseComponent {

  constructor(
    injector: Injector,
    public courseService: CourseService
  ) {
    super(injector);
  }
}
