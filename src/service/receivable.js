/**
 * @component receivable.js
 * @description 回款 service
 * @time 2018/8/27
 * @author JUSTIN XU
 */
import { post } from '../utils/rpc';

/** 高级查询回款期次
 * @params options
 * {
 *   pactId 合同ID must
 * }
 * @return Promise<Object>
 */
export function getReceivableIssueList({
  pageNumber = 1,
  pageSize = 15,
  pactId,
} = {}) {
  return post({
    method: 'api.customerrelations.receivableIssue.find',
    pageNumber,
    pageSize,
    pactId,
  });
}

/** 创建回款期次
 * @add by zhao
 * @params options
 * {
 *   pactId 合同ID must
 * }
 * @return Promise<Object>
 */
export function createReceivableIssue({
  pactId,
} = {}) {
  return post({
    method: 'api.customerrelations.receivableIssue.create',
    pactId,
  });
}

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

/** 创建回款记录
 * @params options
 * {
 *   pactId 合同ID must
 *   issueId 回款期次ID must
 *   planId 回款计划ID must
 *   receivablePrice 回款金额 must
 *   receivableDate 回款日期  must
 *   payType 付款方式  must [ CASH-现金,CHECK-支票,BANK_TRANSFER-银行转账,OTHER-其他 ]
 *   ownerId 负责人ID must
 *   comment 备注
 * }
 * @return Promise<Object>
 */
export function createReceivableRecord({
  pactId,
  issueId,
  planId,
  receivablePrice,
  receivableDate,
  payType,
  ownerId,
  comment,
} = {}) {
  return post({
    method: 'api.customerrelations.receivableDetail.create',
    pactId,
    issueId,
    planId,
    receivablePrice,
    receivableDate,
    payType,
    ownerId,
    comment,
  });
}
