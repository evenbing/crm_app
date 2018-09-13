/**
 * @component screenTab.js
 * @description 筛选tabs常量
 * @time 2018/9/5
 * @author JUSTIN XU
 */

import triangleFocusIcon from '../img/crm/screenTab/triangle-focus.png';
import triangleIcon from '../img/crm/screenTab/triangle.png';

import screenFocusIcon from '../img/crm/screenTab/screen-focus.png';
import screenIcon from '../img/crm/screenTab/screen.png';

import listIcon from '../img/crm/screenTab/list.png';
// import boardIcon from '../img/crm/screenTab/board.png';

// 下拉
const initFilterListMap = {
  selectedIndex: 0,
  focusIcon: triangleFocusIcon,
  icon: triangleIcon,
  iconSize: 9,
  showFilter: true,
};

const initBoardOrListMap = {
  selectedIndex: 0,
  focusIcon: listIcon,
  icon: listIcon,
  iconSize: 16,
  showFilter: false,
};

const initDrawerMap = {
  selectedIndex: 0,
  focusIcon: screenFocusIcon,
  icon: screenIcon,
  iconSize: 18,
  showFilter: false,
};

/**
  * 客户 时间类型
  */
export const CustomerTimeTypeFilterMap = {
  ...initFilterListMap,
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
  ...initFilterListMap,
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
  ...initFilterListMap,
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
  ...initFilterListMap,
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
 *  销售机会 看板/列表切换
 */
export const IsBoardTypeMap = {
  ...initBoardOrListMap,
  list: [
    {
      key: 'change',
      name: null,
    },
  ],
};

/**
 * 市场活动 时间类型
 */
export const MarkActivityTimeTypeFilterMap = {
  ...initFilterListMap,
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
  ...initFilterListMap,
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
  ...initFilterListMap,
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
  ...initFilterListMap,
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
  ...initFilterListMap,
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
  ...initFilterListMap,
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
  ...initFilterListMap,
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
  ...initFilterListMap,
  list: [
    {
      key: 'CHARGE',
      name: '我负责的',
    },
    {
      key: 'JOIN',
      name: '我参与的',
    },
    {
      key: 'ALL',
      name: '全部',
    },
  ],
};

// 回款计划 时间类型
export const ReceivablePlanTimeTypeFilterMap = {
  ...initFilterListMap,
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
  ...initFilterListMap,
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


// 回款记录 时间类型
export const ReceivableRecordTimeTypeFilterMap = {
  ...initFilterListMap,
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
  ...initFilterListMap,
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

export const TimeFilterMap = {
  ...initFilterListMap,
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
  ...initDrawerMap,
  list: [
    {
      key: 'drawerFilter',
      name: '筛选',
    },
  ],
};

export const ParticipateType = {
  ...initFilterListMap,
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
  ...initFilterListMap,
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
