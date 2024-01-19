export enum GenderType {
  Male = 0,
  Female = 1,
  Other = 2
}

export enum FilterCondition {
  E = 1, // Equal
  NE, // Not equal
  GT, // Greater than
  GE, // Greater than or equal to
  LT, // Less than
  LE, // Less than or equal to
  C, // Contains
  NC,// Not contains
  SW, // Start withs
  NSW, // Not start withs
  EW, // End withs
  NEW, // Not end withs
}

export enum MessageBoxType {
  None = 0,
  Confirm = 1,
  ConfirmDelete = 2,
  Information = 3,
  Html = 4,
}


export enum GroupBoxFieldType {
  Text = 1,
  Password,
  Number,
  NumberNoFormat,
  Date,
  ComboBox,
  CheckBox,
  Image,
  TextArea,
  Link,
  Tag,
  DateTime,
  CanEdit,
}

export enum FormMode {
  None = 0,
  View = 1,
  Add = 2,
  Update = 3,
}

export enum ExportType {
  All = 1,
  OnScreen = 2,
}
