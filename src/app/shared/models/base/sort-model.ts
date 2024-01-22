export class SortModel {
  public fieldName = "";

  public asc = true;

  constructor(fieldName = "", asc = true) {
    this.fieldName = fieldName;
    this.asc = asc;
  }
}
