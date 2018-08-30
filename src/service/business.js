/**
 * @component business.js
 * @description 商机 service
 * @time 2018/8/28
 * @author zhao
 */
import { post } from '../utils/rpc';


/** 高级查询商机明细表
 * @add by zhao
 * @params options
 * {
 *   opportunityId 商机ID
 * }
 * @return Promise<Object>
 */
export function detail({
  opportunityId,
} = {}) {
  return post({
    method: 'api.customerrelations.businessDetail.find',
    opportunityId,
  });
}


/** 创建商机明细表   无详细数据集合
 * @add by zhao
 * @params options
 * {
 *   businessDetails 商机明细集合 是
 * }
 * @return Promise<Object>
 */
export function create({
  businessDetails,
} = {}) {
  return post({
    method: 'api.customerrelations.businessDetail.create',
    businessDetails,
  });
}
