/**
 * @component salesClues.js
 * @description 销售线索 service
 * @time 2018/8/27
 * @author JUSTIN XU
 */
import { post } from '../utils/rpc';

/** 查询销售线索列表
 * 
 * @param options
 * {
 *  
 * } 
 */
export function getSalesClueList({

} = {}) {
  return post({
    method: 'api.customerrelations.leads.find',

  });
}

/** 新增销售线索
 * @params options
 * {
 *   name 姓名 must
 *   companyName 公司名称 must
 *   activityId 市场活动
 *   departmentId 所属部门  must
 *   status  跟进状态 [枚举类型（LeadsStatusEnum）]
 *   sex 性别
 *   leadsDepartmentName 部门名称 [线索人的部门名称]
 *   jobTitle 职务
 *   phone 电话
 *   mobilePhone 手机
 *   email 电子邮件
 *   weibo 微博
 *   location 省份+地址
 *   postCode 邮政编码
 *   source 线索来源  [枚举类型（LeadsSourceEnum）]
 *   description 备注  [枚举类型（IndustryTypeEnum）]
 * }
 * @return Promise<Object>
 */
export function createSalesClue({
  name,
  companyName,
  activityId,
  departmentId,
  status,
  sex,
  leadsDepartmentName,
  jobTitle,
  phone,
  mobilePhone,
  email,
  weibo,
  location,
  postCode,
  source,
  description,
} = {}) {
  return post({
    method: 'api.customerrelations.leads.create',
    name,
    companyName,
    activityId,
    departmentId,
    status,
    sex,
    leadsDepartmentName,
    jobTitle,
    phone,
    mobilePhone,
    email,
    weibo,
    location,
    postCode,
    source,
    description,
  });
}

/** 查看销售线索详情
 * @params options
 * {
 *   id 主键id must
 * }
 * @return Promise<ArrayList>
 */
export function getSalesClueDetail({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.leads.get',
    id,
  });
}

/** 编辑销售线索（最近活动时间，最近跟进人，最近修改时间，创建时间，创建人仅限展示，不能修改）
 * @params options
 * {
 *   id 主键id must
 *   name 客户名称 must
 *   sex 性别
 *   companyName 公司名称 must
 *   leadsDepartmentName 部门名称
 *   jobTitle 职务
 *   phone 公司总机
 *   mobilePhone 邮编
 *   email 电子邮件
 *   weibo 微博
 *   location 省份+地址
 *   postCode 邮政编码
 *   source 线索来源
 *   activityId 市场活动
 *   departmentId 所属部门 must
 *   description 备注
 * }
 * @return Promise<Object>
 */
export function updateSalesClue({
  id,
  name,
  sex,
  companyName,
  leadsDepartmentName,
  jobTitle,
  phone,
  mobilePhone,
  email,
  weibo,
  location,
  postCode,
  source,
  activityId,
  departmentId,
  description,
} = {}) {
  return post({
    method: 'api.customerrelations.leads.update',
    id,
    name,
    sex,
    companyName,
    leadsDepartmentName,
    jobTitle,
    phone,
    mobilePhone,
    email,
    weibo,
    location,
    postCode,
    source,
    activityId,
    departmentId,
    description,
  });
}

/** 转移销售线索负责人
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
    method: 'api.customerrelations.leadsOwnerUser.change',
    id,
    ownerUserId,
    ownerUserName,
  });
}
