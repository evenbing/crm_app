/**
 * @component form.js
 * @description 表单验证
 * @time 2017/5/11
 * @author JUSTIN XU
 */

// 验证电话号码
export const MOBILE = /^(0|86|17951)?1[0-9]{10}/;

/** 验证用户名
 * @param  str 字段
 * @param  pattern 正则
 * @return 错误消息
 */
export const verifyMobile = (str, pattern = MOBILE) => {
  if (pattern.test(str)) return null;
  return '请正确输入手机号';
};

// 英文字母和数字:
export const NAME = /^[a-zA-Z0-9]{2,16}$/;

/** 验证用户名
 * @param  str 字段
 * @param  pattern 正则
 * @return 错误消息
 */
export const verifyName = (str, pattern = NAME) => {
  if (pattern.test(str)) return null;
  return '昵称只限大小写字母、数字';
};

// 支付地址:
export const ADDRESS = /[^A-Za-z0-9]/;

/** 验证用户名
 * @param  str 字段
 * @param  pattern 正则
 * @return 错误消息
 */
export const verifyAddress = (str, pattern = ADDRESS) => {
  if (!pattern.test(str)) return null;
  return '请输入正确地址';
};
