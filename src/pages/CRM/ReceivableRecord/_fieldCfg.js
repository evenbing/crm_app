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
