/**
 * @component receivableRecord.js
 * @description 回款记录 service
 * @time 2018/8/27
 * @author JUSTIN XU
 */
import { rpcUtil } from 'xn-react-native-applets';

const { post } = rpcUtil;

/** 高级查询回款记录
 * @params options
 * {
 *   pactIds 合同ID集合
 *   pactId 合同ID
 *   issueId 回款期次ID
 *   sortColumn 排序类型 RECEIVABLE_DATE-实际回款时间,CREATION_TIME-创建时间,LAST_UPDATE_TIME-最近更新时间
 *   participateType 参与类型 [ CHARGE-我负责的，ALL-全部 ]
 *   payType 付款方式 CASH-现金,CHECK-支票,BANK_TRANSFER-银行转账,OTHER-其他
 *   dateFrom 日期开始
 *   dateTo 日期结束
 *   ids 回款计划ID集合
 *   customerId 客户ID
 *   customerIds 客户list
 * }
 * @return Promise<ArrayList>
 */
export function getReceivableRecordList({
  pageNumber = 1,
  pageSize = 15,
  pactIds,
  pactId,
  issueId,
  sortColumn,
  participateType,
  payType,
  dateFrom,
  dateTo,
  ids,
  customerId,
  customerIds,
} = {}) {
  return post({
    method: 'api.customerrelations.receivableDetail.find',
    pageNumber,
    pageSize,
    pactIds,
    pactId,
    issueId,
    sortColumn,
    participateType,
    payType,
    dateFrom,
    dateTo,
    ids,
    customerId,
    customerIds,
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

/** 更新回款记录表
 * @params options
 * {
 *   code 编号 must
 *   id 主键ID must
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
  code,
  id,
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
    code,
    id,
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
