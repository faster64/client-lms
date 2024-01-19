import { TimeOptions } from "src/app/shared/enumerations/time-options.enum";

export class TimeModel {
  public id: TimeOptions = TimeOptions.All;
  public text: string;
  public from: string;
  public to: string;
  public year?: number;
}
