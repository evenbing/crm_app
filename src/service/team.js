/**
 * @component team.js
 * @description 管理团队 service
 * @time 2018/8/28
 * @author zhao
 */
import { post } from '../utils/rpc';

/** 查询团队成员
 * @add by shiquan
 * @param options
 * {
 * moduleId 模块id  是
 * moduleType 模块类型  是 ModuleTypeEnum：其中PRODUCT-产品，PACT-合同，CUSTOMER-客户，CONTACT-联系人，ACTIVITY-市场活动，LEADS-销售线索，OPPORTUNITY-销售机会，PRICE-价格，RECEIVABLE_PLAN-回款计划，RECEIVABLE_DETAIL-回款记录
 * }
 */
export function find({
  moduleId,
  moduleType,
} = {}) {
  return post({
    method: 'api.customerrelations.managementTeam.find',
    moduleId,
    moduleType,
  });
}

/** 创建管理团队
 * @add by zhao
 * @params options
 * {
 *   userId 用户ID must
 *   userName userName must
 *   moduleId moduleId must
 *   moduleType moduleType must
 * }
 * @return Promise<Object>
 */
export function create({
  userId,
  userName,
  moduleId,
  moduleType,
} = {}) {
  return post({
    method: 'api.customerrelations.managementTeam.create',
    userId,
    userName,
    moduleId,
    moduleType,
  });
}

