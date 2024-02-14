export class StringHelper {
  public static parseJwt(accessToken: string) {
    var base64Url = accessToken.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  public static isNullOrEmpty(input: string) {
    if (!input)
      return true;
    return input === "";
  }

  public static viToEn(input: string) {
    if (StringHelper.isNullOrEmpty(input))
      return "";

    input = input.replaceAll(new RegExp("[áàảãạâấầẩẫậăắằẳẵặ]", "ig"), "a");
    input = input.replaceAll(new RegExp("[éèẻẽẹêếềểễệ]", "ig"), "e");
    input = input.replaceAll(new RegExp("[iíìỉĩị]", "ig"), "i");
    input = input.replaceAll(new RegExp("[óòỏõọơớờởỡợôốồổỗộ]", "ig"), "o");
    input = input.replaceAll(new RegExp("[úùủũụưứừửữự]", "ig"), "u");
    input = input.replaceAll(new RegExp("[yýỳỷỹỵ]", "ig"), "y");
    input = input.replaceAll(new RegExp("[đ]", "ig"), "d");
    return input;
  }

  public static urlify(text: string) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
      return `<a href='${url}' target='_blank'>${url}</a>`;
    });
  }
}
