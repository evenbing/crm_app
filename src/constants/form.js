/**
 * @component form.js
 * @description 表单提示常量
 * @time 2018/9/8
 * @author JUSTIN XU
 */

// 新增任务表单
export const TaskEnum = {
  type: '日程任务的类型',
  name: '请输入名称',
  startTime: '请选择开始时间',
  endTime: '请选择截止时间',
  moduleType: '请选择业务类型',
  moduleId: '请选择业务类型',
  comment: '请输入备注',
  needNotice: '请选择是否开启提醒',
  noticeTime: '请选择提醒时间',
  longitudeAndLatitude: '位置信息的经纬度',
  locationInfo: '无',
  isPrivate: '请选择是否私密',
  principal: '无',
  userIds: '无',
};

// 客户表单
export const CustomerEnum = {
  contactId: '联系人ID',
  code: '客户编码',
  name: '请输入客户名称',
  quickCode: '助记码',
  shortName: '客户简称',
  phone: '请输入公司总机',
  fax: '请输入公司传真',
  website: '请输入网址',
  locationDivision: '请选择省市区',
  locationInfo: '请输入详细地址',
  description: '请输入说明',
  pictureId: '图片ID',
  ownerUserId: '负责人用户ID',
  ownerUserName: '负责人用户姓名',
  isActive: '是否有效',
  departmentName: '请选择部门部门',
  level: '请选择客户等级', // A： 重点客户，B：普通用户，C：非优先用户
  superiorCustomerId: '上级客户ID',
  weibo: '请输入微博',
  peopleNumber: '请输入总人数',
  salesNumber: '请输入销售额',
  industry: '请输入行业',
  superiorCustomerName: '请选择上级客户',
};

// 市场活动表单
export const MarkActivityEnum = {
  // 必填
  name: '请输入活动名称',
  beginDate: '请选择开始日期',
  endDate: '请选择结束日期',
  departmentName: '请选择所属部门',
  description: '请输入活动说明',
  // 可选
  status: '请选择活动状态',
  sourceType: '请选择活动类型',
  budgetCost: '请输入活动成本',
  budgetRevenue: '请输入预期收入',
  budgetPeopleNumber: '请输入邀请人数',
  effect: '请输入预期响应',
  actualPeopleNumber: '请输入实际人数',
  actualCost: '请输入实际成本',
  executeDetail: '请输入备注',
};

// 联系人表单
export const ContactsEnum = {
  name: '请输入姓名',
  jobTitle: '请输入职务',
  companyName: '请选择公司名称',
  phoneNumber: '请输入联系电话',
  mobilePhone: '请输入手机',
  departmentName: '请选择所属部门',
  // more
  sex: '请选择性别',
  birthDate: '请选择出生日期',
  email: '请输入邮箱',
  weibo: '请输入微博',
  location: '请选择省份',
  address: '请输入地址',
  postCode: '请输入邮编',
  description: '请输入备注说明',
};

// 销售机会表单
export const SalesChanceEnum = {
  name: '请输入机会名称',
  customer: '请选择客户',
  price: '请选择价格表',
  budgetCost: '请输入项目预算',
  actualCost: '请输入实际花费',
  planAmount: '请输入销售金额',
  salesPhase: '请选择销售阶段',
  expectedDate: '请选择结单日期',
  description: '请输入备注',
  department: '请选择所属部门',
  activity: '请选择市场活动',
  opportunityType: '请选择机会类型',
  sourceType: '请选择机会来源',
};

// 销售线索
export const SalesClueEnum = {
  name: '请输入姓名',
  companyName: '请输入公司名称',
  activity: '请选择市场活动',
  department: '请选择所属部门',
  status: '请选择跟进状态',
  sex: '请选择性别',
  leadsDepartmentName: '请输入部门名称',
  jobTitle: '请输入职务',
  phone: '请输入电话',
  mobilePhone: '请输入手机',
  email: '请输入电子邮件',
  weibo: '请输入微博',
  districts: '请选择省、市、区',
  address: '请输入地址',
  location: '请选择地址',
  postCode: '请输入邮政编码',
  source: '请选择线索来源',
  description: '请输入备注',
};

// 合同表单
export const ContractEnum = {
  theme: '请输入合同名称',
  customerName: '请选择客户',
  totalMoney: '请输入总金额',
  startDate: '请选择活动开始日期',
  endDate: '请选择活动结束日期',
  departmentName: '请选择所属部门',
  ownerId: '请选择负责人',
  // more
  salesOpportunities: '请选择销售机会',
  type: '请选择合同类型',
  status: '请选择合同状态',
  payType: '请选择付款方式',
  number: '请输入合同编号',
  pactDate: '请选择签约日期',
  ourContract: '请选择我方签约人',
  customerContractName: '请选择客户方签约人',
  content: '请输入合同正文',
  comment: '请输入备注说明',
};

// 回款计划
export const ReceivablePlanEnum = {
  id: '缺失主键ID',
  pactId: '请选择合同ID',
  issueId: '请选择回款期次',
  receivablePrice: '请输入回款金额',
  receivableDate: '请选择回款日期',
  ownerId: '请选择负责人',
  comment: '请输入备注说明',
};

// 回款记录
export const ReceivableRecordEnum = {
  id: '缺失主键ID',
  pactId: '请选择合同ID',
  issueId: '请选择回款期次',
  planId: '请选择回款计划',
  receivablePrice: '请输入回款金额',
  receivableDate: '请选择回款日期',
  payType: '请选择付款方式',
  ownerId: '请选择负责人',
  comment: '请输入备注说明',
};

// 修改产品
export const ProductListEnum = {
  price: '请输入销售单价',
  number: '请输入商品数量',
  discount: '请输入折扣',
  totalMoney: '请输入总价',
  comment: '请输入备注，十字以内',
};
