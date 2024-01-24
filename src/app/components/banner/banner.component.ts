import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BannerService } from 'src/app/shared/services/banner/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent extends BaseComponent implements AfterViewInit {

  banner: any = {};

  slideIndex = 0;

  delay = 3000;

  constructor(
    injector: Injector,
    public bannerService: BannerService
  ) {
    super(injector);
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

  override initData(): void {
    super.initData();
    this.load();
  }

  load() {
    this.isLoading = true;
    this.bannerService
      .information()
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.banner = resp.data;
        }
      });
  }
}
