/**
 * @component employee.js
 * @description 全部成员 service
 * @time 2018/8/28
 * @author zhao
 */
import { post } from '../utils/rpc';

/** 查询全部成员
 * @param options
 * {
 *  pageNumber 页码
 *  pageSize 每页数量 0 通用为全部
 *  name 模糊查询  是
 *  isOpenUser
 * }
 */
export function getEmployeeList({
  pageSize = 0,
  name,
  isOpenUser = true,
} = {}) {
  return post({
    method: 'api.master.humanresource.employee.find',
    pageSize,
    name,
    isOpenUser,
  });
}

/** 查询活动团队成员列表
 * @add by justin
 * @param options
 * {
 *  pageNumber 页码
 *  pageSize 每页数量 0 通用为全部
 *  moduleId 模块id  是
 *  moduleType 模块类型  是 ModuleTypeEnum：其中PRODUCT-产品，PACT-合同，CUSTOMER-客户，CONTACT-联系人，ACTIVITY-市场活动，LEADS-销售线索，OPPORTUNITY-销售机会，PRICE-价格，RECEIVABLE_PLAN-回款计划，RECEIVABLE_DETAIL-回款记录
 *  isOpenUser
 * }
 */
export function getManageTeamList({
  pageSize = 0,
  moduleID,
  moduleType,
  isOpenUser = true,
} = {}) {
  return post({
    method: 'api.customerrelations.managementTeamMember.find',
    pageSize,
    moduleID,
    moduleType,
    isOpenUser,
  });
}

/** 查询负责人
 * @add by justin
 * @param options
 * {
 *  id 传参id(当前负责人id)
 * }
 */
export function getOwnerUserName({
  id,
} = {}) {
  return post({
    method: 'api.user.user.get',
    id,
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
export function createTeamUser({
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
