/**
 * @component drawer.js
 * @description 侧边栏工具库
 * @time 2018/9/4
 * @author JUSTIN XU
 */
import { TYPE_LIST, TYPE_INPUT } from '../constants/drawer';

/** 处理切换条目
 * @params options
 * {
 *   list 原list
 *   type 类型
 *   currIndex 当前index
 *   pareIndex 父级index
 *   value 表单的值
 * }
 * @return Array
 */
export function handleToggleItem({
  list = [],
  type,
  currIndex,
  pareIndex,
  value,
}) {
  if (!list.length) return [];
  if (type === TYPE_LIST) {
    if (list[pareIndex].selectedIndex === currIndex) {
      list[pareIndex].selectedIndex = -1;
    } else {
      list[pareIndex].selectedIndex = currIndex;
    }
  }
  if (type === TYPE_INPUT) {
    list[pareIndex].value = value;
  }
  return list;
}


/** 处理重置条目
 * @params options
 * {
 *   list 原list
 * }
 * @return Array
 */
export function handleRestItem({
  list = [],
}) {
  if (!list.length) return [];
  return list.map(_ => {
    if (_.type === TYPE_LIST) {
      _.selectedIndex = -1;
    }
    if (_.type === TYPE_INPUT) {
      _.value = null;
    }
    return _;
  });
}

/** 处理过滤条目
 * @params options
 * {
 *   list 原list
 * }
 * @return Array
 */
export function handleFilterItem({
  list = [],
}) {
  const arr = [];
  if (!list.length) return arr;
  list.forEach((_) => {
    const obj = {};
    obj.label = _.label;
    obj.key = _.key;
    if (_.type === TYPE_LIST) {
      if (_.selectedIndex === -1) return;
      const res =  _.list[_.selectedIndex];
      obj.name = res.name;
      obj.value = res.key;
    }
    if (_.type === TYPE_INPUT) {
      if (!_.value) return;
      obj.name = _.value;
      obj.value = _.value;
    }
    arr.push(obj);
  });
  return arr;
}
