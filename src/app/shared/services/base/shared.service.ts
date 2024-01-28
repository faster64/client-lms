import { Injectable } from '@angular/core';
import { DeviceType } from '../../enums/device.enum';
import { Course } from '../../models/course/course';
import { LocalStorageKey } from '../../constants/localstorage-key.constant';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  static OnlineUsers = 0;
  static DeviceType = DeviceType.Desktop;
  static UnderMaintenanceMode = false;
  static CartItems: Course[] = [];

  get currentLanguage(): string {
    return 'vi-VN';
  }

  public static AdjustCarts() {
    try {
      const local = JSON.parse(localStorage.getItem(LocalStorageKey.CART_ITEMS)) as Course[];
      const items = local ? local : [];

      SharedService.CartItems = [];
      if (items.length) {
        const ids = [...new Set(items.map(x => x.id))];
        const tmp = [];
        for (let i = 0; i < ids.length; i++) {
          const item = items.find(x => x.id == ids[i]);
          tmp.push(item);
        }
        SharedService.CartItems = tmp;
      }

    } catch (error) {
      console.log(error);
      localStorage.removeItem(LocalStorageKey.CART_ITEMS);
      SharedService.CartItems = [];
    }
  }
}
