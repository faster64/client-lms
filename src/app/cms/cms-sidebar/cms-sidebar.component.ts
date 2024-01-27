import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { Routing } from 'src/app/shared/constants/routing.constant';

@Component({
  selector: 'app-cms-sidebar',
  templateUrl: './cms-sidebar.component.html',
  styleUrls: ['./cms-sidebar.component.scss']
})
export class CmsSidebarComponent extends BaseComponent {

  showTooltip = false && window.innerWidth >= 1200;

  items = [];

  constructor(
    injector: Injector,
    public router: Router
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.findModule();
  }

  override initData(): void {
    this.items = [
      {
        text: 'Banner trang chủ',
        class: 'banner',
        path: Routing.CMS_BANNER.path,
        selected: true,
      },
      {
        text: 'Quản lý khóa học',
        class: 'course',
        path: Routing.CMS_COURSE.path,
      },
      {
        text: 'Quản lý liên hệ',
        class: 'contact',
        path: Routing.CMS_TICKET.path,
      },
      {
        text: 'Quản lý tài khoản người dùng',
        class: 'user',
        path: Routing.CMS_USER.path,
      },
      {
        text: 'Quản lý tài khoản quản trị',
        class: 'admin',
        path: Routing.CMS_ADMIN.path,
      },
      {
        text: 'Quản lý lớp học',
        class: 'class',
        path: Routing.CMS_CLASS.path,
      },
      {
        text: 'Quản lý bài giảng',
        class: 'lesson',
        path: Routing.CMS_LESSON.path,
      },
      {
        text: 'Quản lý mạng xã hội',
        class: 'social',
        path: Routing.CMS_SOCIAL.path,
      },
      {
        text: 'Đơn mua hàng',
        class: 'order',
        path: Routing.CMS_ORDER.path,
      },
      {
        text: 'Hướng dẫn sử dụng',
        class: 'guide',
        path: Routing.CMS_GUIDE.path,
      },
      {
        text: 'Báo cáo thống kê',
        class: 'report',
        path: Routing.CMS_REPORT.path,
      },
    ];

    for (let i = 0; i < this.items.length; i++) {
      this.items[i].style = {
        'background-image': 'url(' + '~/src/assets/img/cms/class.svg)' + ')'
      };
    }
  }

  findModule() {
    const path = (this.activatedRoute.snapshot as any)['_routerState']['url'];
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (path.includes(item.path)) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    }
  }

  redirect = (item) => {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].selected = false;
    }
    item.selected = true;
  }

  toHome = () => this.router.navigateByUrl(Routing.HOME.path);
}
