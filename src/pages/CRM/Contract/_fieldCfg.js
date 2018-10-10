/**
 * @component _fieldCfg.js
 * @description 筛选表单
 * @time 2018/9/4
 * @author JUSTIN XU
 */
import {
  TYPE_LIST,
  // TYPE_INPUT,
} from '../../../constants/drawer';
import {
  initFilterListMap,
} from '../../../constants/screenTab';
import { PackStatus, PackType } from '../../../constants/enum';
import { mapToArray } from '../../../utils/base';

export const FilterList = [
  // {
  //   label: '输入关键字',
  //   placeholder: '请输入关键字',
  //   type: TYPE_INPUT,
  //   value: null,
  // },
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
    label: '客户',
    type: TYPE_LIST,
    selectedIndex: -1,
    list: [
      { name: '西风网络' },
    ],
  },
];

// -----------------------------------------
// 列表头部筛选
export const ContractTimeTypeFilterMap = {
  ...initFilterListMap,
  list: [
    {
      key: 'startDate',
      name: '开始日期',
    },
    {
      key: 'endDate',
      name: '结束日期',
    },
    {
      key: 'pactDate',
      name: '签约日期',
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
