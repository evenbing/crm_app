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
import { PayType } from '../../../constants/enum';
import { mapToArray } from '../../../utils/base';


export const FilterList = [
  {
    key: 'payType',
    label: '付款方式',
    type: TYPE_LIST,
    selectedIndex: -1,
    list: mapToArray(PayType),
  },
  // {
  //   key: 'dateFrom',
  //   label: '日期开始',
  //   type: TYPE_LIST,
  //   selectedIndex: -1,
  //   list: mapToArray(TimeTypes),
  // },
  // {
  //   key: 'dateTo',
  //   label: '日期结束',
  //   type: TYPE_LIST,
  //   selectedIndex: -1,
  //   list: mapToArray(TimeTypes),
  // },
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
// sortColumn 表头排行
export const ReceivableRecordTimeTypeFilterMap = {
  ...initFilterListMap,
  list: [
    {
      key: 'RECEIVABLE_DATE',
      name: '实际回款时间',
    },
    {
      key: 'CREATION_TIME',
      name: '创建时间',
    },
    {
      key: 'LAST_UPDATE_TIME',
      name: '最近更新时间',
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
