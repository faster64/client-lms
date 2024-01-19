export class RoutingConfig {
  public path = "";
  public key = "";
  public exponents: number[] = [];
  public requireAuthenticated: boolean;

  constructor(path: string, key: string, requireAuthenticated?: boolean, exponents?: number[], ) {
    this.path = path;
    this.key = key;
    this.requireAuthenticated = requireAuthenticated ? true : false;
    this.exponents = exponents && exponents.length ? exponents : [0];
  }
}
