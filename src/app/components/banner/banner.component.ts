import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { Banner } from 'src/app/shared/models/banner/banner';
import { BannerService } from 'src/app/shared/services/banner/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent extends BaseComponent implements AfterViewInit {

  banner = new Banner();

  time = 2000;

  currentIndex = 0;

  iid: any;

  constructor(
    injector: Injector,
    public bannerService: BannerService
  ) {
    super(injector);
  }
  ngAfterViewInit(): void {
  }

  override ngOnDestroy(): void {
    clearInterval(this.iid);
    super.ngOnDestroy();
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
          setTimeout(() => {
            this.startAutoSlide();
          }, 50);
        }
      });
  }

  defClass = (startPos, index) => {
    const imgs = document.querySelectorAll(".image-container img");
    for (let i = startPos; i < this.banner.imageUrls.length; i++) {
      (imgs[i] as any).style.display = "none";
    }
    (imgs[index] as any).style.display = "block";
  };

  startAutoSlide = () => {
    this.defClass(1, 0);
    this.iid = setInterval(() => {
      this.currentIndex >= this.banner.imageUrls.length - 1 ? this.currentIndex = 0 : this.currentIndex++;
      this.defClass(0, this.currentIndex);
    }, this.time);
  };
}
