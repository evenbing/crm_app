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

export const FilterList = [
  {
    label: '联系人姓名',
    placeholder: '请输入关键字',
    type: TYPE_INPUT,
    value: null,
  },
  {
    label: '最近跟进日期',
    type: TYPE_LIST,
    selectedIndex: -1,
    list: [
      { name: '不限' },
      { name: '本月' },
      { name: '本季' },
      { name: '本年' },
      { name: '已计划' },
      { name: '进行中' },
      { name: '已完成' },
    ],
  },
];
