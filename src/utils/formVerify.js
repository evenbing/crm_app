/**
 * @component form.js
 * @description 表单验证
 * @time 2017/5/11
 * @author JUSTIN XU
 */
// import moment from 'moment';

/* eslint-disable no-useless-escape */
// 验证电话
export const PHONE = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;

/** 验证电话
 * @param  str 字段
 * @param  options 配置
 * {
 *   pattern 正则
 *   errMsg  错误消息
 * }
 * @return Any
 */
export const verifyPhone = (str = '', {
  pattern = PHONE,
  errMsg = '请输入正确电话',
} = {}) => {
  if (pattern.test(str)) return null;
  throw new Error(errMsg);
};

// 验证手机号码
export const MOBILE = /^1(3|4|5|7|8)\d{9}$/;

/** 验证手机号码
 * @param  str 字段
 * @param  options 配置
 * {
 *   pattern 正则
 *   errMsg  错误消息
 * }
 * @return Any
 */
export const verifyMobile = (str = '', {
  pattern = MOBILE,
  errMsg = '请输入正确手机号码',
} = {}) => {
  if (pattern.test(str)) return null;
  throw new Error(errMsg);
};

// 验证e_mail
export const E_MAIL = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;

/** 验证电子邮件
 * @param  str 字段
 * @param  options 配置
 * {
 *   pattern 正则
 *   errMsg  错误消息
 * }
 * @return Any
 */
export const verifyEMail = (str = '', {
  pattern = E_MAIL,
  errMsg = '请输入正确的邮箱',
} = {}) => {
  if (pattern.test(str)) return null;
  throw new Error(errMsg);
};

// 验证邮政编码
export const POSTAL_CODE = /^[1-9]\d{5}$/;

/** 验证电子邮件
 * @param  str 字段
 * @param  options 配置
 * {
 *   pattern 正则
 *   errMsg  错误消息
 * }
 * @return 错误消息
 */
export const verifyPostalCode = (str = '', {
  pattern = POSTAL_CODE,
  errMsg = '请输入正确的邮政编码',
} = {}) => {
  if (pattern.test(str)) return null;
  throw new Error(errMsg);
};

// link链接
export const LINK = /((https|http|ftp|rtsp|mms):\/\/)?(([0-9a-z_!~*'().&=+$%-]+:)?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().?:@&=+$,%#-]+)+\/?)/;

/** 验证密码
 * @param  str 字段
 * @param  options 配置
 * {
 *   pattern 正则
 *   errMsg  错误消息
 * }
 * @return 错误消息
 */
export const verifyLink = (str = '', {
  pattern = LINK,
  errMsg = '请输入正确的网址',
} = {}) => {
  if (pattern.test(str)) return null;
  throw new Error(errMsg);
};

/** 验证开始结束时间
 * @param  beginDate 开始时间
 * @param  endDate 结束时间
 * @param  options 配置
 * {
 *   errMsg  错误消息
 * }
 * @return 错误消息
 */
// export const verifyDateTime = (beginDate, endDate, {
//   errMsg = '结束时间必须大于开始时间',
// } = {}) => {
//   if (!beginDate) throw new Error('开始时间不为空');
//   if (!endDate) throw new Error('结束时间不为空');
//   if (moment(beginDate).isBefore(endDate)) return null;
//   throw new Error(errMsg);
// };

export const verifyDateTime = () => {
  return null;
};
