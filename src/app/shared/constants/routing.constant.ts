import { RoutingConfig } from "../models/routing-config.model";

/**
 * Danh sách routing
*/
export class Routing {
  public static readonly CMS = new RoutingConfig('cms', 'cms');
  public static readonly CMS_BANNER = new RoutingConfig(`${Routing.CMS.path}/banner`, 'cms_banner');
  public static readonly CMS_COURSE = new RoutingConfig(`${Routing.CMS.path}/khoa-hoc`, 'cms_course');
  public static readonly CMS_CONTACT = new RoutingConfig(`${Routing.CMS.path}/lien-he`, 'cms_contact');
  public static readonly CMS_USER = new RoutingConfig(`${Routing.CMS.path}/quan-ly-tai-khoan-nguoi-dung`, 'cms_user');
  public static readonly CMS_ADMIN = new RoutingConfig(`${Routing.CMS.path}/quan-ly-tai-khoan-quan-tri`, 'cms_admin');
  public static readonly CMS_CLASS = new RoutingConfig(`${Routing.CMS.path}/lop-hoc`, 'cms_class');
  public static readonly CMS_LESSON = new RoutingConfig(`${Routing.CMS.path}/bai-giang`, 'cms_lesson');
  public static readonly CMS_SOCIAL = new RoutingConfig(`${Routing.CMS.path}/mang-xa-hoi`, 'cms_social');
  public static readonly CMS_ORDER = new RoutingConfig(`${Routing.CMS.path}/don-mua-hang`, 'cms_order');
  public static readonly CMS_GUIDE = new RoutingConfig(`${Routing.CMS.path}/huong-dan-su-dung`, 'cms_guide');
  public static readonly CMS_REPORT = new RoutingConfig(`${Routing.CMS.path}/bao-cao-thong-ke`, 'cms_report');


  public static readonly LOGIN = new RoutingConfig('dang-nhap', 'login');
  public static readonly REGISTER = new RoutingConfig('dang-ky', 'register');
  public static readonly FORGOT_PASSWORD = new RoutingConfig('quen-mat-khau', 'forgot_password');
  public static readonly HOME = new RoutingConfig('', 'home');
}

export const CommonRedirect = Routing.HOME.path;
