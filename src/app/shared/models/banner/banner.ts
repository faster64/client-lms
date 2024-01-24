import { BaseModel } from "../base/base-model";

export class Banner extends BaseModel {
  public images: string[] = [];
  public imageUrls: string[] = [];
  public title = '';
  public subTitle = '';
}
