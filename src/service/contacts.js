/**
 * @component contacts.js
 * @description 联系人 service
 * @time 2018/8/27
 * @author JUSTIN XU
 */
import { post } from '../utils/rpc';

/** 查询联系人列表
 * @params options
 * {
 *   pageNumber 页码
 *   pageSize 每页数量 0 通用为全部
 *   my 我负责的 boolean
 *   myParticipate 我参与的 boolean
 *   sevenDaysUninvolved 7天未跟进的 boolean
 *   all 全部 boolean
 *   name  姓名
 *   followTimeType 跟进时间范围 TODAY-今日，YESTERDAY-昨日，LAST_WEEK-上周，THIS_WEEK-本周，NEXT_WEEK-下周，LAST_MONTH-上月，THIS_MONTH-本月，LAST_QUARTER-上季，THIS_QUARTER-本季，LAST_YEAR-上年，THIS_YEAR-本年
 *   companyName 公司名称
 *   departmentId 部门id
 *   departmentName 部门
 *   jobTitle 职务
 *   phoneNumber 电话
 *   mobilePhone 手机
 *   email 性别
 *   province 省份
 *   address 地址
 *   sortColumn 表头排序
 *   customerId 客户id
 * }
 * @return Promise<ArrayList>
 */
export function getContactList({
  pageNumber = 1,
  pageSize = 15,
  my,
  myParticipate,
  sevenDaysUninvolved,
  all,
  name,
  followTimeType,
  companyName,
  departmentId,
  departmentName,
  jobTitle,
  phoneNumber,
  mobilePhone,
  email,
  province,
  address,
  sortColumn,
  customerId,
} = {}) {
  return post({
    method: 'api.customerrelations.contact.find',
    pageNumber,
    pageSize,
    my,
    myParticipate,
    sevenDaysUninvolved,
    all,
    name,
    followTimeType,
    companyName,
    departmentId,
    departmentName,
    jobTitle,
    phoneNumber,
    mobilePhone,
    email,
    province,
    address,
    sortColumn,
    customerId,
  });
}

/** 新增联系人
 * @params options
 * {
 *   name 客户名称 must
 *   companyName 公司名称 must
 *   jobTitle 职务
 *   phoneNumber 电话
 *   mobilePhone  手机
 *   email 电子邮件
 *   locationId 地址Id
 *   description 备注
 *   departmentId 所属部门
 *   departmentName 部门
 *   weibo 微博
 *   postCode 邮政编码
 *   sex 性别
 *   birthDate 出生日期
 *   customerId, 客户ID
 * }
 * @return Promise<Object>
 */
export function createContact({
  name,
  companyName,
  jobTitle,
  phoneNumber,
  mobilePhone,
  email,
  locationId,
  description,
  departmentId,
  departmentName,
  weibo,
  postCode,
  sex,
  birthDate,
  customerId,
} = {}) {
  return post({
    method: 'api.customerrelations.contact.create',
    name,
    companyName,
    jobTitle,
    phoneNumber,
    mobilePhone,
    email,
    locationId,
    description,
    departmentId,
    departmentName,
    weibo,
    postCode,
    sex,
    birthDate,
    customerId,
  });
}

/** 查看联系人详情
 * @params options
 * {
 *   id 主键id must
 * }
 * @return Promise<ArrayList>
 */
export function getContactDetails({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.contactById.get',
    id,
  });
}

/** 编辑联系人（最近跟进人，最近跟进时间，最近修改人，最近修改时间，创建人，创建时间都仅显示，不提供修改）
 * @params options
 * {
 *   id 主键id must
 *   name 客户名称 must
 *   sex 性别 must
 *   birthDate 出生日期
 *   companyName 公司名称 must
 *   departmentId 所属部门 must
 *   jobTitle 职务
 *   phoneNumber 电话
 *   mobilePhone 手机
 *   email 邮箱
 *   weibo 微博
 *   locationId 地址Id
 *   postCode 邮政编码
 *   departmentName 部门
 *   description 备注
 *   customerId, 客户ID
 * }
 * @return Promise<Object>
 */
export function updateContact({
  id,
  name,
  sex,
  birthDate,
  companyName,
  departmentId,
  jobTitle,
  phoneNumber,
  mobilePhone,
  email,
  weibo,
  locationId,
  postCode,
  departmentName,
  description,
  customerId,
} = {}) {
  return post({
    method: 'api.customerrelations.contact.update',
    id,
    name,
    sex,
    birthDate,
    companyName,
    departmentId,
    jobTitle,
    phoneNumber,
    mobilePhone,
    email,
    weibo,
    locationId,
    postCode,
    departmentName,
    description,
    customerId,
  });
}

/** 转移联系人负责人
 * @add by zhao
 * @params options
 * {
 *   id 主键id must
 *   ownerUserId 转移负责人id must
 *   ownerUserName 转移负责人姓名
 * }
 * @return Promise<Object>
 */
export function updateOwnerUser({
  id,
  ownerUserId,
  ownerUserName,
} = {}) {
  return post({
    method: 'api.customerrelations.changeOwnerUser.contact',
    id,
    ownerUserId,
    ownerUserName,
  });
}
