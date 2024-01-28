import { BaseModel } from "../base/base-model";

export class Exercise extends BaseModel {
  public lessonId = '0';
  public type = 0;
  public questionJson = '';
  public anwserJson = '';
  public anwsers = [];
  public image = '';
  public audio = '';
  public note = '';
  public hint = '';
}
