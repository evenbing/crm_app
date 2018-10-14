/**
 * @component _fieldCfg.js
 * @description 筛选表单
 * @time 2018/9/4
 * @author JUSTIN XU
 */
import {
  TYPE_LIST,
  TYPE_CUSTOMER_LIST,
} from '../../../constants/drawer';
import {
  initFilterListMap,
} from '../../../constants/screenTab';
import { PackStatus, PackType } from '../../../constants/enum';
import { mapToArray } from '../../../utils/base';

export const FilterList = [
  {
    key: 'status',
    label: '合同状态',
    type: TYPE_LIST,
    selectedIndex: -1,
    list: mapToArray(PackStatus),
  },
  {
    key: 'type',
    label: '合同类型',
    type: TYPE_LIST,
    selectedIndex: -1,
    list: mapToArray(PackType),
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
export const ContractTimeTypeFilterMap = {
  ...initFilterListMap,
  list: [
    {
      key: 'START_DATE',
      name: '开始日期',
    },
    {
      key: 'END_DATE',
      name: '结束日期',
    },
    {
      key: 'PACT_DATE',
      name: '合同日期',
    },
  ],
};

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
