import { RoutingConfig } from "../models/routing-config.model";

/**
 * Danh sách routing
*/
export class Routing {
  public static readonly HOME = new RoutingConfig('trang-chu', 'home');
}

export const CommonRedirect = Routing.HOME.path;
