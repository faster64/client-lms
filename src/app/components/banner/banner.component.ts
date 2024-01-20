import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, AfterViewInit {

  slideIndex = 0;

  delay = 3000;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.showSlides();
  }

  showSlides() {
    const slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
      (slides[i] as any).style.display = "none";
    }
    if (++this.slideIndex >= slides.length) {
      this.slideIndex = 0
    }
    (slides[this.slideIndex] as any).style.display = "block";

    setTimeout(() => {
      this.showSlides();
    }, this.delay);
  }
}
