import { ReportStudentItemModel } from "./report-student";

export class ReportStudentByLessonModel {
  public id = '';
  public name = '';
  public students: ReportStudentItemModel[] = [];
  public collapse = true;
}
