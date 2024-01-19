import { RoutingConfig } from "src/app/models/base/routing-config.model";

/**
 * Danh sách routing
*/
export class Routing {
  public static readonly NOT_CONNECTED = new RoutingConfig('not-connected', 'NOT_CONNECTED', [], true);
  public static readonly NOT_FOUND = new RoutingConfig('404', 'NOT_FOUND', [], true);
  public static readonly ACCESS_DENIED = new RoutingConfig('403', 'ACCESS_DENIED', [], true);
  public static readonly UNSUPPORT_DEVICE = new RoutingConfig('unsupport-device', 'UNSUPPORT_DEVICE', [], true);
  public static readonly TOKEN_RECEIVER = new RoutingConfig('resolve-authentication', 'TOKEN_RECEIVER', [], true);
  public static readonly AUDIT_LOG = new RoutingConfig('audit-logs', 'AUDIT_LOG', [], true);
  public static readonly INFORMATION = new RoutingConfig('ri', 'INFORMATION', [], true);
  public static readonly SESSION_LOG = new RoutingConfig('session-logs', 'SESSION_LOG', [], true);
  public static readonly SIGN_IN = new RoutingConfig('sign-in', 'SIGN_IN', [], true);
  public static readonly SIGN_UP = new RoutingConfig('sign-up', 'SIGN_UP', [], true);
  public static readonly SIGN_OUT = new RoutingConfig('sign-out', 'SIGN_OUT', [], true);
  public static readonly GITHUB_WEBHOOK = new RoutingConfig('webhook-github', 'GITHUB_HOOK', [], true);
  public static readonly CUSTOMIZE_MODULE = new RoutingConfig('tuy-chinh-phan-he', 'CUSTOMIZE_MODULE', [], true);
  public static readonly DASHBOARD = new RoutingConfig('tong-quan', 'DASHBOARD', [1]);

  public static readonly IFRAME_ELK = new RoutingConfig('open-elastic', 'IFRAME_ELK', [100], false);

  public static readonly INCOME_CATEGORY = new RoutingConfig('loai-thu-nhap', 'INCOME_CATEGORY', [2]);
  public static readonly INCOME = new RoutingConfig('thu-nhap', 'INCOME', [3]);
  public static readonly SPENDING_CATEGORY = new RoutingConfig('loai-chi-tieu', 'SPENDING_CATEGORY', [4]);
  public static readonly SPENDING = new RoutingConfig('chi-tieu', 'SPENDING', [5]);
  public static readonly SPENDING_JARS_RULE = new RoutingConfig('quan-ly-chi-tieu-theo-quy-tac', 'SPENDING_JARS_RULE', [6]);
  public static readonly ST_REPORT = new RoutingConfig('bao-cao-tai-chinh', 'ST_REPORT', [7]);
  public static readonly ST_SETTING = new RoutingConfig('thiet-lap-chung', 'ST_SETTING', [8]);
  public static readonly LOAN = new RoutingConfig('khoan-vay', 'LOAN', [9]);
  public static readonly VPS = new RoutingConfig('vps', 'VPS', [10]);
  public static readonly DATABASE = new RoutingConfig('database', 'DATABASE', [11]);
  public static readonly DOMAIN = new RoutingConfig('domain', 'DOMAIN', [12]);
  public static readonly FOLDER = new RoutingConfig('thu-muc', 'FOLDER', [20]);

  public static readonly CHAT_GENERATOR_HISTORY = new RoutingConfig('chat-generator-history', 'CHAT_GENERATOR_HISTORY', [13]);
  public static readonly GENERATE_CHAT = new RoutingConfig('chat-generate', 'GENERATE_CHAT', [14]);

  public static readonly CUSTOMER = new RoutingConfig('khach-hang', 'CUSTOMER', [15]);
  public static readonly PRODUCT = new RoutingConfig('san-pham', 'PRODUCT', [16]);
  public static readonly PO = new RoutingConfig('don-dat-hang', 'PO', [17]);
  public static readonly SUPPLIER = new RoutingConfig('nha-cung-cap', 'SUPPLIER', [18]);
  public static readonly EXCHANGE_RATE = new RoutingConfig('ty-gia-hoi-doai', 'EXCHANGE_RATE', [19]);
}

export const CommonRedirect = Routing.DASHBOARD.path;
