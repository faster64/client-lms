import { Component, Input, OnInit } from '@angular/core';
import { StringHelper } from 'src/app/shared/helpers/string.helper';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit {

  @Input()
  value = '';

  @Input()
  highlightWord = '';

  html = '';

  constructor() { }

  ngOnInit(): void {
    this.html = this.handle();
  }


  handle() {
    if (this.value.trim() == '')
      return '';

    if (this.highlightWord.trim() == '')
      return this.value;

    const en = StringHelper.viToEn(this.value).toLowerCase();
    const hl = this.highlightWord.toLowerCase();

    let html = "";
    let start = 0;
    while (true) {
      const end = en.indexOf(hl, start);
      if (end === -1) {
        if (html == '') {
          html = this.value;
        }
        else {
          html += this.value.substr(start);
        }
        break;
      }
      html += this.value.substr(start, end - start) + `<span class='highlight'>${this.value.substr(end, hl.length)}</span>`;
      start = end + hl.length;
    }

    return html;
  }
}
