/**
 * @component price.js
 * @description 价格表 service
 * @time 2018/8/28
 * @author zhao
 */
import { post } from '../utils/rpc';
import { getUserId } from '../utils/base';

/** 分页查询价格表明细列表
 * @add by zhao
 * @params options
 * {
 *   priceId 价格表Id
 * }
 * @return Promise<Object>
 */
export function queryPriceProduct({
  priceId,
} = {}) {
  return post({
    method: 'api.customerrelations.priceProduct.find',
    priceId,
  });
}

/** 编辑价格表明细
 * @add by zhao
 * @params options
 * {
 * id 主键Id must
 * priceId 价格表Id must
 * productId 产品Id must
 * setPrice 价格表价格 must
 * isActive 是否有效 must
 * comment 备注
 * }
 * @return Promise<Object>
 */
export function updatePriceProduct({
  id,
  priceId,
  productId,
  setPrice,
  isActive,
  comment,
} = {}) {
  return post({
    method: 'api.customerrelations.priceProduct.update',
    id,
    priceId,
    productId,
    setPrice,
    isActive,
    comment,
  });
}


/** 删除价格表明细
 * @add by zhao
 * @params options
 * {
 *   id 主键Id must
 * }
 * @return Promise<Object>
 */
export function delPriceProduct({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.priceProduct.delete',
    id,
  });
}

/** 新增价格表明细
 * @add by zhao
 * @params options
 * {
 * priceProductList 价格表明细集合 未给出 must
 * }
 * @return Promise<Object>
 */
export function createPriceProduct() {
  return post({
    method: 'api.customerrelations.priceProduct.create',
  });
}

/** 查看价格表
 * @add by zhao
 * @params options
 * {
 * id 主键Id must
 * }
 * @return Promise<Object>
 */
export function getPrice({
  id = getUserId(),
} = {}) {
  return post({
    method: 'api.customerrelations.price.get',
    id,
  });
}


/** 删除价格表
 * @add by zhao
 * @params options
 * {
 * id 主键Id must
 * }
 * @return Promise<Object>
 */
export function del({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.price.delete',
    id,
  });
}

/** 编辑价格表
 * @add by zhao
 * @params options
 * {
 * departmentId 部门ID must
 * name 价格表名称 must
 * ownerId 负责人ID must
 * isActive 是否启用 must
 * comment 备注
 * }
 * @return Promise<Object>
 */
export function update({
  departmentId,
  name,
  ownerId,
  isActive,
  comment,
} = {}) {
  return post({
    method: 'api.customerrelations.price.update',
    departmentId,
    name,
    ownerId,
    isActive,
    comment,
  });
}

/** 创建价格表
 * @add by zhao
 * @params options
 * {
 * departmentId 部门ID must
 * name 价格表名称 must
 * ownerId 负责人ID must
 * isActive 是否启用 must
 * comment 备注
 * copyPriceId 复制价格表Id
 * }
 * @return Promise<Object>
 */
export function create({
  departmentId,
  name,
  ownerId,
  isActive,
  comment,
  copyPriceId,
} = {}) {
  return post({
    method: 'api.customerrelations.price.create',
    departmentId,
    name,
    ownerId,
    isActive,
    comment,
    copyPriceId,
  });
}

/** 分页查询价格列表
 * @add by zhao
 * @params options
 * {
 *   pageNumber 页码
 *   pageSize 每页数量 0 通用为全部
 *   isMyDuty 是否是我负责的
 *   isMyFollow 是否是我关注的
 *   isActive 是否有效 must
 *   keyword 关键字
 * }
 * @return Promise<Object>
 */
export function getPriceList({
  pageNumber = 1,
  pageSize = 15,
  isMyDuty,
  isMyFollow,
  isActive,
  keyword,
} = {}) {
  return post({
    method: 'api.customerrelations.price.find',
    pageNumber,
    pageSize,
    isMyDuty,
    isMyFollow,
    isActive,
    keyword,
  });
}


/** 导出价格表
 * @add by zhao
 * @params options
 * {
 * isMyDuty 是否是我负责的
 * isMyFollow 是否是我关注的
 * isActive 是否有效 must
 * keyword 关键字
 * }
 * @return Promise<Object>
 */
export function exportPrice({
  isMyDuty,
  isMyFollow,
  isActive,
  keyword,
} = {}) {
  return post({
    method: 'api.customerrelations.price.export',
    isMyDuty,
    isMyFollow,
    isActive,
    keyword,
  });
}


/** 关注价格表
 * @add by zhao
 * @params options
 * {
 * objectType 是否是我负责的 must
 * objectId 是否是我关注的 must
 * objectName 是否有效 must
 * followTime 关键字 must
 * }
 * @return Promise<Object>
 */
export function followPrice({
  objectType,
  objectId,
  objectName,
  followTime,
} = {}) {
  return post({
    method: 'api.customerrelations.follow.create',
    objectType,
    objectId,
    objectName,
    followTime,
  });
}
