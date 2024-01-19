export class FileHelper {
  public static ByteToKilobyte(bytes: number) {
    return bytes / 1024;
  };

  public static ByteToMegabyte(bytes: number) {
    return bytes / (1024 * 1024);
  };

  public static ByteToGigabyte(bytes: number) {
    return bytes / (1024 * 1024 * 1024);
  };

  public static Format(bytes: number) {
    let value = this.ByteToKilobyte(bytes);
    let suffix = "Kb";

    if (value >= 1024) {
      value = this.ByteToMegabyte(bytes);
      suffix = "Mb";
      if (value >= 1024) {
        value = this.ByteToGigabyte(bytes);
        suffix = "Gb";
      }
    }

    const re = '\\d(?=(\\d{3})+$)';
    const result = value.toFixed(2).replace(new RegExp(re, 'g'), '$&,');
    if(result.endsWith('.00')) {
      return result.substring(0, result.length - 3) + suffix;
    }
    return  result + suffix;
  }
}
