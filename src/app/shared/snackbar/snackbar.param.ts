export class SnackBarParameter {
  public sender: any;
  public title: string = "";
  public message: string = "";
  public duration: number = 3000;
  public callback!: Function;

  constructor(
    sender: any = undefined,
    title: string = "",
    message: string = "",
    duration: number = 3000,
    callback: Function = undefined,
  ) {
    this.sender = sender;
    this.title = title;
    this.message = message;
    this.duration = duration;
    this.callback = callback;
  }
}
