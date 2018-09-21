/**
 * @component dynamic.js
 * @description 模块动态 service
 * @time 2018/8/28
 * @author zhao
 */
import { post } from '../utils/rpc';

/** 高级查询模块动态表
 * @add by zhao
 * @params options
 * {
 *  moduleType  模块类型  是  PRODUCT-产品,PACT-合同,CUSTOMER-客户,CONTACT-联系人,ACTIVITY-市场活动,LEADS-销售线索,OPPORTUNITY-销售机会,PRICE-价格,RECEIVABLE_PLAN-回款计划,RECEIVABLE_DETAIL-回款记录
 *  moduleId  模块ID  是 // 这里好像是不是必须传
 *  createBy  创建人ID  是
 * }
 * @return Promise<Object>
 */
export function getDynamicList({
  moduleType,
  moduleId,
  createBy,
} = {}) {
  return post({
    method: 'api.customerrelations.dynamic.find',
    moduleType,
    moduleId,
    createBy,
  });
}

/** 创建模块动态
 * @add by zhao
 * @params options
 * {
 *  moduleType 模块类型 must
 *  moduleId 模块ID must
 *  contentType 记录类型 must
 *  content 跟进内容 must
 * }
 * @return Promise<Object>
 */
export function createDynamic({
  moduleType,
  moduleId,
  contentType,
  content,
} = {}) {
  return post({
    method: 'api.customerrelations.dynamic.find',
    moduleType,
    moduleId,
    contentType,
    content,
  });
}

