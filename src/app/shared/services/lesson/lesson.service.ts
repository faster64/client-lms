import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';
import { ExerciseType } from '../../enums/exercise.enum';
@Injectable({
  providedIn: 'root'
})
export class LessonService extends BaseService {

  public static QuestionTypes = [
    {
      id: ExerciseType.DIEN_KHUYET,
      text: 'Mẫu câu điền khuyết'
    },
    {
      id: ExerciseType.GACH_DUOI,
      text: 'Mẫu câu có đáp án đúng gạch dưới'
    },
    {
      id: ExerciseType.KHOANH_TRON,
      text: 'Mẫu câu có đáp án đúng khoanh tròn'
    },
    {
      id: ExerciseType.SAP_XEP,
      text: 'Mẫu câu sắp xếp từ thành câu'
    }
  ]

  constructor(httpService: HttpService) {
    super(httpService);
    this.controller = 'lesson';
  }
}
