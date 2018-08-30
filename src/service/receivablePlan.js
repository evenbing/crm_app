/**
 * @component receivablePlan.js
 * @description 回款计划 service
 * @time 2018/8/27
 * @author JUSTIN XU
 */
import { post } from '../utils/rpc';

/** 创建回款计划
 * @params options
 * {
 *   pactId 合同ID must
 *   issueId 回款期次ID must
 *   receivablePrice 回款金额 must
 *   receivableDate 回款日期  must
 *   ownerId 负责人ID must
 *   comment 备注
 * }
 * @return Promise<Object>
 */
export function createReceivablePlan({
  pactId,
  issueId,
  receivablePrice,
  receivableDate,
  ownerId,
  comment,
} = {}) {
  return post({
    method: 'api.customerrelations.receivablePlan.create',
    pactId,
    issueId,
    receivablePrice,
    receivableDate,
    ownerId,
    comment,
  });
}

/** 高级查询回款期次
 * @params options
 * {
 *   pactId 合同ID must
 * }
 * @return Promise<Object>
 */
export function getReceivableIssue({
  pactId,
} = {}) {
  return post({
    method: 'api.customerrelations.receivableIssue.find',
    pactId,
  });
}

/** 高级查询回款计划
 * @params options
 * {
 *   pactId 合同ID
 *   issueId 回款期次ID
 *   participateType 参与类型 [ CHARGE-我负责的，ALL-全部 ]
 *   ids 回款计划ID集合
 * }
 * @return Promise<ArrayList>
 */
export function getReceivablePlanList({
  pactId,
  issueId,
  participateType,
  ids,
} = {}) {
  return post({
    method: 'api.customerrelations.receivablePlan.find',
    pactId,
    issueId,
    participateType,
    ids,
  });
}

/** 获取回款计划
 * @params options
 * {
 *   id 回款计划ID must
 * }
 * @return Promise<Object>
 */
export function getReceivablePlan({
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
  pactId,
  issueId,
  receivablePrice,
  receivableDate,
  ownerId,
  comment,
} = {}) {
  return post({
    method: 'api.customerrelations.receivablePlan.update',
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
