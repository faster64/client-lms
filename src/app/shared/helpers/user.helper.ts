import { LocalStorageKey } from "../constants/localstorage-key.constant";
import { LocalHelper } from "./local.helper";
import { StringHelper } from "./string.helper";

export class UserHelper {
  private static UP = '';

  static get USER_PERMISSION(): string {
    try {
      if (StringHelper.isNullOrEmpty(this.UP)) {
        const accessToken = LocalHelper.parse('auth')[LocalStorageKey.ACCESS_TOKEN] || '';
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

  static get USER_ROLES(): string[] {
    try {
      const accessToken = LocalHelper.parse('auth')[LocalStorageKey.ACCESS_TOKEN] || '';
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
