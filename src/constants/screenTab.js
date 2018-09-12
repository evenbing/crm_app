/**
 * @component screenTab.js
 * @description 筛选tabs常量
 * @time 2018/9/5
 * @author JUSTIN XU
 */

/**
  * 客户 时间类型
  */
export const CustomerTimeTypeFilterMap = {
  selectedIndex: 0,
  list: [
    {
      key: 'myParticipate',
      name: '我参与的',
    },
    {
      key: 'my',
      name: '我负责的',
    },
    {
      key: 'sevenDaysUninvolved',
      name: '7天未跟进的',
    },
    {
      key: 'all',
      name: '全部',
    },
  ],
};

/**
  * 客户 责任类型
  */
export const CustomerResponsibilityTypeFilterMap = {
  selectedIndex: 0,
  list: [
    {
      key: 'my',
      name: '我负责的',
    },
    {
      key: 'myParticipate',
      name: '我参与的',
    },
    {
      key: 'sevenDaysUninvolved',
      name: '7天未跟进的',
    },
    {
      key: 'all',
      name: '全部',
    },
  ],
};

/**
  *  销售机会 金额类型
  */
export const SalesChanceAmountTypeFilterMap = {
  selectedIndex: 0,
  list: [
    {
      key: 'salesAmount',
      name: '销售金额',
    },
    {
      key: 'salesAmount1',
      name: '销售金额1',
    },
  ],
};

/**
  *  销售机会 责任类型
  */
export const SalesChanceResponsibilityTypeFilterMap = {
  selectedIndex: 0,
  list: [
    {
      key: 'myParticipate',
      name: '我参与的',
    },
    {
      key: 'my',
      name: '我负责的',
    },
    {
      key: 'sevenDaysUninvolved',
      name: '7天未跟进的',
    },
    {
      key: 'all',
      name: '全部',
    },
  ],
};

/**
 * 市场活动 时间类型
 */
export const MarkActivityTimeTypeFilterMap = {
  selectedIndex: 0,
  list: [
    {
      key: 'createTime',
      name: '创建时间',
    },
    {
      key: 'followTime',
      name: '跟进时间',
    },
  ],
};

/**
  *  市场活动 责任类型
  */
export const MarkActivityResponsibilityTypeFilterMap = {
  selectedIndex: 0,
  list: [
    {
      key: 'my',
      name: '我负责的',
    },
    {
      key: 'myParticipate',
      name: '我参与的',
    },
    {
      key: 'sevenDaysUninvolved',
      name: '7天未跟进的',
    },
    {
      key: 'all',
      name: '全部',
    },
  ],
};

/**
 * 市场活动 时间类型
 */
export const SalesCluesTimeTypeFilterMap = {
  selectedIndex: 0,
  list: [
    {
      key: 'createTime',
      name: '创建时间',
    },
    {
      key: 'followTime',
      name: '跟进时间',
    },
  ],
};

/**
  *  销售线索 责任类型
  */
export const SalesCluesResponsibilityTypeFilterMap = {
  selectedIndex: 0,
  list: [
    {
      key: 'my',
      name: '我负责的',
    },
    {
      key: 'myParticipate',
      name: '我参与的',
    },
    {
      key: 'sevenDaysUninvolved',
      name: '7天未跟进的',
    },
    {
      key: 'all',
      name: '全部',
    },
  ],
};

/**
 * 市场活动 时间类型
 */
export const ContactsTimeTypeFilterMap = {
  selectedIndex: 0,
  list: [
    {
      key: 'createTime',
      name: '创建时间',
    },
    {
      key: 'followTime',
      name: '跟进时间',
    },
  ],
};

// 联系人 责任类型
export const ContactsResponsibilityTypeFilterMap = {
  selectedIndex: 0,
  list: [
    {
      key: 'my',
      name: '我负责的',
    },
    {
      key: 'myParticipate',
      name: '我参与的',
    },
    {
      key: 'sevenDaysUninvolved',
      name: '7天未跟进的',
    },
    {
      key: 'all',
      name: '全部',
    },
  ],
};

/**
 * 市场活动 时间类型
 */
export const ContractTimeTypeFilterMap = {
  selectedIndex: 0,
  list: [
    {
      key: 'createTime',
      name: '创建时间',
    },
    {
      key: 'followTime',
      name: '跟进时间',
    },
  ],
};

// 合同
export const ResponsibResponsibilityTypeFilterMap = {
  selectedIndex: 0,
  list: [
    {
      key: 'my',
      name: '我负责的',
    },
    {
      key: 'myParticipate',
      name: '我参与的',
    },
    {
      key: 'sevenDaysUninvolved',
      name: '7天未跟进的',
    },
    {
      key: 'all',
      name: '全部',
    },
  ],
};

// 回款计划 时间类型
export const ReceivablePlanTimeTypeFilterMap = {
  selectedIndex: 0,
  list: [
    {
      key: 'ALL',
      name: '实际回款时间',
    },
    {
      key: 'CHARGE',
      name: '计划回款时间',
    },
  ],
};

// 回款计划
export const ReceivablePlanResponsibilityTypeFilterMap = {
  selectedIndex: 0,
  list: [
    {
      key: 'my',
      name: '我负责的',
    },
    {
      key: 'all',
      name: '全部',
    },
  ],
};


// 回款记录 时间类型
export const ReceivableRecordTimeTypeFilterMap = {
  selectedIndex: 0,
  list: [
    {
      key: 'ALL',
      name: '实际回款时间',
    },
    {
      key: 'CHARGE',
      name: '计划回款时间',
    },
  ],
};

// 回款记录
export const ReceivableRecordResponsibilityTypeFilterMap = {
  selectedIndex: 0,
  list: [
    {
      key: 'my',
      name: '我负责的',
    },
    {
      key: 'all',
      name: '全部',
    },
  ],
};

export const TimeFilterMap = {
  selectedIndex: 0,
  list: [
    {
      key: 'createTime',
      name: '创建时间',
    },
    {
      key: 'followTime',
      name: '跟进时间',
    },
  ],
};

// 侧边栏筛选
export const DrawerFilterMap = {
  selectedIndex: 0,
  list: [
    {
      key: 'drawerFilter',
      name: '筛选',
    },
  ],
};

export const ParticipateType = {
  selectedIndex: 0,
  list: [
    {
      key: 'CHARGE',
      name: '我负责的',
    },
    {
      key: 'ALL',
      name: '全部',
    },
  ],
};

export const ResponsibFilterMap = {
  selectedIndex: 0,
  list: [
    {
      key: 'my',
      name: '我负责的',
    },
    {
      key: 'myParticipate',
      name: '我参与的',
    },
    {
      key: 'sevenDaysUninvolved',
      name: '7天未跟进的',
    },
    {
      key: 'all',
      name: '全部',
    },
  ],
};
