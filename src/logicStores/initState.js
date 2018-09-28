/**
 * @component initState.js
 * @description 初始化store
 * @time 2018/9/11
 * @author JUSTIN XU
 */

export const initFlatList = {
  pageNumber: 1,
  refreshing: false,
  loadingMore: false,
  list: [],
  total: 0,
};

export const receivableFlatList = {
  ...initFlatList,
  totalFactPrice: 0,
  totalOverTimePrice: 0,
  totalPlanPrice: 0,
  totalPrice: 0,
  totalUnreceivablePrice: 0,
};

export const initDetailMap = {
  refreshing: false,
  list: [],
  map: {},
};

