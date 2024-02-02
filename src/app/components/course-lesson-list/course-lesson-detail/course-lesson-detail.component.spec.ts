import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonDetailComponent } from './course-lesson-detail.component';

describe('CourseLessonDetailComponent', () => {
  let component: CourseLessonDetailComponent;
  let fixture: ComponentFixture<CourseLessonDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseLessonDetailComponent]
    });
    fixture = TestBed.createComponent(CourseLessonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
