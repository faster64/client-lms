import { FormMode, GroupBoxFieldType } from "src/app/shared/enumerations/common.enum";

export class GroupBoxField {
  public fieldName = "";

  public value: any;

  public title = "";

  public type?= GroupBoxFieldType.Text;

  public scale?= 12;

  public breakLine? = false;

  public required?= false;

  public placeholder?= "";

  public isFetching?= false;

  public comboboxUrl?= "";

  public pickList?: ComboBoxItem[] = [];

  public comboboxMap?: ComboBoxMap;

  public addSelectorFunc?: Function;

  public isDisabled?= false;

  public isReadonly?= false;

  public isDisplay?= true;

  public width?= 0;

  public error?= true;

  public errorMessage?= "";

  public displayLinkText? = "";

  public onlyShowOnModes?: FormMode[] = [FormMode.Add, FormMode.Update, FormMode.View];

  public focus? = false;

  public presignedUrlMapOn? = '';

  public presignedUrls?: string[] = [];

  public showPassword? = false;

  public position? = 1;
}

export class ComboBoxMap {
  public id = "";
  public value = "";
}

export class ComboBoxItem {
  public id: any;
  public value: any;
}
