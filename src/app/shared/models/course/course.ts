import { CourseStatus } from "../../enums/course-status.enum";
import { BaseModel } from "../base/base-model";

export class Course extends BaseModel {
  public code = '';
  public name = '';
  public image = '';
  public imageUrl = '';
  public shortDescription = '';
  public description = '';
  public price = 0;
  public classId = '';
  public className = '';
  public status = CourseStatus.Release;
  public statusText = '';
  public releaseDate = new Date();
  public purchased = false;
}
