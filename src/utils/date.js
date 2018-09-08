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
export function getDayOfWeek(year, month, day, type='周') {
  const week = new Date(year, month - 1, day).getDay();
  let weekDay = '';
  switch (week) {
    case 0:
      weekDay = `${type}日`;
      break;
    case 1:
      weekDay = `${type}一`;
      break;
    case 2:
      weekDay = `${type}二`;
      break;
    case 3:
      weekDay = `${type}三`;
      break;
    case 4:
      weekDay = `${type}四`;
      break;
    case 5:
      weekDay = `${type}五`;
      break;
    case 6:
      weekDay = `${type}六`;
      break;
    default:
      break;
  }
  return weekDay;
}
