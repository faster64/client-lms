import { RoutingConfig } from "../models/routing-config.model";

/**
 * Danh sách routing
*/
export class Routing {
  public static readonly LOGIN = new RoutingConfig('dang-nhap', 'login');
  public static readonly REGISTER = new RoutingConfig('dang-ky', 'register');
  public static readonly FORGOT_PASSWORD = new RoutingConfig('quen-mat-khau', 'forgot_password');
  public static readonly HOME = new RoutingConfig('', 'home');
}

export const CommonRedirect = Routing.HOME.path;
