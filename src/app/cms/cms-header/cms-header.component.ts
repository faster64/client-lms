import { Component, Input, OnInit } from '@angular/core';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';

@Component({
  selector: 'app-cms-header',
  templateUrl: './cms-header.component.html',
  styleUrls: ['./cms-header.component.scss']
})
export class CmsHeaderComponent implements OnInit {

  label = '';

  constructor(public publisher: PublisherService) { }

  ngOnInit(): void {
    this.publisher.updateCmsHeaderLabelEvent.subscribe(l => this.label = l);
  }

}
