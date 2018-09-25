/**
 * @component contract.js
 * @description 合同 service
 * @time 2018/8/28
 * @author zhao
 */
import { post } from '../utils/rpc';

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


/** 转移合同负责人
 * @add by zhao
 * @params options
 * {
 * id 合同ID must
 * ownerIdBefore 更改前负责人ID must
 * ownerIdAfter 更改后负责人ID must
 * ownerNameBefore 更改前负责人姓名 must
 * ownerNameAfter 更改后负责人姓名 must
 * }
 * @return Promise<Object>
 */
export function updateOwnerUser({
  id,
  ownerIdBefore,
  ownerIdAfter,
  ownerNameBefore,
  ownerNameAfter,
} = {}) {
  return post({
    method: 'api.customerrelations.owner.change',
    id,
    ownerIdBefore,
    ownerIdAfter,
    ownerNameBefore,
    ownerNameAfter,
  });
}


/** 删除合同
 * @add by zhao
 * @params options
 * {
 *   id 合同ID must
 * }
 * @return Promise<Object>
 */
export function del({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.pact.delete',
    id,
  });
}


/** 高级查询合同列表
 * @add by zhao
 * @params options
 * {
 *   pageNumber 页码
 *   pageSize 每页数量 0 通用为全部
 *   pactParticipateType 参与类型 must ALL-全部，CHARGE-我负责的，JOIN-我参与的
 *   status 合同状态
 *   customerId 客户ID
 *   opportunityId 机会ID
 *   type 合同类型 PRODUCT_SALES-产品销售,SERVICE-服务,BUSINESS_COOPERRATION-业务合作,AGENT_DISTRIBUTION-代理分销,OTHER-其他
 *   payType 付款方式 CASH-现金,CHECK-支票,BANK_TRANSFER-银行转账,OTHER-其他
 *   number 合同编号
 *   ourContractId 我方签约人ID
 *   startDate 开始日期
 *   endDate 结束日期
 *   pactDate 签约日期
 * }
 * @return Promise<ArrayList>
 */
export function getContractList({
  pageNumber = 1,
  pageSize = 15,
  pactParticipateType,
  status,
  customerId,
  opportunityId,
  type,
  payType,
  number,
  ourContractId,
  startDate,
  endDate,
  pactDate,
} = {}) {
  return post({
    method: 'api.customerrelations.pact.find',
    pageNumber,
    pageSize,
    pactParticipateType,
    status,
    customerId,
    opportunityId,
    type,
    payType,
    number,
    ourContractId,
    startDate,
    endDate,
    pactDate,
  });
}


/** 获取合同
 * @add by zhao
 * @params options
 * {
 *   id 合同ID must
 * }
 * @return Promise<Object>
 */
export function getContractDetails({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.pact.get',
    id,
  });
}

/** 更新合同表
 * @add by zhao
 * @params options
 * {
 * id 合同ID
 * customerId 客户ID must
 * customerName 客户名称 must
 * type 合同类型 must
 * status 合同状态
 * salesOpportunitiesId 销售机会ID
 * payType 付款方式
 * theme 合同主题 must
 * totalMoney 总金额 must
 * startDate 开始日期 must
 * endDate 结束日期 must
 * ownerId 负责人ID
 * departmentId 部门ID
 * number 合同编号
 * customerContractId 客户方签约人ID
 * customerContractName 客户方签约人姓名
 * ourContractId 我方签约人ID
 * content 合同正文
 * pactDate 签约日期
 * comment 备注
 * }
 * @return Promise<Object>
 */
export function updateContract({
  id,
  customerId,
  customerName,
  type,
  status,
  salesOpportunitiesId,
  payType,
  theme,
  totalMoney,
  startDate,
  endDate,
  ownerId,
  departmentId,
  number,
  customerContractId,
  customerContractName,
  ourContractId,
  content,
  pactDate,
  comment,
} = {}) {
  return post({
    method: 'api.customerrelations.pact.update',
    id,
    customerId,
    customerName,
    type,
    status,
    salesOpportunitiesId,
    payType,
    theme,
    totalMoney,
    startDate,
    endDate,
    ownerId,
    departmentId,
    number,
    customerContractId,
    customerContractName,
    ourContractId,
    content,
    pactDate,
    comment,
  });
}


/** 创建合同产品关联表
 * @add by zhao
 * @params options
 * {
 *   pactProducts 合同产品关联表集合 must
 * }
 * @return Promise<Object>
 */
export function updatePactProductByPactId({
  pactProducts,
} = {}) {
  return post({
    method: 'api.customerrelations.pactProduct.create',
    pactProducts,
  });
}

/** 创建合同
 * @add by zhao
 * @params options
 * {
 *   customerId, 客户ID must
 *   customerName, 客户名称 must
 *   type, 合同类型 must
 *   status, 合同状态
 *   salesOpportunitiesId, 销售机会ID
 *   payType, 付款方式
 *   theme, 合同主题 must
 *   totalMoney, 总金额 must
 *   startDate, 开始日期 must
 *   endDate, 结束日期 must
 *   ownerId, 负责人ID
 *   departmentId, 部门ID
 *   number, 合同编号
 *   customerContractId, 客户方签约人ID
 *   customerContractName, 客户方签约人姓名
 *   ourContractId, 我方签约人ID
 *   content, 合同正文
 *   pactDate, 签约日期
 *   comment, 备注
 * }
 * @return Promise<Object>
 */
export function createContract({
  customerId,
  customerName,
  type,
  status,
  salesOpportunitiesId,
  payType,
  theme,
  totalMoney,
  startDate,
  endDate,
  ownerId,
  departmentId,
  number,
  customerContractId,
  customerContractName,
  ourContractId,
  content,
  pactDate,
  comment,
} = {}) {
  return post({
    method: 'api.customerrelations.pact.create',
    customerId,
    customerName,
    type,
    status,
    salesOpportunitiesId,
    payType,
    theme,
    totalMoney,
    startDate,
    endDate,
    ownerId,
    departmentId,
    number,
    customerContractId,
    customerContractName,
    ourContractId,
    content,
    pactDate,
    comment,
  });
}
