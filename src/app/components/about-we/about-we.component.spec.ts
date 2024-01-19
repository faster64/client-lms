import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutWeComponent } from './about-we.component';

describe('AboutWeComponent', () => {
  let component: AboutWeComponent;
  let fixture: ComponentFixture<AboutWeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutWeComponent]
    });
    fixture = TestBed.createComponent(AboutWeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
