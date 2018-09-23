/**
 * @component receivableRecord.js
 * @description 回款记录 service
 * @time 2018/8/27
 * @author JUSTIN XU
 */
import { post } from '../utils/rpc';

/** 高级查询回款记录
 * @params options
 * {
 *   pactIds 合同ID集合
 *   pactId 合同ID
 *   issueId 回款期次ID
 *   participateType 参与类型 [ CHARGE-我负责的，ALL-全部 ]
 *   ids 回款计划ID集合
 * }
 * @return Promise<ArrayList>
 */
export function getReceivableRecordList({
  pactIds,
  pactId,
  issueId,
  participateType,
  ids,
} = {}) {
  return post({
    method: 'api.customerrelations.receivableDetail.find',
    pactIds,
    pactId,
    issueId,
    participateType,
    ids,
  });
}

/** 获取回款记录
 * @params options
 * {
 *   id 回款记录ID must
 * }
 * @return Promise<Object>
 */
export function getReceivableRecordDetails({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.receivableDetail.get',
    id,
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

/** 更新回款记录表
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
export function updateReceivableRecord({
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
    method: 'api.customerrelations.receivableDetail.update',
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

/** 删除回款计划
 * @params options
 * {
 *   id 回款计划ID must
 * }
 * @return Promise<Object>
 */
export function deleteReceivableRecord({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.receivableDetail.delete',
    id,
  });
}
