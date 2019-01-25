/**
 * @component _fieldCfg.js
 * @description 筛选表单
 * @time 2018/9/4
 * @author JUSTIN XU
 */
import {
  TYPE_CUSTOMER_LIST,
  TYPE_LIST,
} from 'constants/drawer';
import {
  initFilterListMap,
  initBoardOrListMap,
} from 'constants/screenTab';
import {
  TimeTypes,
} from 'constants/enum';
import { mapToArray } from 'utils/base';

export const SALES_PHASE_IDS_KEY = 'salesPhaseIds';

export const FilterList = [
  {
    key: 'expectedDateTime',
    label: '结单时间范围',
    type: TYPE_LIST,
    selectedIndex: -1,
    list: mapToArray(TimeTypes),
  },
  {
    key: 'followTimeType',
    label: '跟进时间范围',
    type: TYPE_LIST,
    selectedIndex: -1,
    list: mapToArray(TimeTypes),
  },
  {
    key: SALES_PHASE_IDS_KEY,
    label: '销售状态',
    type: TYPE_LIST,
    selectedIndex: -1,
    list: [],
  },
  {
    key: 'customerIds',
    label: '客户',
    type: TYPE_CUSTOMER_LIST,
    selectedIndex: -1,
    list: [
      { name: '选择' },
    ],
  },
];

// -----------------------------------------
// 列表头部筛选
// sortColumn 表头排行
export const SalesChanceAmountTypeFilterMap = {
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
export const SalesChanceResponsibilityTypeFilterMap = {
  ...initFilterListMap,
  list: [
    {
      key: 'my',
      name: '我负责的',
    },
    {
      key: 'myFollow',
      name: '我关注的',
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

// 看板/列表切换
export const IsBoardTypeMap = {
  ...initBoardOrListMap,
  list: [
    {
      key: 'change',
      name: null,
    },
  ],
};
