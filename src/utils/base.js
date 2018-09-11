/**
 * @component base.js
 * @description 基础方法库
 * @time 2018/6/23
 * @author JUSTIN XU
 */
import { NativeModules } from 'react-native';
import { pinyin } from './pinyin';

// nav go back
export function nativeGoBack() {
  NativeModules.system && NativeModules.system.navTo('BACK');
}

/** 根据数组对象排序 默认升序
 * @param prop 属性值
 * */
export function compareProps(prop) {
  return (obj1, obj2) => {
    const val1 = obj1[prop];
    const val2 = obj2[prop];
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    }
    return 0;
  };
}

function padLeftZero(str) {
  return (`00${str}`).substr(str.length);
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear().toString()).substr(4 - RegExp.$1.length));
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k].toString();
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

// 获取用户id
export function getUserId() {
  return global.userId;
}

// 获取承租人ID
export function getTenantId() {
  return global.tenantId;
}

/**
 * 判断年份是否为润年
 * @param {Number} year
 */
export function isLeapYear(year) {
  return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}

/**
 * 获取某一年份的某一月份的天数
 * @param {Number} year
 * @param {Number} month
 */
export function getMonthDays(year, month) {
  return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
}

// 计算周的范围结束
export function getWeekNumber(y, m, d) {
  const now = new Date(y, m - 1, d);
  const year = now.getFullYear();
  const month = now.getMonth();
  let days = now.getDate();
  // 那一天是那一年中的第多少天
  for (let i = 0; i < month; i++) {
    days += getMonthDays(year, i);
  }
  // 那一年第一天是星期几
  const yearFirstDay = new Date(year, 0, 1).getDay() || 7;
  let week = null;
  if (yearFirstDay === 1) {
    week = Math.ceil(days / 7);
  } else {
    days -= ((7 - yearFirstDay) + 1);
    week = Math.ceil(days / 7) + 1;
  }
  return week;
}

export function formatDateNow(value) {
  const { birthDate, birthMonth, birthYear } = value;
  if (!(birthDate && birthMonth)) return '';
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  if (month === birthMonth && date === birthDate) return '今天';
  const week = getWeekNumber(year, month, date);
  const birthWeek = getWeekNumber(year, birthMonth, birthDate);
  // console.log("year:", year, " month:", month, " date:", date, " birthMonth:", birthMonth, " birthDate:", birthDate, " week:", week, " birthWeek:", birthWeek)
  if (week === birthWeek) return '本周';
  if (month === birthMonth) return '本月';
  if (!birthYear) return `${birthMonth}-${birthDate}`;
  return `${birthYear}-${birthMonth}-${birthDate}`;
}

// 格式化成员list
export function formatMemberList(list) {
  if (!Array.isArray(list)) {
    throw new Error('params must be array');
  }
  if (!list.length) return list;
  return list.map((value) => {
    const nameChar = pinyin.getFullChars(value.name);
    const sortLetters = pinyin.getCamelChars(nameChar).substring(0, 1).toUpperCase();
    if (/^[A-Z]$/.test(sortLetters)) {
      value.sortLetters = sortLetters;
    } else {
      value.sortLetters = '#';
    }
    return value;
  });
}
