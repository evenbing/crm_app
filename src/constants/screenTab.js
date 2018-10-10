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
export const initFilterListMap = {
  selectedIndex: 0,
  focusIcon: triangleFocusIcon,
  icon: triangleIcon,
  iconSize: 9,
  showFilter: true,
};

export const initBoardOrListMap = {
  selectedIndex: 0,
  focusIcon: listIcon,
  icon: listIcon,
  iconSize: 16,
  showFilter: false,
};

export const initDrawerMap = {
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
