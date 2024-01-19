import { RoutingConfig } from "src/app/models/base/routing-config.model";

/**
 * Danh sách routing
*/
export class Routing {
  public static readonly NOT_CONNECTED = new RoutingConfig('not-connected', 'NOT_CONNECTED', [], true);
  public static readonly NOT_FOUND = new RoutingConfig('404', 'NOT_FOUND', [], true);
  public static readonly ACCESS_DENIED = new RoutingConfig('403', 'ACCESS_DENIED', [], true);
  public static readonly INFORMATION = new RoutingConfig('ri', 'INFORMATION', [], true);
  public static readonly SESSION_LOG = new RoutingConfig('session-logs', 'SESSION_LOG', [], true);
  public static readonly SIGN_IN = new RoutingConfig('sign-in', 'SIGN_IN', [], true);
  public static readonly SIGN_UP = new RoutingConfig('sign-up', 'SIGN_UP', [], true);
  public static readonly SIGN_OUT = new RoutingConfig('sign-out', 'SIGN_OUT', [], true);
  public static readonly DASHBOARD = new RoutingConfig('tong-quan', 'DASHBOARD', [1]);
  public static readonly INCOME = new RoutingConfig('thu-nhap', 'INCOME', [3]);
}

export const CommonRedirect = Routing.DASHBOARD.path;
