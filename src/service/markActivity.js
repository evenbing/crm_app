/**
 * @component markActivity.js
 * @description 市场活动 service
 * @time 2018/8/27
 * @author JUSTIN XU
 */
import { post } from '../utils/rpc';

/** 新增市场活动
 * @params options
 * {
 *   name 机会名称 must
 *   beginDate 开始日期 must
 *   endDate 结束日期 must
 *   departmentId 所属部门 must
 *   status 活动状态 [枚举类型（ActivityStatusEnum）]
 *   sourceType 活动类型 [枚举类型（ActivityStatusEnum）]
 *   description 活动说明
 *   budgetCost 活动成本 创建时的成本应为：预期成本
 *   budgetRevenue 预期收入
 *   budgetPeopleNumber 邀请人数 创建时的邀请人数应为：预期人数
 *   effect 预期响应
 *   actualPeopleNumber 实际人数
 *   actualCost 实际成本
 *   executeDetail 备注
 * }
 * @return Promise<Object>
 */
export function createMarkActivity({
  name,
  beginDate,
  endDate,
  departmentId,
  status,
  sourceType,
  description,
  budgetCost,
  budgetRevenue,
  budgetPeopleNumber,
  effect,
  actualPeopleNumber,
  actualCost,
  executeDetail,
} = {}) {
  return post({
    method: 'api.customerrelations.activity.create',
    name,
    beginDate,
    endDate,
    departmentId,
    status,
    sourceType,
    description,
    budgetCost,
    budgetRevenue,
    budgetPeopleNumber,
    effect,
    actualPeopleNumber,
    actualCost,
    executeDetail,
  });
}

/** 查看市场活动
 * @params options
 * {
 *   id 主键id must
 * }
 * @return Promise<ArrayList>
 */
export function getMarkActivity({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.activity.get',
    id,
  });
}

/** 编辑市场活动
 * @params options
 * {
 *   sourceType 机会来源 [枚举类型（OpportunityEnum）]
 *   name 机会名称 must
 *   budgetCost 活动成本
 *   budgetRevenue 预期收入
 *   budgetPeopleNumber 邀请人数 创建时的邀请人数应为：预期人数
 *   effect 预期响应
 *   actualPeopleNumber 实际人数
 *   actualCost 实际成本
 *   actualRevenue 实际收入
 *   executeDetail 备注
 * }
 * @return Promise<Object>
 */
export function updateMarkActivity({
  sourceType,
  name,
  budgetCost,
  budgetRevenue,
  budgetPeopleNumber,
  effect,
  actualPeopleNumber,
  actualCost,
  actualRevenue,
  executeDetail,
} = {}) {
  return post({
    method: 'api.customerrelations.activity.update',
    sourceType,
    name,
    budgetCost,
    budgetRevenue,
    budgetPeopleNumber,
    effect,
    actualPeopleNumber,
    actualCost,
    actualRevenue,
    executeDetail,
  });
}


/** 转移市场活动负责人
 * @add by zhao
 * @params options
 * {
 *   id 主键id must
 *   ownerUserId 转移负责人id must
 *   ownerUserName 转移负责人姓名
 * }
 * @return Promise<Object>
 */
export function changeOwnerUser({
  id,
  ownerUserId,
  ownerUserName,
} = {}) {
  return post({
    method: 'api.customerrelations.changeOwnerUser.activity',
    id,
    ownerUserId,
    ownerUserName,
  });
}
