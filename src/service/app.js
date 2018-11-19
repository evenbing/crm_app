/**
 * @component app.js
 * @description 全局 service
 * @time 2018/8/8
 * @author JUSTIN XU
 */
import { post, upload } from '../utils/rpc';

/**
 * 获取承租人信息和用户id
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

/**
 * 创建省市区ID
 */
export function createLocationId({
  provinceId = '',
  cityId = '',
  districtId = '',
  address = '',
} = {}) {
  return post({
    method: 'api.base.location.create',
    countryId: 86,
    provinceId,
    cityId,
    districtId,
    address,
  });
}

/**
 * 更新省市区ID
 */
export function updateLocationId({
  id,
  provinceId = '',
  cityId = '',
  districtId = '',
  address = '',
} = {}) {
  return post({
    method: 'api.base.location.update',
    id,
    provinceId,
    cityId,
    districtId,
    address,
  });
}

/** 关注(批量)
 * @add by zhao
 * @params options
 * {
 *  followList 关注列表
 *   [{
 *      objectType 模块类型
 *      objectId    活动ID
 *      objectName: 活动名称
 *      followTime: 当前时间
 *      userId:     用户id
 *   }]
 * }
 * @return Promise<Object>
 */
export function batchCreateFollow({
  followList,
} = {}) {
  return post({
    method: 'api.customerrelations.follow.batch.create',
    followList,
  });
}

/** 关注
 * @add by Justin Xu
 * @params options
 * {
 *  followList 关注列表
 *   [{
 *      objectType 模块类型
 *      objectId    活动ID
 *      objectName: 活动名称
 *      followTime: 当前时间
 *      userId:     用户id
 *   }]
 * }
 * @return Promise<Object>
 */
export function createFollow({
  objectType,
  objectId,
  objectName,
  followTime,
  userId,
} = {}) {
  return post({
    method: 'api.customerrelations.follow.create',
    objectType,
    objectId,
    objectName,
    followTime,
    userId,
  });
}

/** 取消关注
 * @params options
 * {
 *   id 主键id(followId) must
 * }
 */
export function deleteFollow({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.follow.delete',
    id,
  });
}

/**
 * 获取用户的通知列表
 */
export function getMessage({
  pageNumber = 1,
  pageSize = 100,
  ...restProps
}) {
  return post({
    method: 'api.foundation.message.find',
    pageNumber,
    pageSize,
    ...restProps,
  });
}

/** *
 * 查重新增客户和新增销售机会功能
* */
export function getCustomerName({
  name,
}) {
  return post({
    method: 'api.customerrelations.customer.find',
    name,
  });
}
