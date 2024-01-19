import { ActionExponent } from "src/app/shared/enumerations/permission.enum";
import { Utility } from "src/app/shared/utility/utility";
import { GroupBox } from "./group-box.model";
import { FormMode } from "src/app/shared/enumerations/common.enum";

export class FormDynamicOption {
  public groupBoxes: GroupBox[] = [];
  public formMode = FormMode.None;
  public serviceName = "";
  public controller = "";
  public backUrl!: string;
  public title: {
    view: string,
    add: string,
    edit: string,
  } = { view: "", add: "", edit: "" }
  public allowedFileExtensions = Utility.videoExtensions.map(i => `.${i}`).concat(Utility.imageExtensions.map(i => `.${i}`)).join(",");
  public addExponents: ActionExponent[] = [ActionExponent.Add];
  public editExponents: ActionExponent[] = [ActionExponent.Edit];
  public deleteExponents: ActionExponent[] = [ActionExponent.Delete];
  public editAndAddExponents: ActionExponent[] = [ActionExponent.Add, ActionExponent.Edit];
  public showEditAndAdd = true;
}
