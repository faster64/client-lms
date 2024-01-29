import { BillStatus } from "../../enums/bill-status.enum";
import { BaseModel } from "../base/base-model";
import { Course } from "../course/course";

export class Bill extends BaseModel {
    public courses: Course[] = [];
    public totalPrice = 0;
    public status = BillStatus.Unpaid;
}