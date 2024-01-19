import { GroupBoxField } from "./group-box-field.model";

export class GroupBox {
  public name = "";

  public moduleId? = 0;

  public groupBoxFields: GroupBoxField[] = [];
}
