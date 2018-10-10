/**
 * @component _fieldCfg.js
 * @description 筛选表单
 * @time 2018/9/4
 * @author JUSTIN XU
 */
import {
  TYPE_LIST,
} from '../../../constants/drawer';
import {
  initFilterListMap,
} from '../../../constants/screenTab';
import { MarketActivityStatus, MarketActivityTypes, TimeTypes } from '../../../constants/enum';
import { mapToArray } from '../../../utils/base';

export const FilterList = [
  {
    key: 'status',
    label: '合同状态',
    type: TYPE_LIST,
    selectedIndex: -1,
    list: mapToArray(MarketActivityStatus),
  },
  {
    key: 'sourceType',
    label: '活动类型',
    type: TYPE_LIST,
    selectedIndex: -1,
    list: mapToArray(MarketActivityTypes),
  },
  {
    key: 'beginDateType',
    label: '开始日期',
    type: TYPE_LIST,
    selectedIndex: -1,
    list: mapToArray(TimeTypes),
  },
  {
    key: 'endDateType',
    label: '结束日期',
    type: TYPE_LIST,
    selectedIndex: -1,
    list: mapToArray(TimeTypes),
  },
];

// -----------------------------------------
// 列表头部筛选
// sortColumn 表头排行
export const MarkActivityTimeTypeFilterMap = {
  ...initFilterListMap,
  list: [
    {
      key: 'NAME',
      name: '名称',
    },
    {
      key: 'CREATION_TIME',
      name: '创建时间',
    },
  ],
};

// 责任类型
export const MarkActivityResponsibilityTypeFilterMap = {
  ...initFilterListMap,
  list: [
    {
      key: 'my',
      name: '我负责的',
    },
    {
      key: 'myFollowed',
      name: '我关注的',
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
