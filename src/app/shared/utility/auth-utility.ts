import * as bigInt from "big-integer";
import { ActionExponent } from "../enumerations/permission.enum";
import { UserHelper } from "../helpers/user.helper";
import { ActivatedRouteSnapshot } from "@angular/router";
import { RoutingConfig } from "src/app/models/base/routing-config.model";
import { Routing } from "../constants/routing.constant";

export class AuthUtility {
  public static checkPermission(actionExponents: ActionExponent[]) {
    // Nếu không yêu cầu permission
    if (!actionExponents.length || actionExponents.every(p => p === ActionExponent.None)) {
      return true;
    }

    // Lấy quyền người dùng
    const numberTwo = bigInt(2);
    const userPermission = bigInt(UserHelper.USER_PERMISSION);

    for (let i = 0; i < actionExponents.length; i++) {
      const exponent = actionExponents[i];
      let action = bigInt(1);
      for (let e = 1; e <= exponent; e++) {
        action = action.multiply(numberTwo);
      }

      const hasPermission = userPermission.and(action).compare(action) == 0;
      console.customize(`per:`, userPermission.toString(), "action:", action.toString(), " => result: ", hasPermission);
      if (!hasPermission) {
        return false;
      }
    }

    return true;
  }

  public static checkModulePermission(moduleExponent: number) {
    // Nếu không yêu cầu permission
    if (moduleExponent == 0) {
      return true;
    }

    // Lấy quyền người dùng
    const numberTwo = bigInt(2);
    const userModulePermission = bigInt(UserHelper.MODULE_PERMISSION);

    let action = bigInt(1);
    for (let e = 1; e <= moduleExponent; e++) {
      action = action.multiply(numberTwo);
    }

    const hasPermission = userModulePermission.and(action).compare(action) == 0;
    console.customize(`module permission of user: ${userModulePermission.toString()},`, `required:`, action.toString(), " => result: ", hasPermission);
    if (!hasPermission) {
      return false;
    }
    return true;
  }

  public static getRoutingConfig(next: ActivatedRouteSnapshot) {
    const keys = Object.keys(Routing);
    const path = next.routeConfig.path;

    for (let i = 0; i < keys.length; i++) {
      if (Routing[keys[i]].path == path) {
        return Routing[keys[i]] as RoutingConfig;
      }
    }
    return null;
  }
}
