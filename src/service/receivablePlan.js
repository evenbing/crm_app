/**
 * @component receivablePlan.js
 * @description 回款计划 service
 * @time 2018/8/27
 * @author JUSTIN XU
 */
import { rpcUtil } from 'xn-react-native-applets';

const { post } = rpcUtil;

/** 高级查询回款计划
 * @params options
 * {
 *   pageNumber 页码
 *   pageSize 每页数量 0 通用为全部
 *   pactId 合同ID
 *   issueId 回款期次ID
 *   participateType 参与类型 [ CHARGE-我负责的，ALL-全部 ]
 *   customerId 客户ID
 *   planPrice 计划回款金额
 *   planDate 计划回款时间
 *   isCompleted 回款状态 true-已完成，false-未完成
 *   isOver 逾期状态 true-有逾期，false-未逾期
 *   code 编号 FACT_RECEIVE_DATE-实际回款时间，PLAN_RECEIVE_DATE-计划回款时间
 *   sortColumn 排序类型
 *   ids 回款计划ID集合
 *   ifLastFollowTime true 最近更近时间排序
 * }
 * @return Promise<ArrayList>
 */
export function getReceivablePlanList({
  pageNumber = 1,
  pageSize = 15,
  pactId,
  issueId,
  participateType,
  customerId,
  planPrice,
  planDate,
  isCompleted,
  isOver,
  code,
  sortColumn,
  ids,
  ifLastFollowTime,
} = {}) {
  return post({
    method: 'api.customerrelations.receivablePlan.find',
    pageNumber,
    pageSize,
    pactId,
    issueId,
    participateType,
    customerId,
    planPrice,
    planDate,
    isCompleted,
    isOver,
    code,
    sortColumn,
    ids,
    ifLastFollowTime,
  });
}

/** 获取回款计划详情
 * @params options
 * {
 *   id 回款计划ID must
 * }
 * @return Promise<Object>
 */
export function getReceivablePlanDetails({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.receivablePlan.get',
    id,
  });
}

/** 更新回款计划表
 * @params options
 * {
 *   code 编号 must
 *   id 主键ID must
 *   pactId 合同ID must
 *   issueId 回款期次ID must
 *   receivablePrice 回款金额 must
 *   receivableDate 回款日期  must
 *   ownerId 负责人ID must
 *   comment 备注
 * }
 * @return Promise<Object>
 */
export function updateReceivablePlan({
  code,
  id,
  pactId,
  issueId,
  receivablePrice,
  receivableDate,
  ownerId,
  comment,
} = {}) {
  return post({
    method: 'api.customerrelations.receivablePlan.update',
    code,
    id,
    pactId,
    issueId,
    receivablePrice,
    receivableDate,
    ownerId,
    comment,
  });
}

/** 删除回款计划
 * @params options
 * {
 *   id 回款计划ID must
 * }
 * @return Promise<Object>
 */
export function deleteReceivablePlan({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.receivablePlan.delete',
    id,
  });
}
