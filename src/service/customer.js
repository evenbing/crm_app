/**
 * @component customer.js
 * @description 客户 service
 * @time 2018/8/27
 * @author JUSTIN XU
 */
import { post } from '../utils/rpc';


/** 查询客户
 * @params options
 * {
 *  my  我负责的  否必填
 *  myFollow  我关注的  否必填
 *  objectType  关注对象类型  否必填
 *  myParticipate 我参与的  否必填
 *  sevenDaysUninvolved 7天未跟进的 否必填
 *  all 全部  否必填
 *  level 级别  否必填
 *  industry  行业  否必填
 *  name  客户名称  否必填
 *  locationId  地址id  否必填
 *  postCode  邮编  否必填
 *  phone 电话  否必填
 *  departmentId  部门id  否必填
 *  followTimeType  跟进时间范围  否必填
 *  sortColumn  表头排序  否必填
 * }
 * @return Promise<Object>
 */
export function find({
  pageNumber = 1,
  pageSize = 15,
  my,
  myFollow,
  objectType,
  myParticipate,
  sevenDaysUninvolved,
  all,
  level,
  industry,
  name,
  locationId,
  postCode,
  phone,
  departmentId,
  followTimeType,
  sortColumn,
} = {}) {
  return post({
    method: 'api.customerrelations.customer.find',
    pageNumber,
    pageSize,
    my,
    myFollow,
    objectType,
    myParticipate,
    sevenDaysUninvolved,
    all,
    level,
    industry,
    name,
    locationId,
    postCode,
    phone,
    departmentId,
    followTimeType,
    sortColumn,
  });
}

/** 新增客户
 * @params options
 * {
 *  contactId 联系人ID  否
 *  code  客户编码  否
 *  name  客户名称  是
 *  quickCode 助记码  否
 *  shortName 客户简称  否
 *  phone 公司总机  否
 *  fax 公司传真  否
 *  website 网址  否
 *  locationId  地址ID  否
 *  description 说明  否
 *  pictureId 图片ID  否
 *  ownerUserId 负责人用户ID  否
 *  ownerUserName 负责人用户姓名  否
 *  isActive  是否有效  是  默认传true
 *  departmentId  部门id  是
 *  level 等级  否  A： 重点客户，B：普通用户，C：非优先用户
 *  superiorCustomerId  上级客户ID  否
 *  weibo 微博  否
 *  peopleNumber  总人数  否
 *  salesNumber 销售额  否
 *  industry  行业  否 IndustryTypeEnum：FINANCIAL-金融，TELECOM-电信，HIGH_TECH-高科技，GOVERNMENT-政府，FABRICATION-制造，SERVICE-服务，ENERGY-能源，RETAIL-零售，MEDIA-媒体，ENTERTAINMENT-娱乐，CONSULTATION-咨询，NONPROFIT_ORGANIZATION-非盈利组织，PUBLIC_SERVICE-公共事业，OTHER-其他
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
} = {}) {
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
export function getCustomerDetail({
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
} = {}) {
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

/** 合并两个相同客户
 * @add by zhao
 * @params options
 * {
 *   updateId, 主记录id must
 *   deleteId, 从记录id must
 *   name, 客户名称 must
 *   level, 等级
 *   industry, 行业 枚举类型（IndustryTypeEnum）
 *   postCode, 邮编
 *   phone, 电话
 *   fax, 公司传真
 *   website, 网址
 *   weibo, 微博
 *   peopleNumber, 总人数
 *   salesNumber, 销售额
 *   creationTime, 创建日期 must
 *   lastUpdateTime, 最后修改日期
 *   description, 备注
 *   locationId, 地址id must
 * }
 * @return Promise<Object>
 */
export function mergeCustomter({
  updateId,
  deleteId,
  name,
  level,
  industry,
  postCode,
  phone,
  fax,
  website,
  weibo,
  peopleNumber,
  salesNumber,
  creationTime,
  lastUpdateTime,
  description,
  locationId,
} = {}) {
  return post({
    method: 'api.customerrelations.customter.merge',
    updateId,
    deleteId,
    name,
    level,
    industry,
    postCode,
    phone,
    fax,
    website,
    weibo,
    peopleNumber,
    salesNumber,
    creationTime,
    lastUpdateTime,
    description,
    locationId,
  });
}


/** 转移客户负责人
 * @add by zhao
 * @params options
 * {
 * id 主键id must
 * ownerUserId 转移负责人id must
 * ownerUserName 转移负责人姓名
 * changeContact 是否转移联系人
 * changeSale 是否转移销售机会
 * changePact 是否转移合同
 * }
 * @return Promise<Object>
 */
export function changeOwnerUser({
  id,
  ownerUserId,
  ownerUserName,
  changeContact,
  changeSale,
  changePact,
} = {}) {
  return post({
    method: 'api.customerrelations.changeOwnerUser.customer',
    id,
    ownerUserId,
    ownerUserName,
    changeContact,
    changeSale,
    changePact,
  });
}

