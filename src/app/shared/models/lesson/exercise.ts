import { BaseModel } from "../base/base-model";
import { KeyValue } from "./key-value";

export class Exercise extends BaseModel {
  public lessonId = '0';
  public type = 0;
  public questionJson = '';
  public answerJson = '';
  // public answers = [];
  public dienKhuyetAnswer: string[] = [];
  public gachDuoiAnswer: KeyValue[] = [];
  public khoanhTronAnswer: KeyValue[] = [];
  public sapXepAnswer: string[] = [];
  public multiCorrectAnswers = false;
  public image = '';
  public imageUrl = '';
  public audio = '';
  public audioUrl = '';
  public note = '';
  public hint = '';
  public hasAttachment = false;
}
