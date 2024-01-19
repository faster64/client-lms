import { ActionExponent } from "src/app/shared/enumerations/permission.enum";

export class RoutingConfig {
  public path = "";
  public key = "";
  public exponents: number[] = [];
  public isSystemModule: boolean;

  constructor(path: string, key: string, exponents?: number[], isSystemModule?: boolean) {
    this.path = path;
    this.key = key;
    this.exponents = exponents && exponents.length ? exponents : [0];
    this.isSystemModule = isSystemModule ? true : false;
  }
}
