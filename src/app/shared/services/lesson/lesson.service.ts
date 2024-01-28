import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';
import { QuestionType } from '../../enums/question.enum';
@Injectable({
  providedIn: 'root'
})
export class LessonService extends BaseService {

  public static QuestionTypes = [
    {
      id: QuestionType.DIEN_KHUYET,
      text: 'Mẫu câu điền khuyết'
    },
    {
      id: QuestionType.GACH_DUOI,
      text: 'Mẫu câu có đáp án đúng gạch dưới'
    },
    {
      id: QuestionType.KHOANH_TRON,
      text: 'Mẫu câu có đáp án đúng khoanh tròn'
    },
    {
      id: QuestionType.SAP_XEP,
      text: 'Mẫu câu sắp xếp từ thành câu'
    }
  ]

  constructor(httpService: HttpService) {
    super(httpService);
    this.controller = 'lesson';
  }
}
