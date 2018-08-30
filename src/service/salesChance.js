/**
 * @component salesChance.js
 * @description 销售机会 service
 * @time 2018/8/27
 * @author JUSTIN XU
 */
import { post } from '../utils/rpc';

/** 新增销售机会
 * @params options
 * {
 *   name 机会名称 must
 *   customerId 客户名称 must
 *   planAmount 销售金额 must
 *   salesPhaseId 销售阶段 must
 *   expectedDate 结单日期 must
 *   description 备注
 *   departmentId 所属部门 must
 *   activityId 市场活动
 *   opportunityType 机会类型 [枚举类型（OpportunityEnum）]
 *   sourceType 机会来源 [枚举类型（OpportunityEnum）]
 * }
 * @return Promise<Object>
 */
export function createSalesOpportunity({
  name,
  customerId,
  planAmount,
  salesPhaseId,
  expectedDate,
  description,
  departmentId,
  activityId,
  opportunityType,
  sourceType,
} = {}) {
  return post({
    method: 'api.customerrelations.opportunity.create',
    name,
    customerId,
    planAmount,
    salesPhaseId,
    expectedDate,
    description,
    departmentId,
    activityId,
    opportunityType,
    sourceType,
  });
}

/** 查看销售机会 (没接口)
 * @params options
 * {
 *   id 主键id must
 * }
 * @return Promise<ArrayList>
 */
export function getSalesOpportunity({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.opportunity.get',
    id,
  });
}

/** 编辑销售机会（价格表，最近跟进人，最近跟进时间，最近修改人，最近修改时间，创建人，创建时间）
 * @params options
 * {
 *   id 主键id must
 *   name 机会名称 must
 *   customerId 客户名称 must
 *   opportunityType 机会类型 [枚举类型（OpportunityEnum）]
 *   planAmount 销售金额 must
 *   sourceType 机会来源 [枚举类型（OpportunityEnum）]
 *   expectedDate 结单日期 must
 *   budgetCost 项目预算
 *   actualCost 实际花费
 *   transmissionReason 输单原因
 *   transmissionDescription 输单描述
 *   departmentId 所属部门 must
 *   description 备注
 * }
 * @return Promise<Object>
 */
export function updateCustomer({
  id,
  name,
  customerId,
  opportunityType,
  planAmount,
  sourceType,
  expectedDate,
  budgetCost,
  actualCost,
  transmissionReason,
  transmissionDescription,
  departmentId,
  description,
} = {}) {
  return post({
    method: 'api.customerrelations.opportunity.update',
    id,
    name,
    customerId,
    opportunityType,
    planAmount,
    sourceType,
    expectedDate,
    budgetCost,
    actualCost,
    transmissionReason,
    transmissionDescription,
    departmentId,
    description,
  });
}


/** 合并两个相同销售机会
 * @add by zhao
 * @params options
 * {
 *   updateId 主记录id must
 *   deleteId 从记录id must
 *   name 机会名称
 *   opportunityType 机会类型 [枚举类型（OpportunityEnum）]
 *   description 描述
 *   isLocked 是否锁定 must
 *   isSubmited 是否提交 must
 * }
 * @return Promise<Object>
 */
export function mergeOpportunity({
  updateId,
  deleteId,
  name,
  opportunityType,
  description,
  isLocked,
  isSubmited,
} = {}) {
  return post({
    method: 'api.customerrelations.opportunity.merge',
    updateId,
    deleteId,
    name,
    opportunityType,
    description,
    isLocked,
    isSubmited,
  });
}


/** 转移销售机会负责人
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
    method: 'api.customerrelations.changeOwnerUser.opportunity',
    id,
    ownerUserId,
    ownerUserName,
  });
}
