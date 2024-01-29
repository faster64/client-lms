import { BaseModel } from "../base/base-model";

export class CheckPayment extends BaseModel {
    public purchasedIds = [];
    public totalPrice = 0;
}