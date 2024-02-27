import { Exercise } from "./exercise";

export class TestingResult {
  public total = 0;
  public corrects = 0;
  public items: ExerciseResult[] = [];
}


export class ExerciseResult {
  public exercise = new Exercise();
  public studentAnswerJson = '';
  public correctAnswerJson = '';
  public isCorrect = false;
  public dienKhuyet: EachAnswerResult[] = [];
  public gachDuoi = new EachAnswerResult();
  public khoanhTron = new EachAnswerResult();
  public sapXep = new EachAnswerResult();
}


export class EachAnswerResult {
  public student = '';
  public correct = '';
}
