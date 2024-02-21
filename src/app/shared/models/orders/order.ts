import { OrderStatus } from "../../enums/order-status.enum";
import { BaseModel } from "../base/base-model";
import { Course } from "../course/course";

export class Order extends BaseModel {
    public courses: Course[] = [];
    public totalPrice = 0;
    public status = OrderStatus.Unpaid;
    public purchasedDate = new Date();
}
