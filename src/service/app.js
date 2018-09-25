/**
 * @component app.js
 * @description 全局 service
 * @time 2018/8/8
 * @author JUSTIN XU
 */
import { post, upload } from '../utils/rpc';

/**
 * 获取承租人信息和用户id
 * @param data
 * @returns {*}
 */
export function getNewId() {
  return post({
    method: 'api.base.newId.get',
  });
}

/**
 * 获取承租人信息和用户id
 * @param data
 * @returns {*}
 */
export function getPassportInfo({ id } = {}) {
  return post({
    method: 'api.security.passport.get',
    id,
  });
}

/**
 * 获取承租人信息
 * @param data
 * @returns {*}
 */
export function getShoppingGuideInfo({ tenantId, userId } = {}) {
  return post({
    method: 'api.crm.marketing.shoppingGuide.find',
    tenantId,
    userId,
  });
}

export function getOperatingUnitId({
  systemType = 'B2C',
  deviceType = 'MOBILE',
  isActive = true,
} = {}) {
  return post({
    method: 'api.ebusiness.systemSite.find',
    systemType,
    deviceType,
    isActive,
  });
}

/**
 * 上传头像
 * @param {*} file
 */
export function updateImage(file) {
  return upload(file);
}
