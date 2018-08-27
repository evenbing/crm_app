/**
 * @component salesClues.js
 * @description 销售线索 service
 * @time 2018/8/27
 * @author JUSTIN XU
 */
import { post } from '../utils/rpc';

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
}) {
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
export function getSalesClue({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.leads.get',
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

