/**
 * @component salesClues.js
 * @description 销售线索 service
 * @time 2018/8/27
 * @author JUSTIN XU
 */
import { rpcUtil } from 'xn-react-native-applets';
import { ModuleType } from '../constants/enum';

const { post } = rpcUtil;


/** 查询销售线索列表
 *
 * @param options
 * {
 *  isMyManger  我负责的否
 *  myParticipate 我参与的否
 *  sevenDaysUninvolved 7天未跟进的否
 *  all 全部否  关注对象类型必须传参
 *  status  线索状态否
 *  source  来源否
 *  followTimeType  最近跟进日期
 *  name  姓名否
 *  companyName 公司名称否
 *  jobTitle  职位否
 *  departmentId  部门id否
 *  phone 电话否
 *  locationId  地址id否
 *  postCode  邮编否
 *  activityId  市场活动否
 *  email 邮箱 否
 *  objectType  关注对象类型 否  当选择为我关注的和全部时必填
 *  myFollow  我关注的 否  关注对象类型必须传参
 *  sortColumn  表头排序 否
 * }
 */
export function getSalesClueList({
  pageNumber = 1,
  pageSize = 15,
  isMyManger,
  myParticipate,
  sevenDaysUninvolved,
  all,
  status,
  source,
  followTimeType,
  name,
  companyName,
  jobTitle,
  departmentId,
  phone,
  locationId,
  postCode,
  activityId,
  email,
  objectType = ModuleType.clues,
  myFollow,
  sortColumn,
} = {}) {
  return post({
    method: 'api.customerrelations.leads.find',
    pageNumber,
    pageSize,
    isMyManger,
    myParticipate,
    sevenDaysUninvolved,
    all,
    status,
    source,
    followTimeType,
    name,
    companyName,
    jobTitle,
    departmentId,
    phone,
    locationId,
    postCode,
    activityId,
    email,
    objectType,
    myFollow,
    sortColumn,
  });
}

/** 新增销售线索
 * @params options
 * {
 *   name 姓名 must
 *   companyName 公司名称 must
 *   activityId 市场活动 must
 *   departmentId 所属部门  must
 *   status  跟进状态 [枚举类型（LeadsStatus）]
 *   sex 性别
 *   leadsDepartmentName 部门名称 [线索人的部门名称]
 *   jobTitle 职务
 *   phone 电话
 *   mobilePhone 手机
 *   email 电子邮件
 *   weibo 微博
 *   locationId 地址Id
 *   postCode 邮政编码
 *   source 线索来源 [枚举类型（LeadsSource）]
 *   description 备注
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
  locationId,
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
    locationId,
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
 *   status  跟进状态 [枚举类型（LeadsStatus）]
 *   jobTitle 职务
 *   phone 电话
 *   mobilePhone 手机
 *   email 电子邮件
 *   weibo 微博
 *   locationId 地址Id
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
  status,
  jobTitle,
  phone,
  mobilePhone,
  email,
  weibo,
  locationId,
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
    status,
    jobTitle,
    phone,
    mobilePhone,
    email,
    weibo,
    locationId,
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
