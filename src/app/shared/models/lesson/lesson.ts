import { BaseModel } from "../base/base-model";
import { Exercise } from "./exercise";

export class Lesson extends BaseModel {

  // docs
  public image = '';
  public imageUrl = '';
  public name = '';
  public description = '';
  public courseId = '0';
  public fileName = '';
  public originFileName = '';
  public fileUrl = '';

  // exercises
  public testName = '';
  public testDescription = '';
  public testIsValid = true;
  public exercises: Exercise[] = [];
}
