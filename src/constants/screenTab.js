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
