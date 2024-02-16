
export class BaseModel {
  public id = "0";

  public created: Date = new Date();

  public modified?: Date = null;

  constructor(obj?: object) {
    if (obj) {
      setTimeout(() => {
        Object.assign(this, obj);
      }, 0);
    }
  }
}
