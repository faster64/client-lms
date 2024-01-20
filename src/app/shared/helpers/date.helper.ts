export class DateHelper {

  public static Now = new Date(Date.now());

  public static CurrentMonth = new Date(Date.now()).getMonth() + 1;

  public static CurrentYear = new Date(Date.now()).getFullYear();

  public static DaysInThisMonth = DateHelper.GetDaysInMonth(DateHelper.CurrentMonth, DateHelper.CurrentYear);

  public static TodayISO = new Date().toISOString().split('T')[0];

  public static FirstOfNextYear = new Date(new Date().getFullYear() + 1, 0, 1);

  public static GetTimeOnly(date: Date) {
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    const hourStr = hour < 10 ? '0' + hour : hour;
    const minuteStr = minute < 10 ? '0' + minute : minute;
    const secondStr = second < 10 ? '0' + second : second;

    return `${hourStr}:${minuteStr}:${secondStr}`;
  }

  public static FormatDate(date: Date, containYear?: boolean) {
    if (date == null) {
      return '';
    }

    const clone = new Date(date);
    let day = clone.getDate();
    let month = clone.getMonth() + 1;
    let dayStr = day < 10 ? `0${day}` : day;
    let monthStr = month < 10 ? `0${month}` : month;
    if (containYear) {
      return `${dayStr}/${monthStr}/${clone.getFullYear()}`;
    }
    return `${dayStr}/${monthStr}`;
  }

  public static GetDaysInMonth(month: number, year: number) {
    if (month <= 0 || month > 12 || year <= 0)
      return 0;
    return new Date(year, month, 0).getDate();
  }

  public static GetDiffDays(date1: Date, date2: Date) {
    if (!date1 || !date2)
      return 0;

    const d1 = new Date(new Date(date1).setUTCHours(23, 0, 0, 0));
    const d2 = new Date(new Date(date2).setUTCHours(23, 0, 0, 0));

    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  public static Compare(date1: Date, date2: Date) {
    const d1 = new Date(new Date(date1).setUTCHours(23, 0, 0, 0));
    const d2 = new Date(new Date(date2).setUTCHours(23, 0, 0, 0));
    return d1.getTime() - d2.getTime();
  }

  public static GetDayVietnamName(date?: Date) {
    let dayInWeek = -1;
    if (!date) {
      dayInWeek = new Date().getDay();
    } else {
      dayInWeek = new Date(date).getDay();
    }
    if (dayInWeek == 0) {
      return "Chủ nhật";
    }
    return `Thứ ${dayInWeek + 1}`;
  }

  public static DisplayTimeAgo(time: Date) {
    const now = new Date().getTime();
    const totalSeconds = Math.max((now - new Date(time).getTime()) / 1000, 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor((totalSeconds % 3600) % 60);

    if (hours < 1) {
      if (minutes < 1) {
        if (seconds <= 30) {
          return "Vừa xong";
        }
        return `${seconds}s ago`;
      }
      return `${minutes}m ago`;
    }
    if (hours < 24) {
      return `${hours}h ago`;
    }
    return `${Math.floor(hours / 24)}d ago`;
  }
}
