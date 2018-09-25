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
  locationInfo: '位置信息',
  isPrivate: '请选择是否私密',
  principal: '无',
  userIds: '无',
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
  postCode: '请输入邮编',
  description: '请输入备注说明',
};

// 合同表单
export const ContractEnum = {
  theme: '请输入合同名称',
  customerName: '请选择客户',
  totalMoney: '请输入总金额',
  startDate: '请选择活动开始日期',
  endDate: '请选择活动结束日期',
  departmentName: '请选择所属部门',
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
  pactId: '请选择合同ID',
  issue: '请输入回款期次',
  receivablePrice: '请输入回款金额',
  receivableDate: '请选择回款日期',
  ownerId: '请选择负责人',
  comment: '请输入备注说明',
  // more
};

// 回款记录
export const ReceivableRecordEnum = {
  pactId: '请选择合同ID',
  issue: '请输入回款期次',
  plan: '请选择回款计划',
  receivablePrice: '请输入回款金额',
  receivableDate: '请选择回款日期',
  payType: '请选择付款方式',
  ownerId: '请选择负责人',
  comment: '请输入备注说明',
  // more
};

// 修改产品
export const ProductListEnum = {
  price: '请输入销售单价',
  number: '请输入商品数量',
  discount: '请输入折扣',
  totalMoney: '请输入总价',
  comment: '请输入备注，十字以内',
};
