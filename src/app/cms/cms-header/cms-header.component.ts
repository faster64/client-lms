import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cms-header',
  templateUrl: './cms-header.component.html',
  styleUrls: ['./cms-header.component.scss']
})
export class CmsHeaderComponent {

  @Input()
  label = '';

}
