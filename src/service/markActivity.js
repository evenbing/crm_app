/**
 * @component markActivity.js
 * @description 市场活动 service
 * @time 2018/8/27
 * @author JUSTIN XU
 */
import { post } from '../utils/rpc';
import { ModuleType } from '../constants/enum';

/** 查询市场活动列表
 *
 * @param options
 * {
 *  name 市场活动名称 否
 *  my  我负责的  否
 *  myFollowed  我关注的  否  关注对象类型必须传参
 *  ifLastFollowTime 最新更新时间
 *  objectType  关注对象类型  否  当选择为我关注的和全部时必填
 *  myParticipate 我参与的  否
 *  all 全部  否  关注对象类型必须传参
 *  status  活动状态  否
 *  sourceType  活动类型  否
 *  beginDateType 开始日期范围  否 TODAY-今日，YESTERDAY-昨日，LAST_WEEK-上周，THIS_WEEK-本周，NEXT_WEEK-下周，LAST_MONTH-上月，THIS_MONTH-本月，LAST_QUARTER-上季，THIS_QUARTER-本季，LAST_YEAR-上年，THIS_YEAR-本年
 *  endDateType 结束日期范围  否 TODAY-今日，YESTERDAY-昨日，LAST_WEEK-上周，THIS_WEEK-本周，NEXT_WEEK-下周，LAST_MONTH-上月，THIS_MONTH-本月，LAST_QUARTER-上季，THIS_QUARTER-本季，LAST_YEAR-上年，THIS_YEAR-本年
 *  budgetPeopleNumber  预计人数  否
 *  actualPeopleNumber  实际人数  否
 *  budgetCost  预计成本  否
 *  actualCost  实际成本  否
 *  departmentId  所属部门  否
 *  lastUpdateTime  最近修改日期  否
 *  sortColumn  表头排序  否
 * } options
 */
export function getMarkActivityList({
  pageNumber = 1,
  pageSize = 15,
  name,
  my,
  myFollowed,
  ifLastFollowTime,
  objectType = ModuleType.activity,
  myParticipate,
  all,
  status,
  sourceType,
  beginDateType,
  endDateType,
  budgetPeopleNumber,
  actualPeopleNumber,
  budgetCost,
  actualCost,
  departmentId,
  lastUpdateTime,
  sortColumn,
} = {}) {
  return post({
    method: 'api.customerrelations.activity.find',
    pageNumber,
    pageSize,
    name,
    my,
    myFollowed,
    ifLastFollowTime,
    objectType,
    myParticipate,
    all,
    status,
    sourceType,
    beginDateType,
    endDateType,
    budgetPeopleNumber,
    actualPeopleNumber,
    budgetCost,
    actualCost,
    departmentId,
    lastUpdateTime,
    sortColumn,
  });
}

/** 新增市场活动
 * @params options
 * {
 *  name  活动名称  是
 *  beginDate 开始日期  是
 *  endDate 结束日期  是
 *  departmentId  所属部门  是
 *  status  活动状态  否  ActivityStatusEnum：其中PLANNED-已计划，ONGOING-进行中,END-已结束,SUSPEND-终止
 *  sourceType  活动类型  否  ActivityTypeEnum：其中ADVERT-广告，SEMINAR-研讨会/会议EMAIL-电子邮件,TELEMARKETING-电话营销,PUBLIC_RELATIONS-公共关系,PARTNER-合作伙伴,OTHER-其他
 *  description 活动说明  是
 *  budgetCost  活动成本  否  创建时的成本应为：预期成本
 *  budgetRevenue 预期收入  否
 *  budgetPeopleNumber  邀请人数  否  创建时的邀请人数应为：预期人数
 *  effect  预期响应  否
 *  actualPeopleNumber  实际人数  否
 *  actualCost  实际成本  否
 *  executeDetail 备注  否
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
export function getMarkActivityDetail({
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
 *   id 主键ID must
 *   name  活动名称  是
 *   beginDate 开始日期  是
 *   endDate 结束日期  是
 *   departmentId  所属部门  是
 *   status  活动状态  否  ActivityStatusEnum：其中PLANNED-已计划，ONGOING-进行中,END-已结束,SUSPEND-终止
 *   sourceType  活动类型  否  ActivityTypeEnum：其中ADVERT-广告，SEMINAR-研讨会/会议EMAIL-电子邮件,TELEMARKETING-电话营销,PUBLIC_RELATIONS-公共关系,PARTNER-合作伙伴,OTHER-其他
 *   description 活动说明  是
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
  id,
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
  actualRevenue,
  executeDetail,
} = {}) {
  return post({
    method: 'api.customerrelations.activity.update',
    id,
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
