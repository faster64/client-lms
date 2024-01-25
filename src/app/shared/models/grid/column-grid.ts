import { FieldType } from "../../enums/field-type.enum";

export class ColumnGrid {
  public column = "";

  public displayText = "";

  public width? = 160; // < 0 tương ứng với 100%

  public type? = FieldType.Text;

  public tagColor? = ""; // Dùng với type là Tag

  public disabledFilter? = false;

  public sortable? = false;

  public sortBy? = '';

  public class? = "";

  public getLink?: Function = () => "";  // Dùng với type là Link

  public target? = '_self'; // Dùng với type là Link

  public showPassword? = false;

  public callback?: Function;
}
