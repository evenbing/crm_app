/**
 * @component salesChance.js
 * @description 销售机会 service
 * @time 2018/8/27
 * @author JUSTIN XU
 */
import { post } from '../utils/rpc';

/**
 * 
 * @param options
 * {
 *    my	我负责的	否
 *    myFollow	我关注的	否
 *    myParticipate	我参与的	否
 *    sevenDaysUninvolved	7天未跟进的	否
 *    all	全部	否
 *    expectedDateTime	结单时间范围	否
 *    TODAY-今日，YESTERDAY-昨日，LAST_WEEK-上周，THIS_WEEK-本周，NEXT_WEEK-下周，LAST_MONTH-上月，THIS_MONTH-本月，LAST_QUARTER-上季，THIS_QUARTER-本季，LAST_YEAR-上年，THIS_YEAR-本年
 *    salesPhaseId	销售阶段	否
 *    customerId	客户	否
 *    name	机会名称	否
 *    planAmount	销售金额	否
 *    sourceType	机会来源	否
 *    followTimeType	跟进时间范围	否
 *    TODAY-今日，YESTERDAY-昨日，LAST_WEEK-上周，THIS_WEEK-本周，NEXT_WEEK-下周，LAST_MONTH-上月，THIS_MONTH-本月，LAST_QUARTER-上季，THIS_QUARTER-本季，LAST_YEAR-上年，THIS_YEAR-本年
 *    sortColumn	表头排序	否
 * } options 
 */
export function getSalesChanceList({
  my,
  myFollowmy,
  myParticipatemy,
  sevenDaysUninvolvedmy,
  allmy,
  expectedDateTimemy,
  TODAYmy,
  salesPhaseIdmy,
  customerIdmy,
  namemy,
  planAmountmy,
  sourceTypemy,
  followTimeTypemy,
  TODAYmy,
  sortColumnmy,
} = {}) {
  return post({
    method: 'api.customerrelations.opportunity.find',
    my,
    myFollowmy,
    myParticipatemy,
    sevenDaysUninvolvedmy,
    allmy,
    expectedDateTimemy,
    TODAYmy,
    salesPhaseIdmy,
    customerIdmy,
    namemy,
    planAmountmy,
    sourceTypemy,
    followTimeTypemy,
    TODAYmy,
    sortColumnmy,
  });
}


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
export function createSalesChance({
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

/** 查看销售机会详情 (没接口)
 * @params options
 * {
 *   id 主键id must
 * }
 * @return Promise<ArrayList>
 */
export function getSalesChanceDetail({
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
export function updateSalesChance({
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
export function mergeSalesChance({
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
