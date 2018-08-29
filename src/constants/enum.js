// 模块类型枚举
export const ModuleType = {
  // 产品模块
  product: 'PRODUCT',
  // 合同模块
  pact: 'PACT',
  // 客户模块
  customer: 'CUSTOMER',
  // 联系人模块
  contact: 'CONTACT',
  // 市场活动模块
  activity: 'ACTIVITY',
  // 销售线索模块
  clues: 'LEADS',
  // 销售机会
  opportunity: 'OPPORTUNITY',
  // 价格
  price: 'PRICE',
  // 回款计划
  plan: 'RECEIVABLE_PLAN',
  // 回款记录
  record: 'RECEIVABLE_DETAIL',
};

// 动态记录类型枚举
export const DynamicRecordType = {
  // 快速记录
  FAST: '快速记录',
  // PHONE
  PHONE: '电话',
  // VISIT
  VISIT: '拜访',
};

// 票据类型
export const InvoiceType = {
  // 增值税
  ZENGZHISHUI: '增值税',
  // 普通国税
  PUTONGGUOSHUI: '普通国税',
  // 普通地税
  PUTONGDISHUI: '普通地税',
  // 增值税普通发票
  PUTONGFAPIAO: '增值税普通发票',
  // 增值税专用发票
  ZHUANYONGFAPIAO: '增值税专用发票',
};

// 付款方式
export const PayType = {
  CASH: '现金',
  CHECK: '支票',
  BANK_TRANSFER: '银行转账',
  OTHER: 'OTHER',
};

// 客户登录
export const CustomerLevel = {
  A: '重点客户',
  B: '普通用户',
  C: '非优先用户',
};

// 合同类型
export const PackType = {
  PRODUCT_SALES: '产品销售',
  SERVICE: '服务',
  BUSINESS_COOPERRATION: '业务合作',
  AGENT_DISTRIBUTION: '代理分销',
  OTHER: '其他',
};

export const PackStatus = {
  0: '执行中',
  1: '结束',
  2: '意外中止',
};
