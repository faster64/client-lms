import { LocalStorageKey } from "../constants/localstorage.key";
import { LocalHelper } from "./local.helper";
import { StringHelper } from "./string.helper";

export class UserHelper {
  private static UP = '';
  private static MP = '';

  static get USER_PERMISSION(): string {
    try {
      if (StringHelper.isNullOrEmpty(this.UP)) {
        const accessToken = LocalHelper.getAndParse('auth')[LocalStorageKey.ACCESS_TOKEN] || '';
        if (accessToken) {
          const permission = StringHelper.parseJwt(accessToken)["permission"];
          if (permission) {
            this.UP = permission + "";
          } else {
            this.UP = '0';
          }
        }
      }
      return this.UP;
    } catch (e) {
      return '0';
    }
  }

  static get MODULE_PERMISSION(): string {
    try {
      if (StringHelper.isNullOrEmpty(this.MP) || this.MP == '0') {
        const accessToken = LocalHelper.getAndParse('auth')[LocalStorageKey.ACCESS_TOKEN] || '';
        if (accessToken) {
          const permission = StringHelper.parseJwt(accessToken)["module_permission"];
          if (permission) {
            this.MP = permission + "";
          } else {
            this.MP = '0';
          }
        }
      }
      return this.MP;
    } catch (e) {
      return '0';
    }
  }

  static get USER_ROLES(): string[] {
    try {
      const accessToken = LocalHelper.getAndParse('auth')[LocalStorageKey.ACCESS_TOKEN] || '';
      if (accessToken) {
        const roles = StringHelper.parseJwt(accessToken)["roles"];
        return roles.split(',');
      }
    } catch (e) {
      return [];
    }
    return [];
  }
}
