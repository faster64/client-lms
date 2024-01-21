export class SortModel {
  public fieldName = "";

  public sortAscending = true;

  constructor(fieldName = "", sortAscending = true) {
    this.fieldName = fieldName;
    this.sortAscending = sortAscending;
  }
}
