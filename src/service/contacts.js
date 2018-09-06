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
 *   my 我负责的 boolean
 *   myParticipate 我参与的 boolean
 *   sevenDaysUninvolved 7天未跟进的 boolean
 *   all 全部 boolean
 *   name  姓名
 *   followTimeType 跟进时间范围
 *   companyName 公司名称
 *   departmentId 部门id
 *   departmentName 部门
 *   jobTitle 职务
 *   phoneNumber 电话
 *   mobilePhone 手机
 *   email 性别
 *   sortColumn 表头排序
 * }
 * @return Promise<ArrayList>
 */
export function getContactList({
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
  sortColumn,
} = {}) {
  return post({
    method: 'api.customerrelations.contact.find',
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
    sortColumn,
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
 *   location 地址+省份
 *   description 备注
 *   departmentId 所属部门
 *   departmentName 部门
 *   weibo 微博
 *   postCode 邮政编码
 *   sex 性别  must
 *   birthDate 出生日期
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
  location,
  description,
  departmentId,
  departmentName,
  weibo,
  postCode,
  sex,
  birthDate,
} = {}) {
  return post({
    method: 'api.customerrelations.contact.create',
    name,
    companyName,
    jobTitle,
    phoneNumber,
    mobilePhone,
    email,
    location,
    description,
    departmentId,
    departmentName,
    weibo,
    postCode,
    sex,
    birthDate,
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
 *   location 地址+省份
 *   postCode 邮政编码
 *   departmentName 部门
 *   description 备注
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
  location,
  postCode,
  departmentName,
  description,
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
    location,
    postCode,
    departmentName,
    description,
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
export function changeOwnerUser({
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
