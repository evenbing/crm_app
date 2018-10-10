/**
 * @component _fieldCfg.js
 * @description 常量配置文件
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
import { TimeTypes } from '../../../constants/enum';
import { mapToArray } from '../../../utils/base';

// 筛选常量
// currStatus 0-筛选页面已选择 1-选择页面未选择 2-选择页面已选择
export const FilterList = [
  {
    key: 'name',
    label: '联系人姓名',
    placeholder: '请输入关键字',
    type: TYPE_INPUT,
    value: null,
  },
  {
    key: 'followTimeType',
    label: '最近跟进日期',
    type: TYPE_LIST,
    selectedIndex: -1,
    list: mapToArray(TimeTypes),
  },
];

// -----------------------------------------
// 列表头部筛选
// sortColumn 表头排行
export const ContactsTimeTypeFilterMap = {
  ...initFilterListMap,
  list: [
    {
      key: 'NAME',
      name: '名称',
    },
    {
      key: 'LAST_UPDATE_TIME',
      name: '最近更新时间',
    },
  ],
};

// 责任类型
export const ContactsResponsibilityTypeFilterMap = {
  ...initFilterListMap,
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

