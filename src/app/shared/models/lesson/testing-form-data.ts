import { Exercise } from "./exercise";

export class TestingFormData {
  public lessonId = '';
  public exerciseWithAnswers: ExerciseWithAnswer[] = [];
}


export class ExerciseWithAnswer {
  public exercise = new Exercise();
  public answer = new Answer();
}


export class Answer {
  public exerciseId = '';
  public answerJson = '';
  public answerArray = [];
}
