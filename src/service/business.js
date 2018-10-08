/**
 * @component business.js
 * @description 商机 service
 * @time 2018/8/28
 * @author zhao
 */
import { post } from '../utils/rpc';


/** 高级查询商机明细表
 * @add by zhao
 * @params options
 * {
 *   opportunityId 商机ID
 * }
 * @return Promise<Object>
 */
export function find({
  opportunityId,
} = {}) {
  return post({
    method: 'api.customerrelations.businessDetail.find',
    opportunityId,
  });
}

/** 创建商机明细表   无详细数据集合
 *  创建销售机会的时候，选择产品 从这儿关联
 * @add by zhao
 * @params options
 * {
 *  businessDetails 商机明细集合 是
 *  产品的lsit ，以下是list item的结构
 * 主键
 *private Long id;
 
 * 承租人ID
 * private Long tenantId;
 * 
 * 机会ID
 * private Long opportunityId;
 * 
 * 产品ID
 * private Long productId;
 * 
 * 产品名
 * private String productName;
 * 
 * 价格表ID
 * private Long priceId;
 * 
 * 标准价格
 * private Double standardPrice;
 * 
 * 销售价格
 * private Double salesPrice;
 * 
 * 折扣
 * private Double discount;
 * 
 * 销售数量
 * private Double salesNumber;
 * 
 * 销售总价
 * private Double salesTotalPrice;
 * 
 * 备注
 *private String comment;
 *
 * }
 * @return Promise<Object>
 */
export function create({
  businessDetails,
} = {}) {
  return post({
    method: 'api.customerrelations.businessDetail.create',
    businessDetails,
  });
}
