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
        path: 'banner',
        selected: true,
      },
      {
        text: 'Quản lý khóa học',
        class: 'course',
        path: 'khoa-hoc',
      },
      {
        text: 'Quản lý liên hệ',
        class: 'contact',
        path: 'lien-he',
      },
      {
        text: 'Quản lý tài khoản người dùng',
        class: 'user',
        path: 'quan-ly-tai-khoan-nguoi-dung',
      },
      {
        text: 'Quản lý tài khoản quản trị',
        class: 'admin',
        path: 'quan-ly-tai-khoan-quan-tri',
      },
      {
        text: 'Quản lý lớp học',
        class: 'class',
        path: 'lop-hoc',
      },
      {
        text: 'Quản lý bài giảng',
        class: 'lesson',
        path: 'bai-giang',
      },
      {
        text: 'Quản lý mạng xã hội',
        class: 'social',
        path: 'mang-xa-hoi',
      },
      {
        text: 'Đơn mua hàng',
        class: 'order',
        path: 'don-mua-hang',
      },
      {
        text: 'Hướng dẫn sử dụng',
        class: 'guide',
        path: 'huong-dan-su-dung',
      },
      {
        text: 'Báo cáo thống kê',
        class: 'report',
        path: 'bao-cao-thong-ke',
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

    this.router.navigateByUrl(Routing.CMS.path + '/' + item.path);
  }

  toHome = () => this.router.navigateByUrl(Routing.HOME.path);
}
