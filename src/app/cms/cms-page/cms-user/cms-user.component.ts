import { Component } from '@angular/core';
import { FieldType } from 'src/app/shared/enums/field-type.enum';
import { UserState } from 'src/app/shared/enums/user-state.enum';
import { User } from 'src/app/shared/models/user/user';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { CmsGridComponent } from '../cms-page-grid.component';
import { UserClientService } from 'src/app/shared/services/user/user-client.service';
import { StringHelper } from 'src/app/shared/helpers/string.helper';

@Component({
  selector: 'app-cms-user',
  templateUrl: './cms-user.component.html',
  styleUrls: ['./cms-user.component.scss']
})
export class CmsUserComponent extends CmsGridComponent<User> {

  override ngOnInit(): void {
    this.injector.get(PublisherService).updateCmsHeaderLabelEvent.emit('Quản lý Tài khoản người dùng');
    super.ngOnInit();
  }

  override initConfig(): void {
    this.service = this.injector.get(UserClientService);
  }

  override initColumns() {
    this.displayColumns = [];
    this.displayColumns.push({ column: 'fullName', displayText: 'Họ và tên', width: 180 });
    this.displayColumns.push({ column: 'role', displayText: 'Vai trò', width: 180 });
    this.displayColumns.push({ column: 'phoneNumber', displayText: 'Số điện thoại', width: 160 });
    this.displayColumns.push({ column: 'email', displayText: 'Email', width: 180 });
    this.displayColumns.push({ column: 'className', displayText: 'Lớp', width: 120 });
    // this.displayColumns.push({ column: 'password', displayText: 'Mật khẩu', width: 140 });
    this.displayColumns.push({ column: 'created', displayText: 'Ngày tạo', width: 140, type: FieldType.Date });
    this.displayColumns.push({
      column: 'state',
      displayText: 'Trạng thái tài khoản',
      width: 220,
      type: FieldType.AccountState,
      filters: [{ id: UserState.Active, text: 'Đang hoạt động' }, { id: UserState.Inactive, text: 'Ngừng hoạt động' }],
      callback: (item, e) => console.log(item, e)
    });
  }

  override filterResponse = (data) => {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      let className = '';
      switch (item.state) {
        case UserState.Active:
          className = 'active'
          break;
        case UserState.Inactive:
          className = 'inactive'
          break;
        case UserState.Blocked:
          className = 'blocked'
          break;
        case UserState.Unconfirm:
          className = 'unconfirm'
          break;
        default:
          break;
      }
      item.stateText = `<span class='${className}'>${item.stateText}</span>`;

      if (item.roles && item.roles.length) {
        item['role'] = item.roles[0].name;
      }
      if (item.class) {
        item['className'] = item.class.name;
      }
    }
    return data;
  }
}
