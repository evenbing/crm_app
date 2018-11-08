/**
 * @component salesChance.js
 * @description 销售机会 service
 * @time 2018/8/27
 * @author JUSTIN XU
 */
import { post } from '../utils/rpc';
import { ModuleType } from '../constants/enum';

/**
 *
 * @param options
 * {
 *  my  我负责的  否
 *  myFollow  我关注的  否
 *  objectType  关注对象类型  否必填
 *  myParticipate 我参与的  否
 *  sevenDaysUninvolved 7天未跟进的 否
 *  all 全部  否
 *  expectedDateTime  结单时间范围  否 TODAY-今日，YESTERDAY-昨日，LAST_WEEK-上周，THIS_WEEK-本周，NEXT_WEEK-下周，LAST_MONTH-上月，THIS_MONTH-本月，LAST_QUARTER-上季，THIS_QUARTER-本季，LAST_YEAR-上年，THIS_YEAR-本年
 *  salesPhaseId  销售阶段  否
 *  customerId  客户  否
 *  name  机会名称  否
 *  planAmount  销售金额  否
 *  sourceType  机会来源  否
 *  followTimeType  跟进时间范围  否 TODAY-今日，YESTERDAY-昨日，LAST_WEEK-上周，THIS_WEEK-本周，NEXT_WEEK-下周，LAST_MONTH-上月，THIS_MONTH-本月，LAST_QUARTER-上季，THIS_QUARTER-本季，LAST_YEAR-上年，THIS_YEAR-本年
 *  sortColumn  表头排序  否
 * } options
 */
export function getSalesChanceList({
  pageNumber = 1,
  pageSize = 15,
  my,
  myFollow,
  objectType = ModuleType.opportunity,
  myParticipate,
  sevenDaysUninvolved,
  all,
  expectedDateTime,
  salesPhaseId,
  customerId,
  name,
  planAmount,
  sourceType,
  followTimeType,
  sortColumn,
} = {}) {
  return post({
    method: 'api.customerrelations.opportunity.find',
    pageNumber,
    pageSize,
    my,
    myFollow,
    objectType,
    myParticipate,
    sevenDaysUninvolved,
    all,
    expectedDateTime,
    salesPhaseId,
    customerId,
    name,
    planAmount,
    sourceType,
    followTimeType,
    sortColumn,
  });
}


/** 新增销售机会
 * @params options
 * {
 *  name  机会名称  是
 *  customerId  客户名称  是
 *  isLocked 是否锁定 否
 *  isSubmited 是否提交 否
 *  budgetCost 项目预算 否
 *  actualCost 实际花费 否
 *  isPending 是否搁置 否
 *  planAmount  销售金额  是
 *  requirement 需求说明 否
 *  salesPhaseId  销售阶段  是
 *  expectedDate  结单日期  是
 *  description 备注  否
 *  departmentId  所属部门  是
 *  activityId  市场活动  否
 *  opportunityType 机会类型  否 OpportunityType Enum：NEW_CUSTOMER-新客户,OLD_CUSTOMER-老客户
 *  sourceType  机会来源  否 OpportunitySourceEnum：ADVERT-广告,SEMINAR-研讨会,SOLAR_ENGINE: 搜索引擎,SALES_OPPORTUNITY__INTRODUCTION-销售机会介绍,OTHER-其他
 *  关于关联产品：通过 createBusinessDetail 关联 选择的产品和销售机会
 *  关于 关联 价格表，通过 createBusinessDetail 存
 * }
 * @return Promise<Object>
 */
export function createSalesChance({
  id,
  name,
  customerId,
  isLocked,
  isSubmited,
  budgetCost,
  actualCost,
  isPending,
  planAmount,
  requirement,
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
    id,
    name,
    customerId,
    isLocked,
    isSubmited,
    budgetCost,
    actualCost,
    isPending,
    planAmount,
    requirement,
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
  debugger;
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

/** 高级查询销售阶段
 *
 * @param
 * {
 * isActive 是否启用 否
 * } param0
 */
export function findSalesPhase({
  isActive,
} = {}) {
  return post({
    method: 'api.customerrelations.salesPhase.find',
    isActive,
  });
}
