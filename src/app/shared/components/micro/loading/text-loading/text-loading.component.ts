import { Component, Input } from '@angular/core';

@Component({
  selector: 'text-loading',
  templateUrl: './text-loading.component.html',
  styleUrls: ['./text-loading.component.scss']
})
export class TextLoadingComponent {

  @Input()
  text = "Đang tải dữ liệu...";

}
