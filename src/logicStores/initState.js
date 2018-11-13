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

// 跟进统计
export const initFollowUpList = {
  refreshing: false,
  list: [],
  maxValue: 1,
};

// 合同
export const contractFlatList = {
  ...initFlatList,
  totalPactMoney: 0,
  totalOverMoney: 0,
  totalFactMoney: 0,
};

// 回款
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

