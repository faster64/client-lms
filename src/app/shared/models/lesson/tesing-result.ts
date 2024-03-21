import { DragAndDropItem } from "./drag-and-drop-item";
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
  public keoTha = new KeoThaEachAnswerResult();
}

export class EachAnswerResult {
  public student = '';
  public correct = '';
}

export class KeoThaEachAnswerResult {
  public student: DragAndDropItem[] = [];
  public correct: DragAndDropItem[] = [];
}
