/**
 * @component _fieldCfg.js
 * @description 筛选表单
 * @time 2018/9/4
 * @author JUSTIN XU
 */
import {
  TYPE_CUSTOMER_LIST,
  TYPE_LIST,
} from '../../../constants/drawer';
import {
  initFilterListMap,
} from '../../../constants/screenTab';
import { ReceivableCompletedType, ReceivableOverType } from '../../../constants/enum';
import { mapToArray } from '../../../utils/base';

export const FilterList = [
  {
    key: 'isCompleted',
    label: '回款状态',
    type: TYPE_LIST,
    selectedIndex: -1,
    list: mapToArray(ReceivableCompletedType),
  },
  {
    key: 'isOver',
    label: '逾期状态',
    type: TYPE_LIST,
    selectedIndex: -1,
    list: mapToArray(ReceivableOverType),
  },
  {
    key: 'customerId',
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
export const ReceivablePlanTimeTypeFilterMap = {
  ...initFilterListMap,
  list: [
    {
      key: 'FACT_RECEIVE_DATE',
      name: '实际回款时间',
    },
    {
      key: 'PLAN_RECEIVE_DATE',
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
