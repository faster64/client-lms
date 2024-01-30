export class SnackBarParameter {
  public sender: any;
  public message: string = "";
  public duration: number = 3000;
  public callback!: Function;

  constructor(
    sender: any = undefined,
    message: string = "",
    duration: number = 3000,
    callback: Function = undefined,
  ) {
    this.sender = sender;
    this.message = message;
    this.duration = duration;
    this.callback = callback;
  }
}
