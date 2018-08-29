/**
 * @component invoice.js
 * @description 开票记录 service
 * @time 2018/8/28
 * @author zhao
 */
import { post } from '../utils/rpc';

/** 删除开票记录
 * @add by zhao
 * @params options
 * {
 *   id 开票记录ID must
 * }
 * @return Promise<Object>
 */
export function del({
  id,
}) {
  return post({
    method: 'api.customerrelations.invoiceDetail.delete',
    id,
  });
}

/** 更新开票记录
 * @add by zhao
 * @params options
 * {
 * pactId 合同ID must
 * issueId 回款期次ID must
 * content 开票内容 must
 * price 金额 must
 * invoiceDate 日期 must
 * type 票据类型 must
 * invoiceNumber 发票号码 must
 * comment 备注
 * }
 * @return Promise<Object>
 */
export function update({
  pactId,
  issueId,
  content,
  price,
  invoiceDate,
  type,
  invoiceNumber,
  comment,
}) {
  return post({
    method: 'api.customerrelations.invoiceDetail.update',
    pactId,
    issueId,
    content,
    price,
    invoiceDate,
    type,
    invoiceNumber,
    comment,
  });
}

/** 获取开票记录
 * @add by zhao
 * @params options
 * {
 *   id 开票记录ID must
 * }
 * @return Promise<Object>
 */
export function detail({
  id,
}) {
  return post({
    method: 'api.customerrelations.invoiceDetail.get',
    id,
  });
}


/** 高级查询开票记录
 * @add by zhao
 * @params options
 * {
 * pactId 合同ID
 * issueId 回款期次ID
 * }
 * @return Promise<Object>
 */
export function find({
  pactId,
  issueId,
}) {
  return post({
    method: 'api.customerrelations.invoiceDetail.find',
    pactId,
    issueId,
  });
}

/** 创建开票记录
 * @add by zhao
 * @params options
 * {
 * pactId 合同ID must
 * issueId 回款期次ID must
 * content 开票内容 must
 * price 金额 must
 * invoiceDate 日期 must
 * type 票据类型 must
 * invoiceNumber 发票号码 must
 * comment 备注
 * }
 * @return Promise<Object>
 */
export function create({
  pactId,
  issueId,
  content,
  price,
  invoiceDate,
  type,
  invoiceNumber,
  comment,
}) {
  return post({
    method: 'api.customerrelations.invoiceDetail.create',
    pactId,
    issueId,
    content,
    price,
    invoiceDate,
    type,
    invoiceNumber,
    comment,
  });
}

