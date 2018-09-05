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

// 行业
export const industryTypes = {
  FINANCIAL: '金融',
  TELECOM: '电信',
  HIGH_TECH: '高科技',
  GOVERNMENT: '政府',
  FABRICATION: '制造',
  SERVICE: '服务',
  ENERGY: '能源',
  RETAIL: '零售',
  MEDIA: '媒体',
  ENTERTAINMENT: '娱乐',
  CONSULTATION: '咨询',
  NONPROFIT_ORGANIZATION: '非盈利组织',
  PUBLIC_SERVICE: '公共事业',
  OTHER: '其他',
};

// 市场活动状态
export const MarketActivityStatus = {
  PLANNED: '已计划',
  ONGOING: '进行中',
  END: '已结束',
  SUSPEND: '终止',
};

// 市场活动类型
export const MarketActivityTypes = {
  ADVERT: '广告',
  SEMINAR: '研讨会/会议',
  EMAIL: '电子邮件',
  TELEMARKETING: '电话营销',
  PUBLIC_RELATIONS: '公共关系',
  PARTNER: '合作伙伴',
  OTHER: '其他',
};

// 公司部门枚举
export const Departments = {
  0: '全公司',
};

// 性别枚举==
export const SexTypes = {
  0: '女',
  1: '男',
};

// 销售线索--跟进状态
export const LeadsStatus = {
  UNDONE: '未处理',
  CONTACTED: '已联系',
  CLOSED: '关闭',
};

// 线索来源
export const LeadsSource = {
  ADVERT: '广告',
  SEMINAR: '研讨会',
  SOLAR_ENGINE: '搜索引擎',
  CUSTOMER_INTRODUCTION: '客户介绍',
  OTHER: '其他',
};

// 销售机会类型
export const OpportunityTypes = {
  NEW_CUSTOMER: '新客户',
  OLD_CUSTOMER: '老客户',
};

// 机会来源
export const OpportunitySource = {
  ADVERT: '广告',
  SEMINAR: '研讨会',
  SOLAR_ENGINE: '搜索引擎',
  SALES_OPPORTUNITY__INTRODUCTION: '销售机会介绍',
  OTHER: '其他',
};


export const TimeTypes = {
  TODAY: '今日',
  YESTERDAY: '昨日',
  LAST_WEEK: '上周',
  THIS_WEEK: '本周',
  NEXT_WEEK: '下周',
  LAST_MONTH: '上月',
  THIS_MONTH: '本月',
  LAST_QUARTER: '上季',
  THIS_QUARTER: '本季',
  LAST_YEAR: '上年',
  THIS_YEAR: '本年',
};
