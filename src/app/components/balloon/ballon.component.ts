import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component';

@Component({
  selector: 'app-ballon',
  templateUrl: './ballon.component.html',
  styleUrls: ['./ballon.component.scss']
})
export class BallonComponent extends BaseComponent {


  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
