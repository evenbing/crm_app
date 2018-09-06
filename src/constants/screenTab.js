/**
 * @component screenTab.js
 * @description 筛选tabs常量
 * @time 2018/9/5
 * @author JUSTIN XU
 */

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

export const DrawerFilterMap = {
  selectedIndex: 0,
  list: [
    {
      key: 'drawerFilter',
      name: '筛选',
    },
  ],
};

