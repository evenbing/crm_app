/**
 * @component _fieldCfg.js
 * @description 筛选表单
 * @time 2018/9/4
 * @author JUSTIN XU
 */
import {
  TYPE_LIST,
  TYPE_INPUT,
} from '../../../constants/drawer';
import {
  initFilterListMap,
} from '../../../constants/screenTab';
// import { MarketActivityStatus, MarketActivityTypes, TimeTypes } from '../../../constants/enum';
// import { mapToArray } from '../../../utils/base';


export const FilterList = [
  {
    label: '合同状态',
    type: TYPE_LIST,
    selectedIndex: -1,
    list: [
      { name: '不限' },
      { name: '已计划' },
      { name: '进行中' },
      { name: '已完成' },
    ],
  },
  {
    label: '行业',
    type: TYPE_LIST,
    selectedIndex: -1,
    list: [
      { name: '产品销售' },
      { name: '服务' },
      { name: '业务合作' },
      { name: '代理分销' },
      { name: '其他' },
    ],
  },
  {
    label: '客户名称',
    type: TYPE_LIST,
    selectedIndex: -1,
    list: [
      { name: '不限' },
      { name: '已计划' },
      { name: '进行中' },
      { name: '已完成' },
      { name: '本月' },
      { name: '本季' },
      { name: '本年' },
    ],
  },
  {
    label: '输入关键字',
    placeholder: '请输入关键字',
    type: TYPE_INPUT,
    value: null,
  },
];

// -----------------------------------------
// 列表头部筛选
// sortColumn 表头排行
export const ReceivableRecordTimeTypeFilterMap = {
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
