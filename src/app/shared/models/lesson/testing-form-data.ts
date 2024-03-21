import { DragAndDropItem } from "./drag-and-drop-item";
import { Exercise } from "./exercise";
import { KeyValue } from "./key-value";
import { SapXep } from "./sap-xep";

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
  public dienKhuyetAnswerArray: string[] = []; // Dien khuyet only
  public gachDuoiAnswerArray: KeyValue[] = []; // Gach duoi only;
  public khoanhTronAnswerArray: KeyValue[] = []; // Khoanh tron only;
  public sapXepAnswerArray: SapXep[] = []; // Sap xep only
  public sapXepAnswerArray2: SapXep[] = []; // Câu trả lời (Sap xep only)
  public keoThaAnswerArray: DragAndDropItem[] = []; // Keo tha only
}
