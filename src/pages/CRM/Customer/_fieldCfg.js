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
import { CustomerLevelTypes, IndustryTypes, TimeTypes } from '../../../constants/enum';
import { mapToArray } from '../../../utils/base';

export const FilterList = [
  {
    key: 'level',
    label: '客户级别',
    type: TYPE_LIST,
    selectedIndex: -1,
    list: mapToArray(CustomerLevelTypes),
  },
  {
    key: 'industry',
    label: '行业',
    type: TYPE_LIST,
    selectedIndex: -1,
    list: mapToArray(IndustryTypes),
  },
  {
    key: 'followTimeType',
    label: '跟进时间范围',
    type: TYPE_LIST,
    selectedIndex: -1,
    list: mapToArray(TimeTypes),
  },
];

// -----------------------------------------
// 列表头部筛选
// sortColumn 表头排行
export const CustomerTimeTypeFilterMap = {
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
export const CustomerResponsibilityTypeFilterMap = {
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
