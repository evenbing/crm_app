/**
 * 计算每个月的天数
 */
export function getMonthDays(year, month) {
  // 判断2月份天数
  let days;
  if (month === 2) {
    days = ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0) ? 29 : 28;
  } else if (month <= 7) {
    // 1-7月 单数月为31日
    days = month % 2 === 1 ? 31 : 30;
  } else {
    // 8-12月 双月为31日
    days = month % 2 === 0 ? 31 : 30;
  }
  return days;
}

/**
 * 根据日期计算周几
 */
export function getDayOfWeek(year, month, day) {
  const week = new Date(year, month - 1, day).getDay();
  let weekDay = '';
  switch (week) {
    case 0:
      weekDay = '周日';
      break;
    case 1:
      weekDay = '周一';
      break;
    case 2:
      weekDay = '周二';
      break;
    case 3:
      weekDay = '周三';
      break;
    case 4:
      weekDay = '周四';
      break;
    case 5:
      weekDay = '周五';
      break;
    case 6:
      weekDay = '周六';
      break;
    default:
      break;
  }
  return weekDay;
}
