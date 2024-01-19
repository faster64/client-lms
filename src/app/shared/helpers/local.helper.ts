export class LocalHelper {
  public static parse(key: string) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : {};
  }
}
