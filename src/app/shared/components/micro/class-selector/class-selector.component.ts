import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { ClassService } from 'src/app/shared/services/class/class.service';
import { BaseComponent } from '../../base-component';
import { finalize, takeUntil } from 'rxjs';

@Component({
  selector: 'app-class-selector',
  templateUrl: './class-selector.component.html',
  styleUrls: ['./class-selector.component.scss']
})
export class ClassSelectorComponent extends BaseComponent {

  fetchingClass = false;

  classes = [];

  value = '';

  @Input()
  disabled = false;

  @Input()
  height = -1;

  @Output()
  onValueChanged = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public classService: ClassService
  ) {
    super(injector)
  }

  getClassList() {
    this.fetchingClass = true;
    this.classService.all()
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.fetchingClass = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.classes = [];
          for (let i = 0; i < resp.data.length; i++) {
            this.classes = resp.data.sort((a, b) => a.name.localeCompare(b.name));
          }
        }
      })
  }

  emit(event) {
    this.value = event.value;
    this.onValueChanged.emit({
      source: this.classes,
      current: event.value
    })
  }
}
