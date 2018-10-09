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
    list: mapToArray(TimeTypes),
  },
];

/**
 * 时间类型
 */
export const ContactsTimeTypeFilterMap = {
  ...initFilterListMap,
  list: [
    {
      key: 'createTime',
      name: '创建时间',
    },
    {
      key: 'followTime',
      name: '跟进时间',
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

