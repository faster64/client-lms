import { RoutingConfig } from "../models/routing-config.model";

/**
 * Danh sách routing
*/
export class Routing {
  public static readonly CMS = new RoutingConfig('quan-tri', 'cms');
  public static readonly CMS_BANNER = new RoutingConfig(`${Routing.CMS.path}/banner`, 'cms_banner');
  public static readonly CMS_COURSE = new RoutingConfig(`${Routing.CMS.path}/khoa-hoc`, 'cms_course');
  public static readonly CMS_TICKET = new RoutingConfig(`${Routing.CMS.path}/lien-he`, 'cms_ticket');
  public static readonly CMS_USER = new RoutingConfig(`${Routing.CMS.path}/quan-ly-tai-khoan-nguoi-dung`, 'cms_user');
  public static readonly CMS_ADMIN = new RoutingConfig(`${Routing.CMS.path}/quan-ly-tai-khoan-quan-tri`, 'cms_admin');
  public static readonly CMS_CLASS = new RoutingConfig(`${Routing.CMS.path}/lop-hoc`, 'cms_class');
  public static readonly CMS_LESSON = new RoutingConfig(`${Routing.CMS.path}/bai-giang`, 'cms_lesson');
  public static readonly CMS_SOCIAL = new RoutingConfig(`${Routing.CMS.path}/mang-xa-hoi`, 'cms_social');
  public static readonly CMS_ORDER = new RoutingConfig(`${Routing.CMS.path}/don-mua-hang`, 'cms_order');
  public static readonly CMS_GUIDE = new RoutingConfig(`${Routing.CMS.path}/huong-dan-su-dung`, 'cms_guide');
  public static readonly CMS_REPORT = new RoutingConfig(`${Routing.CMS.path}/bao-cao-thong-ke`, 'cms_report');
  public static readonly CMS_REPORT_BY_LESSON = new RoutingConfig(`${Routing.CMS.path}/bao-cao-thong-ke-theo-bai-hoc`, 'cms_report_by_lesson');


  public static readonly LOGIN = new RoutingConfig('dang-nhap', 'login');
  public static readonly REGISTER = new RoutingConfig('dang-ky', 'register');
  public static readonly FORGOT_PASSWORD = new RoutingConfig('quen-mat-khau', 'forgot_password');
  public static readonly CHANGE_PASSWORD = new RoutingConfig('doi-mat-khau', 'change_password');
  public static readonly PERSONAL_INFORMATION = new RoutingConfig('thong-tin-ca-nhan', 'personal_information');
  public static readonly HOME = new RoutingConfig('', 'home');
  public static readonly GUIDE = new RoutingConfig('huong-dan-su-dung', 'guide');
  public static readonly CONTACT = new RoutingConfig('#appTicket', 'contact');
  public static readonly INTRODUCTION = new RoutingConfig('#', 'introduction');
  public static readonly MY_COURES = new RoutingConfig('khoa-hoc-cua-toi', 'home');
  public static readonly COURSE_DETAIL = new RoutingConfig('chi-tiet-khoa-hoc', 'course_detail');
  public static readonly COURSE_LESSON_LIST = new RoutingConfig('danh-sach-bai-giang', 'course_lesson_list');
  public static readonly COURSE_LESSON_LEARNING = new RoutingConfig('hoc-bai', 'course_lesson_learning');
  public static readonly COURSE_LESSON_TEST = new RoutingConfig('bai-kiem-tra', 'course_lesson_test');
  public static readonly COURSE_LESSON_CONGRATULATION = new RoutingConfig('chuc-mung-bai-kiem-tra', 'course_lesson_congratulation');
  public static readonly COURSE_LESSON_RESULT = new RoutingConfig('ket-qua-kiem-tra', 'course_lesson_result');
  public static readonly CART = new RoutingConfig('gio-hang', 'cart');
  public static readonly PAYMENT = new RoutingConfig('thanh-toan', 'payment');
  public static readonly PAYMENT_STATE = new RoutingConfig('trang-thai-don-hang', 'payment_state');
}

export const CommonRedirect = Routing.HOME.path;
