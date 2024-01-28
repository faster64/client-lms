import { BaseModel } from "../base/base-model";
import { Exercise } from "./exercise";

export class Lesson extends BaseModel {
  public image = '';
  public imageUrl = '';
  public name = '';
  public description = '';
  public courseId = '0';
  public fileName = '';
  public originFileName = '';
  public fileUrl = '';
  public testName = '';
  public testDescription = '';
  public exercises: Exercise[] = [];
}
