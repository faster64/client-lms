import { RoutingConfig } from "../models/routing-config.model";

/**
 * Danh sách routing
*/
export class Routing {
  public static readonly CMS = new RoutingConfig('cms', 'cms');
  public static readonly CMS_BANNER = new RoutingConfig(`${Routing.CMS.path}/banner`, 'cms_banner');
  public static readonly CMS_COURSE = new RoutingConfig(`${Routing.CMS.path}/khoa-hoc`, 'cms_banner');
  public static readonly CMS_CONTACT = new RoutingConfig(`${Routing.CMS.path}/lien-he`, 'cms_banner');
  public static readonly CMS_USER = new RoutingConfig(`${Routing.CMS.path}/quan-ly-tai-khoan-nguoi-dung`, 'cms_banner');
  public static readonly CMS_ADMIN = new RoutingConfig(`${Routing.CMS.path}/quan-ly-tai-khoan-quan-tri`, 'cms_banner');
  public static readonly CMS_CLASS = new RoutingConfig(`${Routing.CMS.path}/lop-hoc`, 'cms_banner');
  public static readonly CMS_LESSON = new RoutingConfig(`${Routing.CMS.path}/bai-giang`, 'cms_banner');
  public static readonly CMS_SOCIAL = new RoutingConfig(`${Routing.CMS.path}/mang-xa-hoi`, 'cms_banner');
  public static readonly CMS_ORDER = new RoutingConfig(`${Routing.CMS.path}/don-dat-hang`, 'cms_banner');
  public static readonly CMS_GUIDE = new RoutingConfig(`${Routing.CMS.path}/huong-dan-su-dung`, 'cms_banner');
  public static readonly CMS_REPORT = new RoutingConfig(`${Routing.CMS.path}/bao-cao-thong-ke`, 'cms_banner');


  public static readonly LOGIN = new RoutingConfig('dang-nhap', 'login');
  public static readonly REGISTER = new RoutingConfig('dang-ky', 'register');
  public static readonly FORGOT_PASSWORD = new RoutingConfig('quen-mat-khau', 'forgot_password');
  public static readonly HOME = new RoutingConfig('', 'home');
}

export const CommonRedirect = Routing.HOME.path;
