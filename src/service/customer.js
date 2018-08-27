/**
 * @component customer.js
 * @description 客户 service
 * @time 2018/8/27
 * @author JUSTIN XU
 */
import { post } from '../utils/rpc';

/** 新增客户
 * @params options
 * {
 *   contactId 联系人id
 *   code 客户编码
 *   name 客户名称 must
 *   quickCode 助记码
 *   shortName 客户简称
 *   phone 公司总机
 *   fax  公司传真
 *   website 网址
 *   locationId 地址ID
 *   description 说明
 *   pictureId 图片ID
 *   ownerUserId 负责人用户ID
 *   ownerUserName 负责人用户姓名
 *   isActive 是否有效 must
 *   departmentId 部门id must
 *   level 等级 A：重点客户，B：普通用户，C：非优先用户
 *   superiorCustomerId 上级客户ID
 *   weibo 微博
 *   peopleNumber 总人数
 *   salesNumber 销售额
 *   industry 行业  [枚举类型（IndustryTypeEnum）]
 * }
 * @return Promise<Object>
 */
export function createCustomer({
  contactId,
  code,
  name,
  quickCode,
  shortName,
  phone,
  fax,
  website,
  locationId,
  description,
  pictureId,
  ownerUserId,
  ownerUserName,
  isActive,
  departmentId,
  level,
  superiorCustomerId,
  weibo,
  peopleNumber,
  salesNumber,
  industry,
}) {
  return post({
    method: 'api.customerrelations.customer.create',
    contactId,
    code,
    name,
    quickCode,
    shortName,
    phone,
    fax,
    website,
    locationId,
    description,
    pictureId,
    ownerUserId,
    ownerUserName,
    isActive,
    departmentId,
    level,
    superiorCustomerId,
    weibo,
    peopleNumber,
    salesNumber,
    industry,
  });
}

/** 查看客户详情
 * @params options
 * {
 *   id 主键id must
 * }
 * @return Promise<ArrayList>
 */
export function getCustomer({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.customer.get',
    id,
  });
}

/** 编辑客户资料 (其中最近活动时间，最近跟进人，最近修改时间，创建时间，创建人仅展示，不支持修改)
 * @params options
 * {
 *   id 主键id must
 *   name 客户名称 must
 *   level 等级 A：重点客户，B：普通用户，C：非优先用户 must
 *   superiorCustomerId 上级客户ID
 *   industry 行业  [枚举类型（IndustryTypeEnum）] must
 *   location 省市区，地址 must
 *   phone 公司总机
 *   postCode  邮编
 *   website 网址
 *   weibo 微博
 *   peopleNumber 总人数
 *   salesNumber 年销售额
 *   departmentId 所属部门部门 must
 *   description 备注
 * }
 * @return Promise<Object>
 */
export function updateCustomer({
  id,
  name,
  level,
  superiorCustomerId,
  industry,
  location,
  phone,
  postCode,
  website,
  weibo,
  peopleNumber,
  salesNumber,
  departmentId,
  description,
}) {
  return post({
    method: 'api.customerrelations.customer.update',
    id,
    name,
    level,
    superiorCustomerId,
    industry,
    location,
    phone,
    postCode,
    website,
    weibo,
    peopleNumber,
    salesNumber,
    departmentId,
    description,
  });
}

