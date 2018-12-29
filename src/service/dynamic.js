/**
 * @component dynamic.js
 * @description 模块动态 service
 * @time 2018/8/28
 * @author zhao
 */
import { rpcUtil } from 'xn-react-native-applets';

const { post } = rpcUtil;

/** 高级查询模块动态表
 * @add by zhao
 * @params options
 * {
 *  pageNumber 页码
 *  pageSize 每页数量 0 通用为全部
 *  moduleType  模块类型  must PRODUCT-产品,PACT-合同,CUSTOMER-客户,CONTACT-联系人,ACTIVITY-市场活动,LEADS-销售线索,OPPORTUNITY-销售机会,PRICE-价格,RECEIVABLE_PLAN-回款计划,RECEIVABLE_DETAIL-回款记录
 *  moduleId  模块ID  must
 *  createBy  创建人ID
 *  needAttachments 需要附件
 * }
 * @return Promise<Object>
 */
export function getDynamicList({
  pageNumber = 1,
  pageSize = 15,
  moduleType,
  moduleId,
  createBy,
  needAttachments = true,
} = {}) {
  return post({
    method: 'api.customerrelations.dynamic.find',
    pageNumber,
    pageSize,
    moduleType,
    moduleId,
    createBy,
    needAttachments,
  });
}

/** 创建模块动态
 * @add by zhao
 * @params options
 * {
 *  id 图片id
 *  moduleType 模块类型 must
 *  moduleId 模块ID must
 *  contentType 记录类型 must
 *  content 跟进内容 must
 * }
 * @return Promise<Object>
 */
export function createDynamic({
  id,
  moduleType,
  moduleId,
  contentType,
  content,
} = {}) {
  return post({
    method: 'api.customerrelations.dynamic.create',
    id,
    moduleType,
    moduleId,
    contentType,
    content,
    attachmentStatus: !!id, // 要是有附件，文件传true，无传false
  });
}

