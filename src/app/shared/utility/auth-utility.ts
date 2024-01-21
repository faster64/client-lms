import { ActivatedRouteSnapshot } from "@angular/router";
import * as bigInt from "big-integer";
import { Routing } from "../constants/routing.constant";
import { ActionExponent } from "../enums/exponent.enum";
import { UserHelper } from "../helpers/user.helper";
import { RoutingConfig } from "../models/routing-config.model";

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
      console.log(`per:`, userPermission.toString(), "action:", action.toString(), " => result: ", hasPermission);
      if (!hasPermission) {
        return false;
      }
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
