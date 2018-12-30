/**
 * @component base.js
 * @description 基础方法库
 * @time 2018/6/23
 * @author JUSTIN XU
 */
import moment from 'moment';
import { Platform } from 'react-native';
import { pinyin } from './pinyin';
import { TASK_SCHEDULE_CATEGORY } from '../constants/enum';

export function delay(time = 300) {
  return new Promise(resolve => setTimeout(() => resolve(time), time));
}

// 格式化类型
export const formatDateType = 'YYYY-MM-DD';
export const formatDateTaskScheduleType = 'MM-DD HH:mm';

// 格式化
export function formatDateByMoment(str, formatType = 'YYYY-MM-DD HH:mm:ss') {
  if (!str) return null;
  if (typeof str === 'string') {
    if (Number.isNaN(Number(str))) return str;
    str = Number(str);
  }
  return moment(str).format(formatType);
}

// 是否为所有
export function getAllCategory(navigation) {
  if (!navigation) return false;
  const {
    state: {
      params: {
        category,
      } = {},
    } = {},
  } = navigation;
  return category === TASK_SCHEDULE_CATEGORY.all;
}

/**
 * 格式化money 适用于numberInput
 * @param {*} value
 * return 1,000
 */
export function formatMoney(value) {
  if (!value && value !== 0) return null;
  if (typeof value === 'string') {
    if (Number.isNaN(Number(value))) return value;
    value = Number(value);
  }
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 解析money 1,000,000 适用于numberInput
 * @param {*} value
 */
export const parserMoney = value => value.replace(/\$\s?|(,*)/g, '');

// nav go back
export function getAppModuleType(moduleType) {
  if (!moduleType) throw new Error('模块类型不为空');
  return `CRM_${moduleType}`;
}

// 递归生产二维数组
export function getArrayByPid(list = [], pid) {
  return list.filter(obj => obj.parentId === pid).map(obj => ({
    ...obj,
    children: getArrayByPid(list, obj.id),
  }));
}

// 递归查询当前routers
export function getCurrRoutes(object = {}) {
  const { index = 0, routes = [] } = object;
  const currRoutes = routes[index];
  if (typeof currRoutes.index !== 'undefined' && Array.isArray(currRoutes.routes)) return getCurrRoutes(currRoutes);
  return routes;
}

// 获取用户id
export function getUserId() {
  return global.userId;
}

// 格式化团队list
export function formatMemberList(list) {
  if (!Array.isArray(list)) {
    throw new Error('params must be array');
  }
  if (!list.length) return list;
  return list.filter(value => !!value.userId).map((value) => {
    if (!value.userName && (value.firstName || value.lastName)) {
      value.userName = `${value.lastName}${value.firstName}`;
    }
    const nameChar = pinyin.getFullChars(value.userName);
    const sortLetters = pinyin.getCamelChars(nameChar).substring(0, 1).toUpperCase();
    if (/^[A-Z]$/.test(sortLetters)) {
      value.sortLetters = sortLetters;
    } else {
      value.sortLetters = '#';
    }
    value.actived = false;
    return value;
  });
}

/**
 * 对象转换成 key value数组
 * @param {*} obj
 */
export const mapToArray = (obj, name = 'name') => Object.keys(obj).map(key => ({ key, [name]: obj[key] }));


// 格式化地址
export function formatLocationMap(location = {}, needAddress = true) {
  if (!Object.keys(location).length || !location) return null;
  const {
    // countryName,
    address,
    provinceName,
    cityName,
    districtName,
  } = location;
  const list = [];
  // if (countryName) list.push(countryName);
  if (provinceName) list.push(provinceName);
  if (cityName) list.push(cityName);
  if (districtName) list.push(districtName);
  if (address && needAddress) list.push(address);
  if (!list.length) return null;
  return list.join('-');
}

// 兼容TextInput value 不识别number
export function formatNumberToString(obj) {
  const hashMap = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'number') {
      hashMap[key] = String(obj[key]);
    } else {
      hashMap[key] = obj[key];
    }
  });
  return hashMap;
}

// 处理image格式
export function formatPickerImage(image) {
  const { path = '' } = image;
  return {
    file: {
      uri: Platform.OS === 'android' ? path : path.replace('file://', ''),
      type: 'multipart/form-data',
      name: path.substr(path.lastIndexOf('/') + 1),
    },
    path,
  };
}

// 去除object中的'', null
export function filterObject(obj) {
  Object.keys(obj).forEach((key) => {
    if (!obj[key] && obj[key] !== 0) {
      delete obj[key];
    }
  });
  return obj;
}
