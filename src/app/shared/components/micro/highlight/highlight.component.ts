import { Component, Input, OnInit } from '@angular/core';

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
      return '<span></span>';

    if (this.highlightWord.trim() == '')
      return `<span>${this.value}</span>`;

    this.highlightWord = this.highlightWord.toLocaleLowerCase();
    const splits = this.value.toLocaleLowerCase().split(this.highlightWord);
    if (splits.length > 1) {
      let html = '';
      let start = 0;
      for (let i = 0; i < splits.length; i++) {
        const ele = splits[i].toLocaleLowerCase();
        if (ele == this.highlightWord) {
          html += `<span class='highlight'>${this.value.substring(start, start + ele.length)}</span>`;
        } else {
          html += `<span>${this.value.substring(start, start + ele.length)}</span>`;
        }
        start += ele.length;
      }
      return html;
    }

    return `<span>${this.value}</span>`;
  }
}
