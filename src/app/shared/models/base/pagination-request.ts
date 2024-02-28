import { SortModel } from "./sort-model";

export class PaginationRequest {
  public number: number = 0;

  public size: number = 20;

  public query = '';

  public sort = new SortModel('', false);

  public params: FilterParam[] = [];
}

export class FilterParam {
  public field = '';
  public value = '';
}

