/**
 * @component price.js
 * @description 价格表 service
 * @time 2018/8/28
 * @author zhao
 */
import { post } from '../utils/rpc';

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
 * @return Promise<ArrayList>
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

/** 激活价格表
 * @add by JUSTIN XU
 * @params options
 * {
 *  id 价格表ID must
 * }
 * @return Promise<Object>
 */
export function updatePriceToActive({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.price.active',
    id,
  });
}

/** 作废价格表
 * @add by JUSTIN XU
 * @params options
 * {
 *  id 价格表ID must
 * }
 * @return Promise<Object>
 */
export function updatePriceToInActive({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.price.inactive',
    id,
  });
}

/** 查看价格表
 * @add by zhao
 * @params options
 * {
 *  id 主键Id must
 * }
 * @return Promise<Object>
 */
export function getPriceProductList({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.price.get',
    id,
  });
}
